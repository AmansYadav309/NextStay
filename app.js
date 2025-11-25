
if(process.env.NODE_ENV != "production"){
require('dotenv').config()
}

// console.log(process.env) 


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing");
const ejs = require("ejs");
const path = require("path");
const methodOverride= require("method-override");
const ejsMate = require("ejs-mate");
const expressError= require("./utils/expressError")
const { listingSchema ,reviewSchema } = require("./schema.js");
const Review = require("./models/review");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const userModel  = require("./models/user");
const { isLogedin } = require("./middleware.js");

const listings = require("./routes/listings");
const reviews = require("./routes/reviews.js")
const user = require("./routes/users.js");


// const port = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended : true }))
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);

const sessionoption = {
  secret: process.env.SECRET || "mysupersecret", // IMPORTANT: Use env variable
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
}

app.use(session(sessionoption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(userModel.authenticate()) )

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.use((req,res,next)=>{
  res.locals.added = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.CurUser = req.user;
  next();
}) 

main().then((res)=>{
    // console.log("connected sussefully")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wonderlust');
}

// This might be in app.js or routes/user.js
app.get("/", (req, res) => {
  res.render("landing.ejs", { onLandingPage: true }); // Pass the signal here
});




//routes 
//reviews routes
app.use("/listings/:id/reviews", reviews);
//listings routes
app.use("/listings" , listings);

//user routes 
app.use("/" , user);


//express error handling
app.use((req, res, next) => {
  next(new expressError(404, "Page Not Found"));
});

//error handling middleware 
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    // res.status(statusCode).send(message);
    res.render("listings/error.ejs" , { statusCode, message });
});


// app.listen(port, () => {
//     console.log("server is working ");
// });

module.exports = app;
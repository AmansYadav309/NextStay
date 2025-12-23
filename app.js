
if(process.env.NODE_ENV != "production"){
require('dotenv').config()
}

// console.log(process.env) 


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
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

const store = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,
  secret: process.env.SECRET || "mysupersecret",
  touchAfter: 24 * 3600 // time period in seconds
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

const sessionoption = {
  store: store,
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

// --- VERCEL CONNECTION CACHING LOGIC ---
// Use a global variable to cache the database connection across function calls.
let cachedDb = null;

async function connectToDatabase() {
    // 1. If the connection is already cached, return it immediately.
    if (cachedDb) {
        console.log("Using cached DB connection.");
        return cachedDb;
    }

    // 2. Get the connection URL from Vercel environment variables.
    const dbUrl = process.env.MONGODB_URI;

    if (!dbUrl) {
        throw new Error("MONGODB_URI environment variable is not set!");
    }

    // 3. Establish a new connection.
    const conn = await mongoose.connect(dbUrl, {
        // These options are usually unnecessary in modern Mongoose but keep for reference
        // useNewUrlParser: true, 
        // useUnifiedTopology: true,
    });
    
    // 4. Cache the connection for future function invocations.
    cachedDb = conn; 
    console.log("Established new DB connection and cached it.");
    return conn;
}

// Immediately invoke the connection logic.
connectToDatabase().then(() => {
    console.log("Mongoose connection established.");
}).catch(err => {
    console.error("FATAL Mongoose connection error:", err);
});
// ----------------------------------------

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

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

const store = MongoStore.default.create({
  mongoUrl: process.env.MONGODB_URI,
  crypto: {
    secret: process.env.SECRET || "mysupersecret"
  },
  touchAfter: 24 * 3600 // time period in seconds
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

const sessionoption = {
  store: store,
  secret: process.env.SECRET || "mysupersecret", // IMPORTANT: Use env variable
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true in production
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

// Database Connection
async function connectToDatabase() {
    const dbUrl = process.env.MONGODB_URI;

    if (!dbUrl) {
        throw new Error("MONGODB_URI environment variable is not set!");
    }

    try {
        const conn = await mongoose.connect(dbUrl, {
            // Modern Mongoose options
            serverSelectionTimeoutMS: 30000, // 30 seconds timeout
            socketTimeoutMS: 45000, // 45 seconds timeout
            maxPoolSize: 10, // Maintain up to 10 socket connections
            // Note: For modern Mongoose, useNewUrlParser and useUnifiedTopology are no longer needed
        });
        
        console.log("Mongoose connection established.");
        
        // Handle database connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        
        // Graceful shutdown
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        });
        
        return conn;
    } catch (error) {
        console.error("FATAL Mongoose connection error:", error);
        process.exit(1); // Exit the process if DB connection fails
    }
}

// Connect to database
connectToDatabase();

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


const PORT = process.env.PORT || 8080;

// Only start the server if this file is run directly (not imported)
if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  // Graceful shutdown handling
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
      console.log('Process terminated');
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
      console.log('Process terminated');
    });
  });
}

module.exports = app;
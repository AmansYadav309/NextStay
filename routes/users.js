const express = require("express");
const user = require("../models/user");
const route = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const wrapAsync = require("../utils/wrapAsync");
const {saveRedirectUrl} = require("../middleware")
const userControllers = require("../controllers/users")


route.route( "/signin")
.get( async (req, res) => {
  res.render("users/Signup.ejs");
})
.post(
  wrapAsync(userControllers.SignUp)
);
 

route.route("/login")
.get( (req, res) => {
  res.render("users/login.ejs")
})
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/signin",
    failureFlash: true,
  }),
  userControllers.Login
);


route.get("/logout", userControllers.Logout );


// //signup
// route.get("/signin", async (req, res) => {
//   res.render("users/Signup.ejs");
// }); 



// route.post(
//   "/signin",
//   wrapAsync(userControllers.SignUp)
// );

// //ligin
// route.get("/login", (req, res) => {
//   res.render("users/login.ejs");
// });



// route.post(
//   "/login",
//   saveRedirectUrl,
//   passport.authenticate("local", {
//     failureRedirect: "/signin",
//     failureFlash: true,
//   }),
//   userControllers.Login
// );



module.exports = route;

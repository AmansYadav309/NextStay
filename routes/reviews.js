const express = require("express");
const route = express.Router({mergeParams: true});
const listing = require("../models/listing");
const Review = require("../models/review"); 
const wrapAsync = require("../utils/wrapAsync")
const { reviewSchema } = require("../schema.js");
const { isLogedin  , reviewlisting  , isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");



//post  rout
route.post("/", isLogedin, reviewlisting, wrapAsync (reviewController.Post))


//DElete review rout 

route.delete("/:review_id", isLogedin ,  isReviewAuthor , wrapAsync(reviewController.Delete));

module.exports = route;
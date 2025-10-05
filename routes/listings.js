
const express = require("express");
const route = express.Router();
const listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync")
const expressError= require("../utils/expressError")
const { listingSchema } = require("../schema.js");
const passport = require("passport");
const { isLogedin  , IsOwner , validatelisting} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js")
const upload = multer({storage });



//listing routes
//index route
route.get ("/",  wrapAsync(listingController.index))


//new or create  rout 
route.get("/new", isLogedin, (req,res)=>{
  res.render("listings/new.ejs")  
})


//new/create rout post to save 
route.post("/", 
  isLogedin,
  upload.array('image'),
  // validatelisting,
  wrapAsync(listingController.create)
)

//edit rout 
route.get("/:id/edit", isLogedin , IsOwner , wrapAsync( listingController.Edit ))


route.route( "/:id" )
.put( isLogedin ,IsOwner,  upload.array('image'), wrapAsync( listingController.Update)) //update rout 
.delete(  isLogedin , IsOwner ,   wrapAsync(listingController.Delete)) //delete rout
.get(wrapAsync(listingController.Show ))//show rout


// //update rout 
// route.put("/:id", isLogedin ,IsOwner,  wrapAsync( listingController.Update))

// //delete rout 
// route.delete("/:id",  isLogedin , IsOwner ,   wrapAsync(listingController.Delete))


// //show rout 
// route.get("/:id", wrapAsync(listingController.Show ))


module.exports=route;
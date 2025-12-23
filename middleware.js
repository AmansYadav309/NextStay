const listing = require("./models/listing");
const Reviews = require("./models/review");
const { listingSchema , reviewSchema } = require("./schema.js");

const expressError = require("./utils/expressError");


module.exports.isLogedin  = (req,res,next) =>{
    if(!req.isAuthenticated()){
      req.session.redirectUrl = req.originalUrl;
      req.flash("error", "You must login first");
      return res.redirect("/login");
  }
  next();
}


module.exports.saveRedirectUrl = (req,res,next)=>{
   if(req.session.redirectUrl){
      res.locals.redirectUrl = req.session.redirectUrl;
   }
   next();
};

module.exports.IsOwner =  async(req,res,next)=>{
   let {id}= req.params;
      const listings  = await listing.findById(id);
      if( !listings.owner._id.equals( res.locals.CurUser._id)){
        req.flash("error" , "you don't have acces ");
            return res.redirect(`/listings/${id}`)
      }
      next()
}

module.exports.isReviewAuthor =  async(req,res,next)=>{
   let {id , review_id}= req.params;
      const review = await Reviews.findById(review_id);
      if( !review.author.equals( res.locals.CurUser._id)){
        req.flash("error" , "you don't have acces ");
            return res.redirect(`/listings/${id}`)
      }
      next()
}

module.exports.validatelisting = (req,res,next )=>{
  const {error} = listingSchema.validate(req.body);
    if (error) {
        throw new expressError(400, error.details[0].message);
    }else {
        next();
    }
}

module.exports.reviewlisting = (req,res,next )=>{
  const {error} = reviewSchema.validate(req.body);
    if (error) {
        throw new expressError(400, error.details[0].message);
    }else {
        next();
    }
}

const mongoose = require("mongoose");
const review = require("./review");
const schema = mongoose.Schema;


const listingSchema = new schema({
    title : {
        type : String,
       required : true

    },
    description :{
        type : String,      
    },
   image: [
  {
    filename: String,
    url: String
  }
],
    price : {
        type : Number
    },  

    location : {
        type : String,
    },
     
    country : {
        type : String 
    },
    review : [
        {
            type: mongoose.Schema.Types.ObjectId,
          ref: "Review" 

        }
    ],
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    geometry : {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
})

//post middleware to delete review when listing is deleted
listingSchema.post("findOneAndDelete" , async(listing)=>{
    if(listing){
         await review.deleteMany({ _id: { $in : listing.review} });
    }
})

    
 const listing = new mongoose.model ("listing", listingSchema);
 module.exports = listing ;
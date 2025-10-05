const listing = require("../models/listing");

// import the base client
const mbxClient = require('@mapbox/mapbox-sdk');

// import the specific service you want
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const mapToken = process.env.MAP_TOKEN;

// initialize base client
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index= async(req,res)=>{
 const alllist= await listing .find({})
 res.render("listings/index.ejs", {alllist});
}


module.exports.create = async (req, res, next) => {
  const response = await geocodingClient.forwardGeocode({
    query: req.body.list.location,
    limit: 1
  }).send();

  const newlist = new listing(req.body.list);
  newlist.owner = req.user._id;
  newlist.geometry = response.body.features[0].geometry;

  // multiple images
  newlist.image = req.files.map(f => ({ url: f.path, filename: f.filename }));

  const savedListing = await newlist.save();
  console.log(savedListing);

  req.flash("success", "New listing Added successfully");
  res.redirect("/listings");
};


module.exports.Edit = async (req, res) => {
    let { id } = req.params;
    const listid = await listing.findById(id);

    if (!listid) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    // Check if there is at least one image
    let orignalImage = null;
    if (listid.image && listid.image.length > 0 && listid.image[0].url) {
        orignalImage = listid.image[0].url.replace(
            "/upload",
            "/upload/w_250,h_250,c_fill,bo_5px_solid_lightblue"
        );
    }

    res.render("listings/edit.ejs", { listid, orignalImage });
};



module.exports.Update = async (req, res) => {   
    let { id } = req.params;
    const Listings = await listing.findByIdAndUpdate(id, req.body.list, { runValidators: true, new: true });

    if (req.files && req.files.length > 0) {
        const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
        Listings.image.push(...imgs);   // add new images
        await Listings.save();
    }

    req.flash("success", "Listing Updated Successfully");
    res.redirect(`/listings/${id}`);

}

module.exports.Delete= async (req,res)=>{
   let {id}= req.params;
  let deleteList=   await listing.findByIdAndDelete(id);
  console.log(deleteList);
   req.flash("success",  "Listing Deleted successfully")
  res.redirect("/listings");

}



module.exports.Show= async (req,res)=>{
    let {id}= req.params;
    const listid =  await listing.findById(id).populate({
            path: "review",
            populate: { path: "author" }
        })
        .populate("owner");
    if(!listid){
       req.flash("error",  "Listing not found")
       return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listid});
}
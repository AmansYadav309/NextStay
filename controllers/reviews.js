const listing = require("../models/listing");
const Review = require("../models/review"); 



module.exports.Post = async (req, res) => {
  const newreview = new Review(req.body.review);
  newreview.author = req.user._id;
  await newreview.save();

  await listing.findByIdAndUpdate(req.params.id, {
    $push: { review: newreview._id }
  });

  req.flash("success", "New review added successfully");
  res.redirect(`/listings/${req.params.id}`);
};



module.exports.Delete = async (req, res) => {
    let { id, review_id } = req.params;
    await Review.findByIdAndDelete(review_id);
    await listing.findByIdAndUpdate(id, { $pull: { review: review_id } });
     req.flash("success",  "Review deleted successfully")
    res.redirect(`/listings/${id}`);
}
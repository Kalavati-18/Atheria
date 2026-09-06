const express =require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

//validateReviews went to middleware part from here

// after controller by mvc, whatever was there inside wrapasync went to controller
const reviewController = require("../controllers/reviews.js");


// Post Review Route
router.post("/",
  isLoggedIn, 
  validateReview, 
  wrapAsync(reviewController.createReview)
);

// Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));


module.exports = router;
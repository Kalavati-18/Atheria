const express =require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {validateListing, isLoggedIn, isOwner} =require("../middleware.js");

//after implementation of mvc, whatever was there inside wrapasync went to controller
const listingController = require("../controllers/listings.js");

//to accept file -- multipart/form-data
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });


//validateListing from here went to middleware.js

//index route and //CREATE ROUTE
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, 
        upload.single("listing[image]"),
        validateListing,  
        wrapAsync(listingController.createListing)
    );

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm)

//show route //UPDATE ROUTE //DELETE ROUTE
router.
    route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, 
        isOwner, 
        upload.single("listing[image]"), 
        validateListing, 
        wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


//edit route
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
const homeController = require('../controllers/homeController');
const ecopicksBrandsController = require('../controllers/ecopicksBrandsController');
const router = require('express').Router();

//route to index page
router.get("/", ecopicksBrandsController.getPopularBrands, homeController.renderIndex);

//route to about page
router.get("/about", homeController.renderAboutPage);

//route to confirmation page
router.get("/confirmation", homeController.renderConfirmationPage);

//route to thank you page
router.get("/contact-confirmation", homeController.renderThankYouPage);

module.exports = router;

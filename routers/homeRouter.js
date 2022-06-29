const homeController = require('../controllers/homeController');
const ecopicksBrandsController = require('../controllers/ecopicksBrandsController');
const router = require('express').Router();

//route to index page
router.get("/", ecopicksBrandsController.getPopularBrands, homeController.renderIndex);

module.exports = router;

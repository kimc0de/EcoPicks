const searchController = require('../controllers/searchController');
const homeController = require('../controllers/homeController');
var router = require('express').Router();

router.get("/search", homeController.getPopularBrands, searchController.getSearchResults, searchController.renderSearchPage);
// router.post("/search", searchController.getSearchResults);

module.exports = router;

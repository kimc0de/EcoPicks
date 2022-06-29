const searchController = require('../controllers/searchController');
const ecopicksBrandsController = require('../controllers/ecopicksBrandsController');

var router = require('express').Router();

router.get("/search", ecopicksBrandsController.getPopularBrands, searchController.getSearchResults, searchController.renderSearchPage);
// router.post("/search", searchController.getSearchResults);

module.exports = router;

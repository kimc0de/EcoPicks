const searchController = require('../controllers/searchController');
var router = require('express').Router();

router.get("/search", searchController.getSearchResults, searchController.renderSearchPage);
// router.post("/search", searchController.getSearchResults);

module.exports = router;

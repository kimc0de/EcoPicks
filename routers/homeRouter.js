const homeController = require('../controllers/homeController');
const router = require('express').Router();

//route to index page
router.get("/", homeController.getHomePageBrands, homeController.renderIndex);

module.exports = router;

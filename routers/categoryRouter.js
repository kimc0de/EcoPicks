const router = require("express").Router(),
    categoryController = require("../controllers/categoryController");

router.get("/category/:categoryName", categoryController.getBrandsByCategory, categoryController.renderCategoryFilteredResult, categoryController.respondJSON);

module.exports = router;

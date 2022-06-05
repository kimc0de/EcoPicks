const router = require("express").Router(),
  categoryController = require("../api/categoryController");
  userFavAppsController = require("../api/userSavedBrandsController");
  userAppsController = require('../api/userRecommendedBrandsController');

router.get("/api/category/:categoryName", categoryController.getBrandsByCategory, categoryController.respondJSON);
router.get("/api/user/favourites", userFavAppsController.getAllSavedBrands, userFavAppsController.respondJSON);
router.get("/api/user/apps", userAppsController.getAllApps, userAppsController.respondJSON);
router.get("/api/categories", categoryController.getAllCategories, categoryController.respondJSON);

module.exports = router;

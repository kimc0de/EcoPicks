const router = require("express").Router(),
  categoryController = require("../controllers/categoryController");
  userFavAppsController = require("../api/userSavedBrandsController");
  userAppsController = require('../api/userRecommendedBrandsController');

router.get("/api/user/favourites", userFavAppsController.getAllSavedBrands, userFavAppsController.respondJSON);
router.get("/api/user/apps", userAppsController.getAllApps, userAppsController.respondJSON);
router.get("/api/categories", categoryController.getAllCategories, categoryController.respondJSON);

module.exports = router;

const router = require("express").Router(),
  categoryController = require("../controllers/categoryController"),
  userSavedBrandController = require("../api/userSavedBrandsController"),
  userFavAppsController = require("../api/userSavedBrandsController"),
  userAppsController = require('../api/userRecommendedBrandsController');

router.get("/api/user/savedBrands", userFavAppsController.getAllSavedBrands, userFavAppsController.respondJSON);
router.get("/api/user/apps", userAppsController.getAllApps, userAppsController.respondJSON);
router.get("/api/categories", categoryController.getAllCategories, categoryController.respondJSON);
router.get("/api/brand/:id/save", userSavedBrandController.saveBrand, userSavedBrandController.respondJSON);

module.exports = router;

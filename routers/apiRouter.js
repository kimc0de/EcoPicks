const router = require("express").Router(),
  categoryController = require("../controllers/categoryController"),
  userSavedBrandController = require("../controllers/userSavedBrandsController"),
  userFavAppsController = require("../controllers/userSavedBrandsController");

router.get("/api/user/savedBrands", userFavAppsController.getAllSavedBrands, userFavAppsController.respondJSON);
router.get("/api/categories", categoryController.getAllCategories, categoryController.respondJSON);
router.get("/api/brand/:id/save", userSavedBrandController.saveBrand, userSavedBrandController.respondJSON);
router.get("/api/brand/:id/remove", userSavedBrandController.removeBrandsFromCollection, userSavedBrandController.respondJSON)

module.exports = router;

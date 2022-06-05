const ecopicksBrandController = require('../controllers/ecopicksBrandsController');
const upload = require('../imageUpload');
const router = require('express').Router();

// routes to add new app page
router.get("/user/add", ecopicksBrandController.renderNewBrand);
router.post("/user/add", upload.single('image'), ecopicksBrandController.recommendBrand);

// routes to edit app page
router.get("/brand/:id/edit", ecopicksBrandController.renderNewBrand);
router.put("/brand/:id/edit", ecopicksBrandController.editEcopicksBrand);

// route to delete app page
router.delete("/brand/:id/delete", ecopicksBrandController.deleteEcopicksBrand);

// route to details page
router.get("/brand/:id", ecopicksBrandController.getDetailsPage);
router.post("/brand/:id", ecopicksBrandController.saveBrand, ecopicksBrandController.getSavedBrands);

module.exports = router;

const ecopicksBrandController = require('../controllers/ecopicksBrandsController');
const upload = require('../imageUpload');
const router = require('express').Router();

// routes to add new app page
router.get("/user/add", ecopicksBrandController.renderNewBrand);
router.post("/user/add", upload.single('image'), ecopicksBrandController.saveEcopicksBrand);

// routes to edit app page
router.get("/app/:id/edit", ecopicksBrandController.renderNewBrand);
router.put("/app/:id/edit", ecopicksBrandController.editEcopicksBrand);

// route to delete app page
router.delete("/app/:id/delete", ecopicksBrandController.deleteEcopicksBrand);

// route to details page
router.get("/app/:id", ecopicksBrandController.getDetailsPage);
router.post("/app/:id", ecopicksBrandController.addSavedBrand, ecopicksBrandController.getFavouriteApps);

module.exports = router;

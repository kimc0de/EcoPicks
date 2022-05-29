const ecopicksBrandController = require('../controllers/ecopicksBrandsController');
const upload = require('../imageUpload');
const router = require('express').Router();

// routes to add new app page
router.get("/user/add", ecopicksBrandController.renderNewApp);
router.post("/user/add", upload.single('image'), ecopicksBrandController.saveGreenPickApp);

// routes to edit app page
router.get("/app/:id/edit", ecopicksBrandController.renderNewApp);
router.put("/app/:id/edit", ecopicksBrandController.editGreenPickApp);

// route to delete app page
router.delete("/app/:id/delete", ecopicksBrandController.deleteGreenPickApp);

// route to details page
router.get("/app/:id", ecopicksBrandController.getDetailsPage);
router.post("/app/:id", ecopicksBrandController.addFavouriteApp, ecopicksBrandController.getFavouriteApps);

module.exports = router;

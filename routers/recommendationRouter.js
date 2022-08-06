const router = require('express').Router();
const recommendationController = require('../controllers/userRecommendationController');

// Send recommendation
router.get("/user/recommendation", recommendationController.renderRecommendPage);
router.post("/user/recommendation", recommendationController.saveUserRecommendation);
router.delete("/user/recommendation/:id/delete", recommendationController.deleteRecommendedBrand);

module.exports = router;

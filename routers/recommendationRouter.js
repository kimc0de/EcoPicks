const router = require('express').Router();
const userRecommendationController = require('../controllers/userRecommendationController');

// Send recommendation
router.get("/user/recommendation", userRecommendationController.renderRecommendPage);
router.post("/user/recommendation", userRecommendationController.saveUserRecommendation)
router.delete("/user/recommendation/:id/delete", userRecommendationController.deleteRecommendedBrand)

module.exports = router;

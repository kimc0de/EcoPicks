const userController = require('../controllers/userController');
const userMessage = require('../controllers/userMessageController');
const homeController = require('../controllers/homeController');
const router = require('express').Router();
const passport = require("passport");

// Profile
router.get("/user", userController.getAllRecommendedBrands, userController.renderProfile);

// Register
router.get("/registration", userController.renderRegister);
router.post("/registration", userController.validateRegister, userController.createUser, homeController.redirectView);

// Google SSO
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/ecopicks",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect("/");
    });

// Login
router.get("/login", userController.renderLogin);
router.post("/login", userController.authenticate);
router.get("/logout", userController.logout, homeController.redirectView);

router.get("/users", userController.getAllUsers);

// Edit profile
router.get("/user/edit", userController.renderEdit);
router.put("/user/update/username", userController.updateUsername);
router.put("/user/update/email", userController.updateUserEmail);
router.put("/user/update/password", userController.updateUserPassword);

// Send recommendation
router.get("/user/recommendation", userController.renderRecommendPage);
router.post("/user/recommendation", userController.saveUserRecommendation)
router.delete("/user/recommendation/:id/delete", userController.deleteRecommendedBrand)

module.exports = router;

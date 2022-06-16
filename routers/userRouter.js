const userController = require('../controllers/userController');
const userMessage = require('../controllers/userMessageController');
const router = require('express').Router();

// Profile
router.get("/user", userController.getAllApps, userController.renderProfile);

// Register
router.get("/registration", userController.renderRegister);
router.post("/registration", userController.validateRegister, userController.createUser, userController.redirectView);

// Login
router.get("/login", userController.renderLogin);
router.post("/login", userController.authenticate);
router.get("/logout", userController.logout, userController.redirectView);

router.get("/users", userController.getAllUsers);

// Edit profile
router.get("/user/edit", userController.renderEdit);
router.put("/user/update", userController.update, userController.redirectView);

// Send message
router.post("/user/contact", userMessage.sendNewMessage);

module.exports = router;

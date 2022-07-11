const router = require('express').Router();
const userMessageController = require('../controllers/userMessageController');
const homeController = require("../controllers/homeController");

//route to contact page
router.get("/contact", userMessageController.renderContact);
router.post("/contact", userMessageController.sendNewMessage, homeController.redirectView);

module.exports = router;

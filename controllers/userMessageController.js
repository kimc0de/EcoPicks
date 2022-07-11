const {respondInternalError} = require("./errorController");
const UserMessage = require("../models/userMessage");

module.exports = {
    renderContact: (req, res) => {
        res.render("pages/contact");
    },

    sendNewMessage: async (req, res, next) => {
        let userId, username, email;
        if (req.user) {
            userId = req.user._id;
            username = req.user.username;
            email = req.user.email;
        } else {
            userId = null;
            username = req.body.userName;
            email = req.body.userEmail
        }

        try {
            let newMessage = new UserMessage({
                name: username,
                email: email,
                subject: req.body.contactSubject,
                message: req.body.contactMessage,
                userId: userId,
            });

            await newMessage.save().then(() => {
                res.locals.redirect = "/contact-confirmation";
                next();
            });

        } catch (error) {
            respondInternalError(error, req, res);
        }
    },
}

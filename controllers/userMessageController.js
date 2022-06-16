const {respondInternalError} = require("./errorController");
const UserMessage = require("../models/userMessage");

module.exports = {
    sendNewMessage: async (req, res) => {
        let userId;
        if (req.user) {
            userId = req.user._id;
        } else {
            userId = null;
        }

        try {
            let newMessage = new UserMessage({
                name: req.body.name,
                email: req.body.email,
                subject: req.body.subject,
                message: req.body.message,
                userId: userId,
            });

            await newMessage.save().then(() => {
                // @TODO: change to message sent confirmation page
                res.render("ecopicksBrands/confirmation");
            });

        } catch (error) {
            respondInternalError(error, req, res);
        }
    },
}

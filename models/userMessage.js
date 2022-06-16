const mongoose = require("mongoose"),
    userMessageSchema = mongoose.Schema({
        name: {type: String, require: true},
        email: {type: String, required: true, lowercase: true},
        subject: {type: String, require: true},
        message: {type: String, required: true},
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: false},
    });

module.exports = mongoose.model("user_message", userMessageSchema);

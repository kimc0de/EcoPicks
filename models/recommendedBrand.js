const mongoose = require("mongoose"),
    recommendedBrandSchema = mongoose.Schema({
        name: {type: String, required: true},
        website: {type: String, required: true},
        description: {type: String, required: false},
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true}
    });

module.exports = mongoose.model("recommendedBrand", recommendedBrandSchema);

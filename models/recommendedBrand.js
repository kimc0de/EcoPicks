const mongoose = require("mongoose"),
    recommendedBrandSchema = mongoose.Schema({
        brandName: {type: String, required: true},
        website: {type: String, required: true},
        reason: {type: String, required: true},
        description: {type: String, required: false},
        userId: {type: mongoose.Schema.Types.ObjectId || null, ref: "users", required: true},
        approved: {type: Boolean, require: false, default: false}
    });

module.exports = mongoose.model("user_recommendations", recommendedBrandSchema);

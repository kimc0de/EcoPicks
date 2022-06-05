const mongoose = require("mongoose"),
    ecopicksBrandSchema = mongoose.Schema({
        category: {type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true},
        description: {type: String, required: true},
        image: {type: String, required: true},
        name: {type: String, required: true},
        slogan: {type: String, required: true},
        website: {type: String, required: true},
        savedBy: [{type: mongoose.Schema.Types.ObjectId, ref: "users"}]
    });

module.exports = mongoose.model("ecopicksBrand", ecopicksBrandSchema);

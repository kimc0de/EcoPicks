const mongoose = require("mongoose"),
  categorySchema = mongoose.Schema({
    name: {type: String, required: true},
    lightColor: {type: String, required: true},
    darkColor: {type: String, required: true},
    keywords: [{type: String}],
  });

module.exports = mongoose.model("categories", categorySchema);

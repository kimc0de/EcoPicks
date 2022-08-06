const mongoose = require("mongoose"),
  categorySchema = mongoose.Schema({
    name: {type: String, required: true},
    color: {type: String, required: true},
    keywords: [{type: String}],
    endpoint: {type: String, required: true},
  });

module.exports = mongoose.model("categories", categorySchema);

const passportLocalMongoose = require("passport-local-mongoose");

const mongoose = require("mongoose"),
  userSchema = mongoose.Schema({
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true, lowercase: true },
      savedBrands: [{ type: mongoose.Schema.Types.ObjectId, ref: "ecopicksBrand" }],
      recommendedBrands: [{type: mongoose.Schema.Types.ObjectId, ref: "recommendedBrand"}]
  });

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

module.exports = mongoose.model("users", userSchema);

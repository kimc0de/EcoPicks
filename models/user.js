const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const mongoose = require("mongoose"),
  userSchema = mongoose.Schema({
      username: { type: String, required: true },
      email: { type: String, required: true, unique: true, lowercase: true },
      savedBrands: [{ type: mongoose.Schema.Types.ObjectId, ref: "ecopicksBrand" }],
      recommendedBrands: [{type: mongoose.Schema.Types.ObjectId, ref: "recommendedBrand"}],
      googleId: String,
  });

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

userSchema.plugin(findOrCreate); // For Google Oauth

module.exports = mongoose.model("users", userSchema);

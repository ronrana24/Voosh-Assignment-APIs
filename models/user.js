const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  profile: {
    isPublic: { type: Boolean, default: true },
    bio: { type: String, default: "" },
    phone: { type: String, default: "" },
    photo: { type: String, default: "" },
  },
});

userSchema.methods.verifyPassword = function (password) {
  return this.password === password;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

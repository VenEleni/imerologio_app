const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    lastname: String,
    email: {type: String},
    password: {type: String}
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;

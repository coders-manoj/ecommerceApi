const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    mobile: {
      type: String,
      required: true,
      unique: true,
      max: [15, "Please enter valid mobile"],
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: [6, "Too Short"] },
  },
  { timestamps: true }
);

module.exports = model("users", userSchema);

const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Array, required: true, default: [] },
  },
  { timestamps: true }
);

module.exports = model("products", productSchema);

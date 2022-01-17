const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    products: [{product_id: {type: String, quantity: Number}}]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);

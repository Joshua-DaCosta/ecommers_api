const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    product_id: {
      type: Number,
      default: 1,
    },
    amount: {
      type: Number,
      required: true,
    },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

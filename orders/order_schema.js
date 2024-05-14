const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerID: { type: mongoose.Schema.Types.ObjectId, required: true },
  bookID: { type: mongoose.Schema.Types.ObjectId, required: true },
  initialDate: { type: Date, required: true },
  deliveryDate: { type: Date, required: true },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

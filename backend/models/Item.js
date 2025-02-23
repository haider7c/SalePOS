const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemName: String,
  category: String, // For single category selection
  salePrice: Number,
  purchasePrice: Number,
  itemQuantity: { type: Number, default: 1 }, // Added itemQuantity with default value 1
  quantityPerUnit: { type: String, required: true }, // Added quantityPerUnit as a required field
  company: String,
  invoiceNumber: String,
  serialNumber: String,
  batchNumber: String,
  date: Date,
});

module.exports = mongoose.model("Item", itemSchema);
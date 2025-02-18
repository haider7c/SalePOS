const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    itemName: String,
    category: String, // For single category selection
    salePrice: String,
    purchasePrice: Number,
    itemQuantity: { type: Number, default: 1 }, // Added itemQuantity with default value 1
});

module.exports = mongoose.model("Item", itemSchema);
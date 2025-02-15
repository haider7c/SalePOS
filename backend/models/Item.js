const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    itemName: String,
    category: String, // For single category selection
    salePrice: String,
    purchasePrice: Number,
});

module.exports = mongoose.model("Item", itemSchema);

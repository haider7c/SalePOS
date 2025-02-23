const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  invoiceAmount: { type: Number, required: true },
  receivedAmount: { type: Number, required: true },
  date: { type: String, required: true },
  serialNumb: { type: Number, required: true },
  invoiceItems: [
    {
      itemName: { type: String, required: true },
      category: { type: String, required: true },
      salePrice: { type: Number, required: true },
      itemQuantity: { type: Number, required: true },
    },
  ],
  balance: { type: Number, required: true },
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = Invoice;

const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  items: [
    {
      description: String,
      riceRate: Number,
      safiWeight: Number,
      emptyBag: Number,
      quantity: Number,
      weight: Number,
      kgWeight: Number,
      unit: String,
    },
  ],

  notes: String,
  terms: String,
  vehicleReg: String,
  transpExp: Number,
  amountPaid: Number,
  serialNumb: String,
  billTo: String,
  phone: String,
  date: Date,
  bardanaList: [
    {
      bardanaDesc: String,
      bardanaQty: Number,
      addBardana: Number,
      totalBardana: Number,
    },
  ],
  slaeList: [
    {
      slaeDesc: String,
      slaeQty: Number,
      labourCost: Number,
      totalSlae: Number,
    },
  ],
  prevDue: Number,
  prevDueAction: { type: String, enum: ["+", "-"], default: "+" },
  transpAction: { type: String, enum: ["+", "-"], default: "+" },
  brokery: Number,
  brokValue: Number,
  total: Number,
  balanceDue: Number,
  brokAddSub: String,
});

module.exports = mongoose.model("Invoice", InvoiceSchema);

const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice.js");

// Create Invoice (POST Request)
router.post("/create", async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).json({ message: "Invoice created successfully", invoice });
  } catch (error) {
    res.status(500).json({ message: "Error creating invoice", error });
  }
});

// Get All Invoices (GET Request)
router.get("/all", async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching invoices", error });
  }
});

// Get Invoice by ID (GET Request)
router.get("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Error fetching invoice", error });
  }
});

// Delete Invoice by ID (DELETE Request)
router.delete("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting invoice", error });
  }
});

module.exports = router;

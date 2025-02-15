const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice"); // Import your invoice model

router.post("/", async (req, res) => {
  console.log("Received data:", req.body); // Log the incoming data
  try {
    const newInvoice = new Invoice(req.body);
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    console.error("Error creating invoice:", error.message); // Log the error
    res
      .status(500)
      .json({ error: "Failed to create invoice", details: error.message });
  }
});

// GET route to fetch all invoices
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Log the received ID
    console.log("Deleting invoice with ID:", id);

    const deletedInvoice = await Invoice.findByIdAndDelete(id);
    if (!deletedInvoice) {
      console.error("Invoice not found for ID:", id);
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body; // Assuming the data to update is in the request body

  try {
    // Log the received ID and the data to be updated
    console.log("Updating invoice with ID:", id);
    console.log("Updated data:", updatedData);

    const updatedInvoice = await Invoice.findByIdAndUpdate(id, updatedData, {
      new: true, // This will return the updated document
      runValidators: true, // This will ensure that the update respects the validation rules
    });

    if (!updatedInvoice) {
      console.error("Invoice not found for ID:", id);
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json({
      message: "Invoice updated successfully",
      updatedInvoice, // Sending back the updated invoice data
    });
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// ✅ Route to add a new category
router.post("/category", async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Category name is required!" });
        }

        // Check if category already exists
        const existingItem = await Item.findOne({ category: name });

        if (existingItem) {
            return res.status(400).json({ message: "Category already exists!" });
        }

        // Create a new item just to store the category
        const newCategory = new Item({ category: name });
        await newCategory.save();

        res.status(201).json({ message: "Category added successfully!", category: name });
    } catch (error) {
        res.status(500).json({ error: "Failed to add category", details: error.message });
    }
});

// ✅ Route to fetch all unique categories
router.get("/categories", async (req, res) => {
    try {
        // Fetch distinct categories
        const categories = await Item.distinct("category");
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch categories", details: error.message });
    }
});

router.post("/newItem", async (req, res) => {
    try {
        const item = req.body;
        // Create a new item just to store the category
        const newItem = new Item(item);
        await newItem.save();

        res.status(201).json({ message: "Data added successfully!", data: newItem });
    } catch (error) {
        res.status(500).json({ error: "Failed to add Data", details: error.message });
    }
});

// ✅ Route to fetch all unique categories
router.get("/items", async (req, res) => {
    try {
        // Fetch distinct categories
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch categories", details: error.message });
    }
});

module.exports = router;

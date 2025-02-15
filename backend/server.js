const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const serialNumberRoute = require("./routes/SerialNumber");
const invoiceRoutes = require("./routes/InvoiceRoutes");
const itemRoutes = require("./routes/ItemRoutes");  

// Load environment variables
dotenv.config();

// Check required environment variables
if (!process.env.MONGO_URI) {
  console.error("Error: MONGO_URI is not defined in the .env file");
  process.exit(1);
}

if (!process.env.PORT) {
  console.warn(
    "Warning: PORT is not defined in the .env file. Using default port 5000"
  );
}

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/invoices", invoiceRoutes);
app.use("/api/serialNumber", serialNumberRoute);
app.use("/api/item", itemRoutes);


app.get("/api/date", (req, res) => {
  const currentDate = new Date().toISOString(); // Get current date in ISO format
  res.json({ date: currentDate });
});

// Default route for testing
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "An unexpected error occurred" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

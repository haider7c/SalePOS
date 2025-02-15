import React, { useState } from "react";
// import { createExpense } from "../api"; // Import your createExpense function

const AddExpense = () => {
  const [expenseData, setExpenseData] = useState({
    category: "",
    description: "",
    billingAmount: 0,
    paymentDate: "",
    paymentMethod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveExpense = async () => {
    try {
      // Call the createExpense function to send data to the backend
      const savedExpense = await createExpense(expenseData);
      console.log("Expense saved successfully:", savedExpense);
      alert("Expense Saved Successfully!");
    } catch (error) {
      console.error("Error saving expense:", error);
      alert("Failed to save the expense. Please try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-auto mx-auto mt-10">
      <h2 className="text-lg font-bold mb-4 text-center">Add Expense</h2>
      <form>
        {/* Select Category */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Select Category*</label>
          <select
            name="category"
            value={expenseData.category}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="">-- SELECT CATEGORY --</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Internet">Internet</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Description*</label>
          <input
            type="text"
            name="description"
            value={expenseData.description}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="Enter Description"
            required
          />
        </div>

        {/* Billing Amount */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Billing Amount*</label>
          <input
            type="number"
            name="billingAmount"
            value={expenseData.billingAmount}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="Enter Amount"
            required
          />
        </div>

        {/* Payment Date */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Payment Date*</label>
          <input
            type="date"
            name="paymentDate"
            value={expenseData.paymentDate}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Payment Method*</label>
          <input
            type="text"
            name="paymentMethod"
            value={expenseData.paymentMethod}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="Enter Payment Method"
            required
          />
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleSaveExpense}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Save Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;

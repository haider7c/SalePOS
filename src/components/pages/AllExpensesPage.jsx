import React, { useState } from "react";
import ExpensesTable from "../Frontcomponents/ExpensesTable.jsx";
import Sidebar from "../Frontcomponents/Sidebar.jsx";

const AllExpensesPage = () => {
  const expenses = [
    {
      date: "2024-10-07",
      category: "Software Subscriptions",
      description: "Software subscription",
      amount: 10000,
      paidVia: "Cash",
      addedBy: "reception",
    },
    {
      date: "2024-10-07",
      category: "Utility Bills",
      description: "Electricity Bill",
      amount: 15000,
      paidVia: "Cash",
      addedBy: "reception",
    },
    {
      date: "2024-10-07",
      category: "Marketing/Advertising",
      description: "Ads",
      amount: 200,
      paidVia: "Online",
      addedBy: "reception",
    },
    {
      date: "2024-10-07",
      category: "Rent/Mortgage",
      description: "Monthly Rent",
      amount: 80000,
      paidVia: "Online",
      addedBy: "reception",
    },
    {
      date: "2024-10-07",
      category: "Supplies/Amenities",
      description: "Towel Laundry",
      amount: 2000,
      paidVia: "Cash",
      addedBy: "reception",
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">All Expenses</h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Add Expense
          </button>
        </div>
        <ExpensesTable expenses={expenses} />
      </div>
    </div>
  );
};

export default AllExpensesPage;

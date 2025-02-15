import React from "react";

const ExpensesTable = ({ expenses }) => {
  return (
    <div className="bg-white p-4 shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">All Expenses</h2>
        <div className="space-x-2">
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Copy
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Excel
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            CSV
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            PDF
          </button>
        </div>
      </div>
      <div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Date</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Paid Via</th>
              <th className="border p-2">Added By</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td className="border p-2">{expense.date}</td>
                <td className="border p-2">{expense.category}</td>
                <td className="border p-2">{expense.description}</td>
                <td className="border p-2 text-red-500">
                  Rs. {expense.amount}
                </td>
                <td className="border p-2">{expense.paidVia}</td>
                <td className="border p-2">{expense.addedBy}</td>
                <td className="border p-2 text-center">
                  <button className="bg-gray-300 text-gray-700 px-2 py-1 rounded">
                    ...
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpensesTable;

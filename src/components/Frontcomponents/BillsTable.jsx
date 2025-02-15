import React from "react";

const BillsTable = ({ bills }) => {
  return (
    <div className="bg-white p-4 shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">All Bills</h2>
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
              <th className="border p-2">Time</th>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Contact</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Paid Via</th>
              <th className="border p-2">Billed By</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, index) => (
              <tr key={index}>
                <td className="border p-2">{bill.time}</td>
                <td className="border p-2">{bill.customer}</td>
                <td className="border p-2">{bill.contact}</td>
                <td className="border p-2">Rs. {bill.amount}</td>
                <td className="border p-2">{bill.paidVia}</td>
                <td className="border p-2">{bill.billedBy}</td>
                <td className="border p-2 text-center">
                  <button className="bg-gray-300 text-gray-700 px-2 py-1 rounded">
                    Edit
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

export default BillsTable;

import React from "react";

const InvoiceHeader = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <div>
        <h1 className="text-xl font-bold">ABC Gym</h1>
        <p className="text-sm text-gray-500">0319-2713005</p>
        <p className="text-sm text-gray-500">
          3/147, near Tooso Restaurant, Karachi, Pakistan
        </p>
      </div>
      <div className="flex space-x-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Download PDF
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded">
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default InvoiceHeader;

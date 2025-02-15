import React, { useState } from "react";

const TransactionFilter = ({ onFilter }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleFilter = () => {
    onFilter(fromDate, toDate);
  };

  return (
    <div className="p-4 bg-white shadow rounded mb-4">
      <h3 className="text-lg font-bold mb-4">Filter Transactions</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-medium mb-1">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilter;

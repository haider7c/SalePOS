import React, { useState } from "react";

const DateFilterPanel = ({ totalBills, totalSales }) => {
  const [filterDate, setFilterDate] = useState("");

  const handleSearch = () => {
    alert(`Filtering bills for date: ${filterDate}`);
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-bold mb-4">Search Bills by Date</h2>
      <div className="mb-4">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 w-full rounded"
      >
        Search
      </button>
      <div className="mt-6">
        <div className="text-center mb-4">
          <h3 className="text-3xl font-bold">{totalBills}</h3>
          <p className="text-gray-500">Total Bills</p>
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-bold text-red-500">Rs. {totalSales}</h3>
          <p className="text-gray-500">Total Sales</p>
        </div>
      </div>
    </div>
  );
};

export default DateFilterPanel;

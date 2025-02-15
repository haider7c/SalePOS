import React from "react";

const SummaryCards = ({ totalMemberships, totalSales, totalCashOuts }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-white p-4 shadow rounded text-center">
        <h4 className="text-lg font-bold">Total Memberships</h4>
        <p className="text-2xl text-blue-500">{totalMemberships}</p>
      </div>
      <div className="bg-white p-4 shadow rounded text-center">
        <h4 className="text-lg font-bold">Total Sales</h4>
        <p className="text-2xl text-green-500">Rs. {totalSales}</p>
      </div>
      <div className="bg-white p-4 shadow rounded text-center">
        <h4 className="text-lg font-bold">Total Cash-Outs</h4>
        <p className="text-2xl text-red-500">Rs. {totalCashOuts}</p>
      </div>
    </div>
  );
};

export default SummaryCards;

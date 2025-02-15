import React, { useState } from "react";
import TransactionFilter from "../Frontcomponents/TransactionFilter.jsx";
import TransactionTable from "../Frontcomponents/TransactionTable.jsx";
import SummaryCards from "../Frontcomponents/SummaryCards.jsx";
import Sidebar from "../Frontcomponents/Sidebar.jsx";

const AllTransactionsPage = () => {
  const [transactions, setTransactions] = useState([
    {
      date: "09 November 2024",
      type: "CASH-IN",
      category: "POS Billing",
      amount: 0,
    },
    {
      date: "09 November 2024",
      type: "CASH-IN",
      category: "POS Billing",
      amount: 300,
    },
    {
      date: "09 November 2024",
      type: "CASH-IN",
      category: "New/Renew Membership",
      amount: 18000,
    },
    {
      date: "09 November 2024",
      type: "CASH-IN",
      category: "New/Renew Membership",
      amount: 12500,
    },
  ]);

  const handleFilter = (fromDate, toDate) => {
    alert(`Filtering from ${fromDate} to ${toDate}`);
    // Add logic to filter transactions
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 grid grid-cols-3 gap-6">
        {/* Filter and Table */}
        <div className="col-span-2">
          <TransactionFilter onFilter={handleFilter} />
          <TransactionTable transactions={transactions} />
        </div>

        {/* Summary Cards */}
        <div className="col-span-1">
          <SummaryCards
            totalMemberships={10}
            totalSales={191100}
            totalCashOuts={157500}
          />
        </div>
      </div>
    </div>
  );
};

export default AllTransactionsPage;

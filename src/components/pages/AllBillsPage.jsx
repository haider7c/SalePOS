import React from "react";
import BillsTable from "../Frontcomponents/BillsTable.jsx";
import DateFilterPanel from "../Frontcomponents/DateFilterPanel.jsx";
import Sidebar from "../Frontcomponents/Sidebar.jsx";

const AllBillsPage = () => {
  const bills = [
    {
      time: "02:25:24 PM",
      customer: "Samina",
      contact: "03123456789",
      amount: 650,
      paidVia: "Cash",
      billedBy: "Admin",
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 grid grid-cols-3 gap-6">
        {/* Bills Table */}
        <div className="col-span-2">
          <BillsTable bills={bills} />
        </div>

        {/* Date Filter Panel */}
        <div className="col-span-1">
          <DateFilterPanel totalBills={1} totalSales={650} />
        </div>
      </div>
    </div>
  );
};

export default AllBillsPage;

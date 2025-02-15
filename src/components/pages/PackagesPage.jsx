import React, { useState } from "react";
import PackagesTable from "../Frontcomponents/PackagesTable.jsx";
import Sidebar from "../Frontcomponents/Sidebar.jsx";

const PackagesPage = () => {
  const [packages, setPackages] = useState([
    { name: "Basic Package", category: "Monthly", amount: 1500 },
    { name: "FIC FIT A", category: "Monthly", amount: 25000 },
    { name: "FIC FIT B", category: "Monthly", amount: 15000 },
    { name: "FIC FIT C", category: "Monthly", amount: 25000 },
    { name: "FIC FIT D", category: "Monthly", amount: 10000 },
    { name: "FIC FIT E", category: "Monthly", amount: 12500 },
  ]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">All Packages/Services</h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            + Add New Package
          </button>
        </div>
        <PackagesTable packages={packages} />
      </div>
    </div>
  );
};

export default PackagesPage;

import React from "react";
import SaleForm from "../Frontcomponents/SaleForm.jsx";
import Sidebar from "../Frontcomponents/Sidebar.jsx";

const Sale = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <SaleForm />
      </div>
    </div>
  );
};

export default Sale;
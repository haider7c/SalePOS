import React from "react";
import ItemForm from "../Frontcomponents/ItemForm.jsx";
import Sidebar from "../Frontcomponents/Sidebar.jsx";

const Item = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <ItemForm />
      </div>
    </div>
  );
};

export default Item;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [showSubmenu, setShowSubmenu] = useState(false);

  const toggleSubmenu = () => {
    setShowSubmenu((prev) => !prev);
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      {/* Sidebar Header */}
      <h1 className="text-2xl font-bold p-4">
        GYM<span className="text-red-500">Tow</span>
      </h1>

      {/* Sidebar Menu */}
      <ul className="mt-4 flex-1">
        <li
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          Dashboard
        </li>
        <li
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => navigate("/item")}
        >
          Add Item
        </li>
        <li
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => navigate("/invoicedetails")}
        >
          Items Details
        </li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer"
        onClick={() => navigate("/sale")}>
          Sale
        </li>
        <li
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => navigate("/itemsdetails")}
        >
          Invoice Details
        </li>
       
        {/* <li
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => navigate("/itemsdetails")}
        >
          Gym Expenses
        </li>
        <li
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => navigate("/alltransactionspage")}
        >
          All Transactions
        </li>
        <li
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => navigate("/staffpage")}
        >
          Staff/Trainers
        </li> */}

        {/* Submenu for Products and Packages */}
        {/* <li
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={toggleSubmenu}
        >
          Products/Packages
        </li> */}
        {/* {showSubmenu && (
          <ul className="pl-8 bg-gray-800">
            <li
              className="p-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => navigate("/packagespage")}
            >
              Packages
            </li>
            <li
              className="p-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => navigate("/productspage")}
            >
              Products
            </li>
          </ul>
        )} */}

        {/* <li
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => navigate("/settingspage")}
        >
          Settings
        </li>
        <li
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => navigate("/userspage")}
        >
          Users
        </li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Logout</li> */}
      </ul>
    </div>
  );
};

export default Sidebar;

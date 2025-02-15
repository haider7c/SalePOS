import React, { useState } from "react";
import NewRegistrationForm from "../Frontcomponents/NewRegistrationForm.jsx";
import AddExpense from "../Frontcomponents/AddExpense.jsx";

const DashboardHeader = () => {
  // const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  // const [showExpenseForm, setShowExpenseForm] = useState(false);

  // const toggleRegistrationForm = () => {
  //   setShowRegistrationForm((prev) => !prev);
  // };

  // const toggleExpenseForm = () => {
  //   setShowExpenseForm((prev) => !prev);
  // };

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md">
      <div>
        <h2 className="text-xl font-bold">Welcome</h2>
        <p className="text-sm text-gray-500">
          3/147, near Tooso Restaurant, Karachi
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;

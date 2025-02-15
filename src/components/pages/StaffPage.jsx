import React, { useState } from "react";
import StaffTable from "../Frontcomponents/StaffTable.jsx";
import Sidebar from "../Frontcomponents/Sidebar.jsx";

const StaffPage = () => {
  const [staffMembers, setStaffMembers] = useState([
    {
      id: 1,
      name: "Ahmed Nadeem",
      contact: "03315256548",
      cnic: "42301-9856659-2",
      role: "TRAINER",
    },
    {
      id: 2,
      name: "Muzammil Khan",
      contact: "03002541523",
      cnic: "42301-9856654-8",
      role: "TRAINER",
    },
    {
      id: 3,
      name: "Sunil",
      contact: "03215256323",
      cnic: "42301-9856659-8",
      role: "SWEEPER",
    },
    {
      id: 4,
      name: "Aleem",
      contact: "03256569874",
      cnic: "42301-9563325-9",
      role: "GUARD",
    },
    {
      id: 5,
      name: "Nadeem",
      contact: "03202564587",
      cnic: "42301-8956659-8",
      role: "CLEANER",
    },
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
          <h1 className="text-2xl font-bold">All Staff Members</h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Add New Staff
          </button>
        </div>
        <StaffTable staffMembers={staffMembers} />
      </div>
    </div>
  );
};

export default StaffPage;

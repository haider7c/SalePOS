import React, { useState } from "react";
import UsersTable from "../Frontcomponents/UsersTable.jsx";
import Sidebar from "../Frontcomponents/Sidebar.jsx";

const UsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, username: "admin", email: "admin@gmail.com", role: "admin" },
    {
      id: 2,
      username: "reception",
      email: "reception@gmail.com",
      role: "reception",
    },
    { id: 3, username: "counter", email: "counter@gmail.com", role: "pos" },
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
          <h1 className="text-2xl font-bold">All Users</h1>
        </div>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default UsersPage;

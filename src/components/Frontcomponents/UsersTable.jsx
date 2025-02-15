import React from "react";

const UsersTable = ({ users }) => {
  return (
    <div className="bg-white p-4 shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">All Users</h3>
        <div className="space-x-2">
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Copy
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Excel
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            CSV
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            PDF
          </button>
        </div>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">User ID</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded">
                  ⚙
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <p>
          Showing 1 to {users.length} of {users.length} entries
        </p>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border rounded">Previous</button>
          <button className="px-4 py-2 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;

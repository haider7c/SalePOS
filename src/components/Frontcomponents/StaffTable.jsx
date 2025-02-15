import React from "react";

const StaffTable = ({ staffMembers }) => {
  return (
    <div className="bg-white p-4 shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">All Staff Members</h3>
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
            <th className="border p-2">Staff ID</th>
            <th className="border p-2">Staff Name</th>
            <th className="border p-2">Staff Contact</th>
            <th className="border p-2">Staff CNIC</th>
            <th className="border p-2">Staff Role</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {staffMembers.map((staff, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{staff.id}</td>
              <td className="border p-2">{staff.name}</td>
              <td className="border p-2">{staff.contact}</td>
              <td className="border p-2">{staff.cnic}</td>
              <td className="border p-2">{staff.role}</td>
              <td className="border p-2">
                <button className="bg-gray-300 text-gray-700 px-2 py-1 rounded">
                  ...
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <p>
          Showing 1 to {staffMembers.length} of {staffMembers.length} entries
        </p>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border rounded">Previous</button>
          <button className="px-4 py-2 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default StaffTable;

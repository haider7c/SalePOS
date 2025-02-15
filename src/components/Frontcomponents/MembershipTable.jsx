import React, { useState } from "react";
import ActionMenu from "./ActionMenu.jsx"; // Import the ActionMenu component

const MembershipTable = () => {
  const [visibleMenu, setVisibleMenu] = useState(null); // Track which ActionMenu is visible

  const members = [
    {
      name: "Hasnain Ansari",
      contact: "0324-2305678",
      package: "FIC FIT B",
      amount: "15,000",
      expired: "11 November 2024",
    },
    {
      name: "Murtaza Hanif",
      contact: "0320-3265565",
      package: "FIC FIT A",
      amount: "25,000",
      expired: "11 November 2024",
    },
    // Add more members
  ];

  const toggleActionMenu = (index) => {
    setVisibleMenu((prev) => (prev === index ? null : index)); // Toggle visibility
  };

  return (
    <div className="p-4 bg-white shadow-md rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Recently Expired Memberships</h3>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Member</th>
            <th className="border p-2">Contact</th>
            <th className="border p-2">Package</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Expired</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index} className="text-center relative">
              <td className="border p-2">{member.name}</td>
              <td className="border p-2">{member.contact}</td>
              <td className="border p-2">{member.package}</td>
              <td className="border p-2">{member.amount}</td>
              <td className="border p-2">{member.expired}</td>
              <td className="border p-2">
                <button
                  onClick={() => toggleActionMenu(index)}
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                >
                  View
                </button>
                {/* Show ActionMenu when visibleMenu matches the index */}
                {visibleMenu === index && (
                  <div className="absolute top-12 left-0 z-10">
                    <ActionMenu />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembershipTable;

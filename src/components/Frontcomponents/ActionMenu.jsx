import React from "react";

const ActionMenu = () => {
  return (
    <div className="bg-white p-4 shadow rounded w-64">
      <ul className="space-y-2">
        {/* Create New Invoice */}
        <li className="flex items-center space-x-2 text-green-600 cursor-pointer hover:bg-gray-100 p-2 rounded">
          <span className="text-lg">➕</span>
          <span className="font-medium">Create New Invoice</span>
        </li>

        {/* Send Expiry Reminder SMS */}
        <li className="flex items-center space-x-2 text-blue-600 cursor-pointer hover:bg-gray-100 p-2 rounded">
          <span className="text-lg">✉️</span>
          <span className="font-medium">Send Expiry Reminder SMS</span>
        </li>

        {/* View Member Profile */}
        <li className="flex items-center space-x-2 text-orange-600 cursor-pointer hover:bg-gray-100 p-2 rounded">
          <span className="text-lg">👤</span>
          <span className="font-medium">View Member Profile</span>
        </li>

        {/* View Last Invoice */}
        <li className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded">
          <span className="text-lg">📄</span>
          <span className="font-medium">View Last Invoice</span>
        </li>
      </ul>
    </div>
  );
};

export default ActionMenu;

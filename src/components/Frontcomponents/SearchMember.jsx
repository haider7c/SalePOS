import React from "react";

const SearchMember = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded mt-4">
      <h3 className="text-lg font-bold">Search Member Profile</h3>
      <input
        type="text"
        placeholder="Enter Member Name"
        className="border p-2 w-full mt-2 rounded"
      />
      <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
        Search Member
      </button>
    </div>
  );
};

export default SearchMember;

import React, { useState } from "react";
import Sidebar from "../Frontcomponents/Sidebar.jsx";

const SettingsPage = () => {
  const [businessDetails, setBusinessDetails] = useState({
    businessName: "ABC Gym",
    contact1: "0319-2713005",
    contact2: "0309-1125617",
    email: "abcdgym@gmail.com",
    city: "Karachi",
    address:
      "3/147, near Tooso Restaurant, Bahadurabad BMCHS Sharafabad, Karachi, Pakistan",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusinessDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = () => {
    alert("Business details saved successfully!");
    console.log(businessDetails);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Business Logo */}
          <div className="bg-white p-6 shadow rounded">
            <h2 className="text-lg font-bold mb-4">Business Logo</h2>
            <div className="flex justify-center mb-4">
              <img
                src="https://via.placeholder.com/150" // Replace with actual logo URL
                alt="Business Logo"
                className="h-24"
              />
            </div>
            <p className="text-sm text-gray-500">
              1. (*) Fields are required <br />
              2. Enter Correct Details as these will be used in all
              transactional content
            </p>
          </div>

          {/* Business Details Form */}
          <div className="bg-white p-6 shadow rounded">
            <h2 className="text-lg font-bold mb-4">Business Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Business Name*
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={businessDetails.businessName}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Contact 1#*
                </label>
                <input
                  type="text"
                  name="contact1"
                  value={businessDetails.contact1}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Contact 2#
                </label>
                <input
                  type="text"
                  name="contact2"
                  value={businessDetails.contact2}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  name="email"
                  value={businessDetails.email}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Head Office Location City*
                </label>
                <input
                  type="text"
                  name="city"
                  value={businessDetails.city}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Head Office Address*
                </label>
                <textarea
                  name="address"
                  value={businessDetails.address}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                  rows="3"
                />
              </div>
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

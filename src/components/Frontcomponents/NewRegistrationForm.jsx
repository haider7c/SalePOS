import React, { useState } from "react";
// import { postData } from "../api/index"; // Import the postData function from the API folder

const NewRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    gender: "",
    joiningDate: "",
    dob: "",
    cnic: "",
    email: "",
    purpose: "",
    address: "",
  });

  const [statusMessage, setStatusMessage] = useState(""); // For success/error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call postData function from the API folder
      const response = await postData("members", formData);
      console.log("Form Data Submitted: ", response);
      setStatusMessage("Member successfully added!");
      setFormData({
        name: "",
        contact: "",
        gender: "",
        joiningDate: "",
        dob: "",
        cnic: "",
        email: "",
        purpose: "",
        address: "",
      });
    } catch (error) {
      console.error(
        "Error adding member:",
        error.response?.data || error.message
      );
      setStatusMessage("Failed to add member. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded mt-4">
      <h3 className="text-lg font-bold mb-4">Add New Member</h3>
      {statusMessage && (
        <p
          className={`mb-4 ${
            statusMessage.includes("successfully")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {statusMessage}
        </p>
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Member Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="Enter Member Name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Member Contact*
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="Enter Contact Number"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gender*</label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
                className="mr-2"
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                className="mr-2"
              />
              Male
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Joining Date*
          </label>
          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Date of Birth*
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CNIC</label>
          <input
            type="text"
            name="cnic"
            value={formData.cnic}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="XXXXX-XXXXXXX-X"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="member@gmail.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Purpose of Joining
          </label>
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="Purpose of Joining"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="Enter Address"
          ></textarea>
        </div>
        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save New Member
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewRegistrationForm;

import React, { useState } from "react";
import { createMembership } from "../api"; // Import your createMembership function from "./api"; // Adjust the path as per your file structure

const MembershipForm = () => {
  const [formData, setFormData] = useState({
    memberName: "Junaid Aleem",
    contact: "0321-5258569",
    package: "",
    packageAmount: 0,
    packageDuration: "",
    admissionFee: 0,
    discount: 0,
    totalAmount: 0,
    paymentDate: "2024-11-25",
    joiningDate: "2024-11-25",
    startDate: "2024-11-25",
    expiryDate: "2024-12-25",
    paymentMode: "Cash",
    trainer: "",
  });

  const [isNewMember, setIsNewMember] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "discount") {
      const discountValue = parseFloat(value);
      const maxDiscount =
        (parseFloat(formData.packageAmount) +
          parseFloat(formData.admissionFee)) *
        0.3;
      if (discountValue > maxDiscount) {
        alert(
          "Discount cannot exceed 30% of the total amount before discount."
        );
        updatedValue = maxDiscount;
      }
    }

    setFormData((prevData) => {
      const updatedFormData = {
        ...prevData,
        [name]: updatedValue,
      };

      if (
        name === "packageAmount" ||
        name === "admissionFee" ||
        name === "discount"
      ) {
        const packageAmount = parseFloat(updatedFormData.packageAmount) || 0;
        const admissionFee = parseFloat(updatedFormData.admissionFee) || 0;
        const discount = parseFloat(updatedFormData.discount) || 0;
        updatedFormData.totalAmount = packageAmount + admissionFee - discount;
      }

      return updatedFormData;
    });
  };

  const handleSaveMembership = async () => {
    try {
      if (isNewMember) {
        // Logic for new membership
        console.log("Creating new membership:", formData);
        const response = await createMembership(formData); // Call API function
        alert(`New Membership Created Successfully! ID: ${response.id}`);
      } else {
        // Logic for renewing membership
        console.log("Renewing membership:", formData);
        const response = await createMembership(formData); // Assuming same endpoint for simplicity
        alert(`Membership Renewed Successfully! ID: ${response.id}`);
      }
    } catch (error) {
      console.error("Error saving membership:", error.message);
      alert("Failed to save membership. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-6 bg-gray-100">
      {/* Member Details */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-bold mb-4">Member Details</h2>
        <label className="block mb-2">Select Existing Member</label>
        <input
          type="text"
          value={`${formData.memberName} - ${formData.contact}`}
          className="border p-2 w-full rounded mb-4"
          disabled
        />
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="memberType"
              className="mr-2"
              checked={isNewMember}
              onChange={() => setIsNewMember(true)}
            />
            New
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="memberType"
              className="mr-2"
              checked={!isNewMember}
              onChange={() => setIsNewMember(false)}
            />
            Renew
          </label>
        </div>
        <div className="mt-4 bg-yellow-100 p-3 rounded text-yellow-700">
          <p className="font-bold">Previous History</p>
          {isNewMember ? (
            <p>No Previous Memberships for {formData.memberName}</p>
          ) : (
            <p>Renewing existing membership for {formData.memberName}</p>
          )}
        </div>
      </div>

      {/* New/Renew Membership */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-bold mb-4">New/Renew Membership</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Member Name</label>
            <input
              type="text"
              name="memberName"
              value={formData.memberName}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
              placeholder="Enter Member Name"
            />
          </div>
          <div>
            <label className="block mb-1">Member Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
              placeholder="Enter Contact Number"
            />
          </div>
          <div>
            <label className="block mb-1">Select Package</label>
            <select
              name="package"
              value={formData.package}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
            >
              <option value="">-- SELECT PACKAGE --</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Package Amount</label>
            <input
              type="number"
              name="packageAmount"
              value={formData.packageAmount}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
              placeholder="Enter Amount"
            />
          </div>
          <div>
            <label className="block mb-1">Package Duration</label>
            <input
              type="text"
              name="packageDuration"
              value={formData.packageDuration}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
              placeholder="Enter Duration"
            />
          </div>
          <div>
            <label className="block mb-1">Admission/Registration</label>
            <input
              type="number"
              name="admissionFee"
              value={formData.admissionFee}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Discount</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Total Amount</label>
            <input
              type="number"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
              disabled
            />
          </div>
          <div>
            <label className="block mb-1">Payment Date</label>
            <input
              type="date"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Mode of Payment</label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="paymentMode"
                  value="Cash"
                  checked={formData.paymentMode === "Cash"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Cash
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMode"
                  value="Card"
                  checked={formData.paymentMode === "Card"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Card
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMode"
                  value="Online"
                  checked={formData.paymentMode === "Online"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Online
              </label>
            </div>
          </div>
          <div>
            <label className="block mb-1">Select Trainer</label>
            <select
              name="trainer"
              value={formData.trainer}
              onChange={handleInputChange}
              className="border p-2 w-full rounded"
            >
              <option value="">-- SELECT TRAINER --</option>
              <option value="Trainer 1">Trainer 1</option>
              <option value="Trainer 2">Trainer 2</option>
            </select>
          </div>
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={handleSaveMembership}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Membership
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipForm;

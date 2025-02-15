import React from "react";

const MembershipSummary = () => {
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-4">Membership Details</h2>
      <div className="space-y-2">
        <p>
          Member Name: <span className="font-bold">Junaid Aleem</span>
        </p>
        <p>
          Billing Date: <span className="font-bold">25 November 2024</span>
        </p>
        <p>
          Start Date: <span className="font-bold">25 November 2024</span>
        </p>
        <p>
          Expiry Date:{" "}
          <span className="font-bold text-red-500">25 December 2024</span>
        </p>
        <p>
          Registration: <span className="font-bold">Rs. 5,000</span>
        </p>
        <p>
          Discount: <span className="font-bold text-red-500">Rs. 2,000</span>
        </p>
        <p>
          Total Amount:{" "}
          <span className="font-bold text-green-600">Rs. 18,000</span>
        </p>
      </div>
      <div className="mt-4 text-center">
        <button className="bg-black text-white px-4 py-2 rounded">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default MembershipSummary;

import React from "react";

const InvoiceDetails = () => {
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-4 bg-green-200 p-2 rounded">
        Original Invoice
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>
            Invoice #: <span className="font-bold">41</span>
          </p>
          <p>
            Billing Date: <span className="font-bold">25 November 2024</span>
          </p>
        </div>
        <div>
          <p>
            Customer: <span className="font-bold">Junaid Aleem</span>
          </p>
          <p>
            Contact: <span className="font-bold">0321-5258569</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;

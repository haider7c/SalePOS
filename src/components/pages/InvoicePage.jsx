import React from "react";
import InvoiceHeader from "../Frontcomponents/InvoiceHeader.jsx";
import InvoiceDetails from "../Frontcomponents/InvoiceDetails.jsx";
import InvoiceTable from "../Frontcomponents/InvoiceTable.jsx";
import MembershipSummary from "../Frontcomponents/MembershipSummary.jsx";

const InvoicePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <InvoiceHeader />

      <div className="grid grid-cols-3 gap-4 mt-6">
        {/* Invoice Details */}
        <div className="col-span-2">
          <InvoiceDetails />
          <InvoiceTable />
        </div>

        {/* Membership Summary */}
        <div>
          <MembershipSummary />
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;

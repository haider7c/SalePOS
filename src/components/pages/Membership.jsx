import React from "react";
import MembershipForm from "../Frontcomponents/MembershipForm.jsx";
import Sidebar from "../Frontcomponents/Sidebar.jsx";

const Membership = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <MembershipForm />
      </div>
    </div>
  );
};

export default Membership;

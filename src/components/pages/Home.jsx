import React from "react";
import Sidebar from "../Frontcomponents/Sidebar.jsx";
import DashboardHeader from "../Frontcomponents/DashboardHeader.jsx";
import MembershipTable from "../Frontcomponents/MembershipTable.jsx";
import SearchMember from "../Frontcomponents/SearchMember.jsx";

const Home = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        {/* Dashboard Header */}
        <DashboardHeader />

        {/* Main Body */}
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4">
            {/* Recently Expired Memberships Table */}
            <div className="col-span-2">
              <MembershipTable />
            </div>

            {/* Search Member Section */}
            <div>
              <SearchMember />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

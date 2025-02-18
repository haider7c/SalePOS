import React from "react";
import InvoiceList from "../Frontcomponents/InvoiceList.jsx";
import Sidebar from "../Frontcomponents/Sidebar.jsx";


const itemsdetails =()=>{
  return (
    <div className="flex">
      <Sidebar />
      <InvoiceList />
    </div>
  )
}


export default itemsdetails;
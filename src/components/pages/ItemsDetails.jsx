import React from "react";
import InvoiceList from "../Frontcomponents/InvoiceList.jsx";
import Sidebar from "../Frontcomponents/Sidebar.jsx";
import { PDFViewer } from "@react-pdf/renderer";
import  Template1  from "./Templates/Template1.jsx";

const itemsdetails = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <InvoiceList />
      <PDFViewer>
        <Template1 />
      </PDFViewer>
    </div>
  );
};

export default itemsdetails;
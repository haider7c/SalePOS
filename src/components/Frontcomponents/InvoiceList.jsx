import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInvoices } from "../Redux/invoiceReducer.js";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import InvoiceTemp from "./InvoiceTemp.jsx";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Template2 from "../pages/Templates/Template2.jsx";

const InvoiceList = () => {
  const dispatch = useDispatch();
  const { invoices, error } = useSelector((state) => state.Invoice);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showPDFLink, setShowPDFLink] = useState(false);

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  const handleInvoiceClick = (invoice) => {
    setSelectedInvoice(invoice);
    setShowPDFLink(false); // Reset PDF link visibility when a new invoice is selected
  };

  const handleDownloadClick = () => {
    setShowPDFLink(true);
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen flex flex-row top-0">
        {/* Left Section */}
        <div className="flex flex-col w-1/3 border-r border-gray-300 p-4">
          <h1 className="text-lg font-bold mb-4">Invoices</h1>
          {error && <p className="text-red-500">Error: {error}</p>}
          <ul>
            {invoices && invoices.length > 0 ? (
              invoices.map((invoice, index) => (
                <li
                  key={invoice.id || `invoice-${index}`}
                  className="border-b py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleInvoiceClick(invoice)}
                >
                  <strong>{index + 1}.</strong> Invoice #{invoice.serialNumb}:{" "}
                  {invoice.total} ({invoice.billTo})
                </li>
              ))
            ) : (
              <p className="text-gray-500">No invoices available.</p>
            )}
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-2/3 items-center justify-center p-4">
          {selectedInvoice ? (
            <div className="w-full flex flex-col items-center">
              {/* <InvoiceTemp invoiceData={selectedInvoice} /> */}
              <div>
                <PDFViewer style={{ height: "650px", width: "550px" }}>
                  <Template2 data={selectedInvoice} />
                </PDFViewer>
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={handleDownloadClick}
                  className="px-10 py-3 bg-blue-500 text-white rounded-md w-60 text-center hover:bg-blue-600"
                >
                  Generate PDF
                </button>
                {showPDFLink && (
                  <div className="mt-4">
                    <PDFDownloadLink
                      document={<Template2 data={selectedInvoice} />}
                      fileName={selectedInvoice.billTo || "invoice.pdf"}
                      className="px-10 py-3 bg-customGreen text-white rounded-md w-60 text-center"
                    >
                      {({ blob, url, loading, error }) =>
                        loading ? "Loading document..." : "Download PDF!"
                      }
                    </PDFDownloadLink>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Select an invoice to view details.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InvoiceList;

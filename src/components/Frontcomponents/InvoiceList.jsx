import React, { useEffect, useState } from "react";
import { getItem, deleteItem } from "../api";
import SaleForm from "./SaleForm.jsx"; // Importing the form for editing

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Fetch all invoices from API
  const fetchInvoices = async () => {
    try {
      const data = await getItem("invoice/all");
      setInvoices(data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Handle Delete Invoice
  const handleDeleteInvoice = async (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        await deleteItem("invoice", id);
        fetchInvoices(); // Refresh the list
      } catch (error) {
        console.error("Error deleting invoice:", error);
      }
    }
  };

  // Handle Edit Invoice
  const handleEditInvoice = (invoice) => {
    setSelectedInvoice(invoice);
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Invoices</h2>

      {selectedInvoice ? (
        <SaleForm invoiceData={selectedInvoice} setSelectedInvoice={setSelectedInvoice} />
      ) : (
        <table className="min-w-full mt-4 border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-left">Customer</th>
              <th className="border p-2 text-left">Amount</th>
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice._id}>
                <td className="border p-2">{invoice.customerName}</td>
                <td className="border p-2">Rs {invoice.invoiceAmount}</td>
                <td className="border p-2">{invoice.date}</td>
                <td className="border p-2 flex space-x-2">
                  <button
                    onClick={() => handleEditInvoice(invoice)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteInvoice(invoice._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InvoiceList;

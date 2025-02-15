import React from "react";

const InvoiceTable = () => {
  return (
    <div className="mt-4 bg-white shadow rounded p-4">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Package</th>
            <th className="border-b p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b p-2">Registration</td>
            <td className="border-b p-2">Rs. 5,000</td>
          </tr>
          <tr>
            <td className="border-b p-2">FIC FIT B</td>
            <td className="border-b p-2">Rs. 15,000</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td className="border-t p-2 font-bold">Sub-Total</td>
            <td className="border-t p-2">Rs. 20,000</td>
          </tr>
          <tr>
            <td className="p-2 font-bold text-red-500">Discount</td>
            <td className="p-2 text-red-500">Rs. 2,000</td>
          </tr>
          <tr>
            <td className="p-2 font-bold text-green-600">Total</td>
            <td className="p-2 font-bold text-green-600">Rs. 18,000</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default InvoiceTable;

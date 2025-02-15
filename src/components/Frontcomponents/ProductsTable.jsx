import React from "react";

const ProductsTable = ({ products }) => {
  return (
    <div className="bg-white p-4 shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">All Products</h3>
        <div className="space-x-2">
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Copy
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Excel
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            CSV
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            PDF
          </button>
        </div>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Product</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  {product.category}
                </span>
              </td>
              <td className="border p-2 text-green-500">
                Rs. {product.amount}
              </td>
              <td className="border p-2">
                <button className="bg-red-500 text-white px-3 py-1 rounded">
                  ➡
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <p>
          Showing 1 to {products.length} of {products.length} entries
        </p>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border rounded">Previous</button>
          <button className="px-4 py-2 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;

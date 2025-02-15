import React, { useState } from "react";
import ProductsTable from "../Frontcomponents/ProductsTable.jsx";
import Sidebar from "../Frontcomponents/Sidebar.jsx";

const ProductsPage = () => {
  const [products, setProducts] = useState([
    { name: "Energy Water ABC", category: "Beverages", amount: 350 },
    { name: "Gatorade 500ml", category: "Beverages", amount: 200 },
    { name: "Gym Gloves", category: "Equipments", amount: 850 },
    { name: "Water 500 ml", category: "Beverages", amount: 100 },
  ]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">All Products</h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            + Add New Product
          </button>
        </div>
        <ProductsTable products={products} />
      </div>
    </div>
  );
};

export default ProductsPage;

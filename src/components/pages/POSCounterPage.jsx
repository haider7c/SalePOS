import React, { useState } from "react";
import POSSummary from "../Frontcomponents/POSSummary.jsx";
import ProductCategories from "../Frontcomponents/ProductCategories.jsx";
import Sidebar from "../Frontcomponents/Sidebar.jsx";

const POSCounterPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addItemToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    setTotal((prevTotal) => prevTotal + product.price);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 grid grid-cols-3 gap-6">
        {/* POS Summary Panel */}
        <div className="col-span-1">
          <POSSummary />
        </div>

        {/* Product Categories */}
        <div className="col-span-2">
          <ProductCategories addItem={addItemToCart} />
        </div>
      </div>
    </div>
  );
};

export default POSCounterPage;

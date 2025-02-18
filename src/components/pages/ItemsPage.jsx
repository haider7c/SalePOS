import React, { useState, useEffect } from "react";
import Sidebar from "../Frontcomponents/Sidebar.jsx";
import { getItem } from "../api";

const ItemsPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItem("item/items");
        setItems(data.filter(item => item.itemName && item.itemName.trim() !== ""));
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 w-full">
        <h2 className="text-xl font-bold mb-4">Items List</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Item Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Sale Price</th>
              <th className="border p-2">Purchase Price</th>
              <th className="border p-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item._id} className="border">
                  <td className="border p-2">{item.itemName}</td>
                  <td className="border p-2">{item.category}</td>
                  <td className="border p-2">{item.salePrice}</td>
                  <td className="border p-2">{item.purchasePrice}</td>
                  <td className="border p-2">{item.itemQuantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">No items found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsPage;

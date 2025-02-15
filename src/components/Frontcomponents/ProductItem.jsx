import React from "react";

const ProductItem = ({ name, price, onAdd }) => {
  return (
    <div
      className="p-4 bg-white rounded shadow cursor-pointer text-center hover:bg-gray-100"
      onClick={onAdd}
    >
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-green-500">Rs. {price}</p>
    </div>
  );
};

export default ProductItem;

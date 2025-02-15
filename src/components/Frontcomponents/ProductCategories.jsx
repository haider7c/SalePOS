import React from "react";
import ProductItem from "./ProductItem.jsx";

const ProductCategories = ({ addItem }) => {
  const products = {
    Beverages: [
      { name: "Gatorade 500ml", price: 200 },
      { name: "Water 500 ml", price: 100 },
      { name: "Energy Water ABC", price: 350 },
    ],
    Equipments: [{ name: "Gym Gloves", price: 850 }],
  };

  return (
    <div className="space-y-6">
      {Object.keys(products).map((category) => (
        <div key={category}>
          <h2 className="font-bold text-lg mb-4">{category}</h2>
          <div className="grid grid-cols-3 gap-4">
            {products[category].map((product) => (
              <ProductItem
                key={product.name}
                name={product.name}
                price={product.price}
                onAdd={() => addItem(product)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCategories;

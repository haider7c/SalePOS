import React, { useState } from "react";

const POSSummary = () => {
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [customer, setCustomer] = useState({ name: "", phone: "" });
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const handleConfirmPayment = () => {
    alert("Payment Confirmed!");
    console.log({
      discount,
      total,
      tax,
      customer,
      paymentMethod,
    });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">POS Summary</h2>
        <button className="text-red-500 font-bold">Clear</button>
      </div>
      <div className="space-y-4">
        {/* Discount */}
        <div>
          <label className="block text-sm font-medium mb-1">Discount</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="border p-2 w-full rounded"
            placeholder="Enter Discount"
          />
        </div>

        {/* Total and Tax */}
        <div className="text-lg">
          <p>
            <span className="font-bold">Total: </span>
            <span className="text-green-500">Rs. {total.toFixed(2)}</span>
          </p>
          <p>
            <span className="font-bold">Tax Amount: </span>
            Rs. {tax.toFixed(2)}
          </p>
        </div>

        {/* Customer Details */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Customer Name
          </label>
          <input
            type="text"
            value={customer.name}
            onChange={(e) =>
              setCustomer((prev) => ({ ...prev, name: e.target.value }))
            }
            className="border p-2 w-full rounded"
            placeholder="Enter Customer Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone#</label>
          <input
            type="text"
            value={customer.phone}
            onChange={(e) =>
              setCustomer((prev) => ({ ...prev, phone: e.target.value }))
            }
            className="border p-2 w-full rounded"
            placeholder="Enter Phone Number"
          />
        </div>

        {/* Payment Method */}
        <div className="flex space-x-4 items-center">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="Cash"
              checked={paymentMethod === "Cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Cash
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="Card"
              checked={paymentMethod === "Card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Card
          </label>
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleConfirmPayment}
            className="w-full bg-red-500 text-white px-4 py-2 rounded font-bold"
          >
            Confirm Payment
          </button>
          <button className="w-full bg-black text-white px-4 py-2 rounded font-bold">
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default POSSummary;

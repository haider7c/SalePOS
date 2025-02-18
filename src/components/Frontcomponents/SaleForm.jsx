import React, { useEffect, useState } from "react";
import axios from "axios";
import { getItem } from "../api";
import { useDispatch } from "react-redux";
import { setInvoiceData } from "../Redux/invoiceReducer.js"; // Adjust path if needed
import { postItem } from "../api";
import { useSelector } from "react-redux";
import { updateItem } from "../api"; // Import the update function

const SaleForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Added state for phone number
  const [invoiceAmount, setInvoiceAmount] = useState(0);
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [date, setDate] = useState("");
  const [serialNumb, setSerialNumb] = useState(0);
  const [items, setItems] = useState([]); // List of all items fetched from API
  const [selectedItem, setSelectedItem] = useState(null); // Selected item for adding to the invoice
  const [invoiceItems, setInvoiceItems] = useState([]); // Items added to the invoice
  const [balance, setBalance] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  // Check if all required fields are filled
  const isFormValid =
    customerName && phoneNumber && invoiceAmount > 0 && receivedAmount >= 0;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (invoiceItems.length === 0) {
      alert("Please add at least one item to the invoice.");
      return;
    }

    const invoiceData = {
      customerName,
      phoneNumber,
      invoiceAmount: totalSalePrice,
      receivedAmount,
      date,
      serialNumb,
      invoiceItems,
      balance: totalSalePrice - receivedAmount,
      quantity,
    };

    try {
      // Send invoice data to backend
      await postItem("invoice/create", invoiceData);
      console.log("Invoice saved successfully.");

      // Update inventory after invoice is created
      await handleSaveChanges(); // <-- Now only called once

      // Update serial number AFTER successful submission
      await fetchSerialNumber(true);

      // Dispatch to Redux store
      dispatch(setInvoiceData(invoiceData));

      // Clear form fields
      setCustomerName("");
      setPhoneNumber("");
      setReceivedAmount(0);
      setInvoiceItems([]);
      setSelectedItem(null);
      setQuantity(1);

      console.log("Form state reset successfully."); // Debugging
    } catch (error) {
      console.error("Failed to save invoice:", error);
    }
  };

  const invoiceData = useSelector((state) => state.invoice);

  useEffect(() => {
    console.log("Updated Redux State:", invoiceData);
  }, [invoiceData]); // Log when invoiceData changes

  // Function to filter out items with empty itemName
  const filteredItems = items.filter(
    (item) => item.itemName && item.itemName.trim() !== ""
  );
  const handleUpdateItem = async (id, updatedData) => {
    try {
      const response = await updateItem("item/items", id, updatedData);
      console.log("Item updated successfully:", response);
      alert("Item updated successfully!");

      // Optionally, refresh the item list after update
      fetchItems();
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item.");
    }
  };
  const handleSaveChanges = async () => {
    try {
      // Create an array of update promises for each item
      const updatePromises = invoiceItems.map(async (item) => {
        // Fetch current item data to get the latest quantity
        const fetchedItem = items.find((i) => i._id === item._id);

        if (!fetchedItem) {
          console.error(`Item with ID ${item._id} not found in inventory.`);
          return;
        }

        const updatedQuantity = Math.max(
          fetchedItem.itemQuantity - item.itemQuantity,
          0
        ); // Prevent negative values

        const updatedData = {
          itemQuantity: updatedQuantity,
        };

        // Call update API
        return updateItem("item/items", item._id, updatedData);
      });

      // Wait for all updates to complete
      await Promise.all(updatePromises);

      console.log("All items updated successfully."); // Only one log message
      fetchItems(); // Refresh items after update
    } catch (error) {
      console.error("Error updating items:", error);
    }
  };

  // Function to calculate total sale price
  const totalSalePrice = invoiceItems.reduce(
    (acc, item) => acc + (parseFloat(item.salePrice) || 0),
    0
  );
  useEffect(() => {
    setInvoiceAmount(totalSalePrice);
    console.log("Total Sale Price Updated:", totalSalePrice); // Debugging
  }, [totalSalePrice]);

  useEffect(() => {
    setBalance(totalSalePrice - receivedAmount);
    console.log("Balance Updated:", totalSalePrice - receivedAmount); // Debugging
  }, [receivedAmount]);

  // Add selected item to invoice items list
  const handleAddItemToInvoice = () => {
    if (selectedItem) {
      setInvoiceItems((prevItems) => {
        const updatedItem = { ...selectedItem, itemQuantity: quantity }; // Replace itemQuantity with quantity
        const updatedItems = [...prevItems, updatedItem];
        console.log("Item Added to Invoice:", updatedItem); // Debugging
        return updatedItems;
      });
      setSelectedItem(null); // Reset selected item
    }
  };

  // Fetch date from API
  useEffect(() => {
    const fetchDate = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/date");
        const fetchedDate = response.data.date;
        const formattedDate = new Date(fetchedDate).toISOString().split("T")[0];
        setDate(formattedDate);
        console.log("Date Fetched:", formattedDate); // Debugging
      } catch (error) {
        console.error("Error fetching date:", error);
      }
    };
    fetchDate();
  }, []);

  // Fetch items from API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItem("item/items");
        console.log("Fetched items:", data);
        setItems(data); // Set the items data directly
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    fetchSerialNumber(); // Fetch only on first load
  }, []);

  // Fetch serial number from API
  const fetchSerialNumber = async (isUpdate = false) => {
    try {
      // Check localStorage to avoid changing serial number on refresh
      const storedSerialNumber = localStorage.getItem("serialNumber");
      if (!isUpdate && storedSerialNumber) {
        setSerialNumb(parseInt(storedSerialNumber, 10)); // Keep the previous serial number
        return;
      }

      // Fetch new serial number only if it's an update or first-time load
      const data = await getItem("serialNumber/getSerialNumber");
      console.log("Fetched Serial Number:", data.serialNumber);
      setSerialNumb(data.serialNumber);

      // Store in localStorage
      localStorage.setItem("serialNumber", data.serialNumber);
    } catch (error) {
      console.error("Error fetching serial number:", error);
    }
  };

  // Handle item selection from dropdown
  const handleItemSelect = (e) => {
    const selectedItemName = e.target.value;
    const selectedItem = items.find(
      (item) => item.itemName === selectedItemName
    );
    setSelectedItem(selectedItem);
    console.log("Item Selected:", selectedItem); // Debugging
  };
  const handleDeleteTableItem = (indexToRemove) => {
    setInvoiceItems((prevItems) =>
      prevItems.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-auto mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      {/* Header */}
      <div className="grid grid-cols-2 gap-4 items-start">
        <div>
          <h2 className="text-md font-semibold">
            Enter details to make your first Sale <span>🚀</span>
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            First sale is made in less than a minute on Vyapar
          </p>
          <div className="rounded-md">
            <h3 className="font-semibold text-md flex items-center">
              <span className="text-blue-600 mr-2">📄</span> Invoice Details:
            </h3>
            <p className="text-sm my-4">
              <strong>Invoice Number:</strong>
              <strong>{serialNumb}</strong>
            </p>
            <p className="text-sm">
              <strong>Invoice Date:</strong> {date}
            </p>
          </div>
        </div>
        <div className="rounded-md">
          <h3 className="font-semibold text-md flex items-center">
            <span className="text-blue-600 mr-2">👤</span> Bill To:
          </h3>
          <label className="font-medium text-gray-700">
            Customer Name<span className="text-red-500">*</span>
          </label>
          <input
            required
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full border mt-2 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label className="font-medium text-gray-700">
            Phone Number<span className="text-red-500">*</span>
          </label>
          <input
            required
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border mt-2 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Item Dropdown and Add to Invoice */}
      <div className="mt-4 border-2 border-dashed border-blue-400 rounded-md p-4 text-center cursor-pointer">
        <label
          htmlFor="itemSelect"
          className="block font-semibold text-gray-700 mb-2"
        >
          Select Item
        </label>
        <select
          id="itemSelect"
          className="w-full p-2 border rounded-md focus:outline-none"
          value={selectedItem ? selectedItem.itemName : ""}
          onChange={handleItemSelect}
        >
          <option value="">Select an item</option>
          {filteredItems.map((item, index) => (
            <option key={index} value={item.itemName}>
              {item.itemName}
            </option>
          ))}
        </select>
        <div className="flex gap-3 justify-center items-center my-5">
          <label htmlFor="">Select Quantity</label>
          <label htmlFor="">{selectedItem?.itemQuantity}</label>
          <input
            type="number"
            className="p-2 border-red-400 border-2 rounded-md"
            value={quantity}
            onChange={(e) => {
              let value = parseInt(e.target.value, 10);

              if (isNaN(value)) {
                setQuantity(""); // Reset input if it's not a number
              } else if (value < 1) {
                setQuantity(1); // Enforce minimum value
              } else if (value > selectedItem?.itemQuantity) {
                setQuantity(selectedItem?.itemQuantity); // Enforce maximum value
              } else {
                setQuantity(value); // Set valid value
              }
            }}
          />
          <h1>{quantity}</h1>
        </div>

        <button
          type="button"
          onClick={handleAddItemToInvoice}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
          disabled={!selectedItem}
        >
          Add Item to Invoice
        </button>
      </div>

      {/* Invoice Calculation */}
      <div className="border border-gray-300 rounded-md p-4 mt-4">
        <h3 className="font-semibold text-md flex items-center">
          <span className="text-blue-600 mr-2">🛡️</span> Invoice Calculation:
        </h3>

        {/* Amount Fields */}
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4 items-center mt-3">
            <label className="font-medium text-gray-700">Received</label>
            <div className="flex items-center border rounded-md px-3 py-2 bg-white">
              <span className="text-gray-500">Rs</span>
              <input
                type="number"
                value={receivedAmount === 0 ? "" : receivedAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  setReceivedAmount(
                    value === "" ? "" : parseFloat(value) || ""
                  );
                }}
                className="w-full text-right border-none focus:outline-none bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Display Total Sale Price */}
      <div className="mt-4 bg-gray-100 p-4 rounded-md font-semibold text-md flex justify-between">
        <span>Total:</span>
        <span>Rs {totalSalePrice.toFixed(2)}</span>{" "}
        <span>Rs {invoiceData.customerName}</span>{" "}
        <span>Rs {invoiceAmount.toFixed(2)}</span>{" "}
        {/* Ensures two decimal places */}
      </div>

      <div className="mt-4 bg-gray-100 p-4 rounded-md font-semibold text-md flex justify-between">
        <span>Received:</span>
        <span>Rs {receivedAmount}</span> {/* Ensures two decimal places */}
      </div>

      {/* Balance Section */}
      <div className="bg-green-100 text-green-600 p-4 rounded-md font-semibold text-md flex justify-between mt-4">
        <span>Due:</span>
        <span>Rs {balance.toFixed(2)}</span>
      </div>

      {/* Added Items to Invoice Table */}
      <div className="mt-4">
        <h3 className="font-semibold text-md flex items-center">
          <span className="text-blue-600 mr-2">📝</span> Added Items:
        </h3>
        <table className="min-w-full mt-2 border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-left">Item Name</th>
              <th className="border p-2 text-left">Category</th>
              <th className="border p-2 text-left">Price</th>
              <th className="border p-2 text-left">Quantiy</th>
              <th className="border p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoiceItems?.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.itemName}</td>
                <td className="border p-2">{item.category}</td>
                <td className="border p-2">{item.salePrice}</td>
                <td className="border p-2">{item.itemQuantity}</td>
                <td className="border p-2">
                  <button
                    type="button" // ✅ Prevents default form submission
                    onClick={(e) => {
                      e.preventDefault(); // ✅ Stops form from submitting
                      handleDeleteTableItem(index);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Invoice Button */}
      <button
        type="submit"
        className={`mt-4 w-full py-2 rounded-md flex items-center justify-center ${
          isFormValid
            ? "bg-blue-600 text-white cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!isFormValid}
      >
        📅 Create Your First Invoice
      </button>
    </form>
  );
};

export default SaleForm;

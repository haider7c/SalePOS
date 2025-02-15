import React, { useEffect, useState } from "react";
import axios from "axios";
import { getItem } from "../api";
import { useDispatch } from "react-redux";
import { setInvoiceData } from "../Redux/invoiceReducer.js"; // Adjust path if needed
import { useSelector } from "react-redux";




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

  const dispatch = useDispatch();

  // Check if all required fields are filled
  const isFormValid =
    customerName && phoneNumber && invoiceAmount > 0 && receivedAmount >= 0;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
  
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
      invoiceItems, // Contains selected items
      balance: totalSalePrice - receivedAmount,
    };
  
    // Dispatch invoice data to Redux
    dispatch(setInvoiceData(invoiceData));
  
    // Clear form fields
    setCustomerName("");
    setPhoneNumber("");
    setInvoiceAmount(0);
    setReceivedAmount(0);
    setInvoiceItems([]); // Clear added items
  };

  const invoiceData = useSelector((state) => state.invoice);

  useEffect(() => {
    console.log("Updated Redux State:", invoiceData);
  }, [invoiceData]); // Log when invoiceData changes
  

  const saveInvoiceToRedux = () => {
    if (invoiceItems.length === 0) {
      alert("Please add at least one item to save the invoice.");
      return;
    }
  
    dispatch(setInvoiceData({
      customerName,
      phoneNumber,
      invoiceAmount: totalSalePrice,
      receivedAmount,
      date,
      serialNumb,
      invoiceItems, // Send all selected items
      balance: totalSalePrice - receivedAmount,
    }));
    console.log(invoiceData);
    
    alert("Invoice data saved to Redux!");
  };
  

  // Function to filter out items with empty itemName
  const filteredItems = items.filter(
    (item) => item.itemName && item.itemName.trim() !== ""
  );

  // Function to calculate total sale price
  const totalSalePrice = invoiceItems.reduce(
    (acc, item) => acc + (parseFloat(item.salePrice) || 0),
    0
  );
  useEffect(()=>{
    setInvoiceAmount(totalSalePrice);
    console.log(totalSalePrice);
  },[totalSalePrice])

  useEffect(() => {
    setBalance(totalSalePrice - receivedAmount);
  }, [receivedAmount]);

  // Function to save selected items to localStorage
  const saveToLocalStorage = (items) => {
    localStorage.setItem("invoiceItems", JSON.stringify(items));
  };

  // Load selected items from localStorage when the component mounts
  useEffect(() => {
    const savedItems = localStorage.getItem("invoiceItems");
    if (savedItems) {
      setInvoiceItems(JSON.parse(savedItems));
    }
  }, []);

  // Update localStorage whenever invoiceItems change
  useEffect(() => {
    saveToLocalStorage(invoiceItems);
  }, [invoiceItems]);

  // Add selected item to invoice items list
  const handleAddItemToInvoice = () => {
    if (selectedItem) {
      setInvoiceItems((prevItems) => {
        const updatedItems = [...prevItems, selectedItem];
        saveToLocalStorage(updatedItems);
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

  // Fetch serial number from API
  useEffect(() => {
    const fetchSerialNumber = async () => {
      try {
        const data = await getItem("serialNumber/getSerialNumber");
        console.log("Serial Number Data:", data);
        setSerialNumb(data.serialNumber);
      } catch (error) {
        console.error("Error fetching serial number:", error);
      }
    };
    fetchSerialNumber();
  }, []);

  // Handle item selection from dropdown
  const handleItemSelect = (e) => {
    const selectedItemName = e.target.value;
    const selectedItem = items.find(
      (item) => item.itemName === selectedItemName
    );
    setSelectedItem(selectedItem);
  };
  const handleDeleteTableItem = (index) => {
    setInvoiceItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };
  

  // // Add selected item to invoice items list
  // const handleAddItemToInvoice = () => {
  //   if (selectedItem) {
  //     setInvoiceItems([...invoiceItems, selectedItem]);
  //     setSelectedItem(null);  // Reset selected item
  //   }
  // };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
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
              <th className="border p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoiceItems?.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.itemName}</td>
                <td className="border p-2">{item.category}</td>
                <td className="border p-2">{item.salePrice}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDeleteTableItem(index)}
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
      <button
  type="button"
  onClick={saveInvoiceToRedux}
  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md"
>
  Save Invoice Data
</button>

    </form>
  );
};

export default SaleForm;

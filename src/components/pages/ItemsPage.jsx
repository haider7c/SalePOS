import React, { useState, useEffect } from "react";
import Sidebar from "../Frontcomponents/Sidebar.jsx";
import { getItem, updateItem, deleteItem } from "../api"; // Added deleteItem function
import ItemForm from "../Frontcomponents/ItemForm.jsx";

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]); // State for companies
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null); // Holds the category name being edited
  const [selectedCompany, setSelectedCompany] = useState(null); // Holds the company name being edited
  const [newCategoryName, setNewCategoryName] = useState(""); // Holds the new category name
  const [newCompanyName, setNewCompanyName] = useState(""); // Holds the new company name

  // State for search terms
  const [itemSearchTerm, setItemSearchTerm] = useState("");
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [companySearchTerm, setCompanySearchTerm] = useState("");
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState(""); // State for selected company filter

  // Filtered lists based on search terms
  const filteredItems = items.filter((item) => {
    const matchesSearchTerm = item.itemName
      .toLowerCase()
      .includes(itemSearchTerm.toLowerCase());
    const matchesCompanyFilter = selectedCompanyFilter
      ? item.company === selectedCompanyFilter
      : true;
    return matchesSearchTerm && matchesCompanyFilter;
  });

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(categorySearchTerm.toLowerCase())
  );
  const filteredCompanies = companies.filter((company) =>
    company.toLowerCase().includes(companySearchTerm.toLowerCase())
  );

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItem("item/items");
        const validItems = data.filter(
          (item) => item.itemName && item.itemName.trim() !== ""
        );
        setItems(validItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await getItem("item/categories");
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchCompanies = async () => {
      try {
        const data = await getItem("item/companies");
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchItems();
    fetchCategories();
    fetchCompanies();
    setLoading(false);
  }, []);

  // Function to update a category
  const handleUpdateCategory = async () => {
    try {
      if (!selectedCategory || !newCategoryName.trim()) return;

      // Call the API to update the category
      await updateItem(`item/category/${selectedCategory}`, { newName: newCategoryName });

      // Update the local state
      setCategories(
        categories.map((cat) =>
          cat === selectedCategory ? newCategoryName : cat
        )
      );

      // Reset the form
      setSelectedCategory(null);
      setNewCategoryName("");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Function to update a company
  const handleUpdateCompany = async () => {
    try {
      if (!selectedCompany || !newCompanyName.trim()) return;

      // Call the API to update the company
      await updateItem(`item/company/${selectedCompany}`, { newName: newCompanyName });

      // Update the local state
      setCompanies(
        companies.map((comp) =>
          comp === selectedCompany ? newCompanyName : comp
        )
      );

      // Reset the form
      setSelectedCompany(null);
      setNewCompanyName("");
    } catch (error) {
      console.error("Error updating company:", error);
    }
  };

  const handleEditItem = (item) => {
    setSelectedItem({ ...item });
  };

  const handleUpdateItem = async (updatedItem) => {
    try {
      await updateItem("item/items", updatedItem._id, updatedItem);
      setItems(
        items.map((item) => (item._id === updatedItem._id ? updatedItem : item))
      );
      setSelectedItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Function to delete a category
  const handleDeleteCategory = async (category) => {
    try {
      await deleteItem("item/category", category);
      setCategories(categories.filter((cat) => cat !== category));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Function to delete a company
  const handleDeleteCompany = async (company) => {
    try {
      await deleteItem("item/company", company);
      setCompanies(companies.filter((comp) => comp !== company));
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  // Function to set the selected category for editing
  const handleEditCategory = (category) => {
    setSelectedCategory(category); // Set the category name being edited
    setNewCategoryName(category); // Set the current name as the initial value
  };

  // Function to set the selected company for editing
  const handleEditCompany = (company) => {
    setSelectedCompany(company); // Set the company name being edited
    setNewCompanyName(company); // Set the current name as the initial value
  };

  // Function to cancel editing
  const handleCancelEdit = () => {
    setSelectedItem(null);
    setSelectedCategory(null); // Reset selected category when canceling edit
    setSelectedCompany(null); // Reset selected company when canceling edit
    setNewCategoryName(""); // Clear the new category name input
    setNewCompanyName(""); // Clear the new company name input
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="p-4 w-full">
        <h2 className="text-xl font-bold mb-4">Items List</h2>

        {selectedItem ? (
          <ItemForm
            itemData={selectedItem}
            onUpdate={handleUpdateItem}
            onCancel={handleCancelEdit}
            initialValues={selectedItem}
          />
        ) : (
          <>
            {/* Search Bar for Items */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search items..."
                value={itemSearchTerm}
                onChange={(e) => setItemSearchTerm(e.target.value)}
                className="border p-2 rounded"
              />
              <button
                onClick={() => setItemSearchTerm(itemSearchTerm)}
                className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
              >
                Search
              </button>
            </div>

            {/* Dropdown for Company Filter */}
            <div className="mb-4">
              <select
                value={selectedCompanyFilter}
                onChange={(e) => setSelectedCompanyFilter(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Select a company</option>
                {companies.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setSelectedCompanyFilter(selectedCompanyFilter)}
                className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
              >
                Filter by Company
              </button>
            </div>

            {/* Items Table with Fixed Height and Scroll */}
            <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
              <table className="w-full border-collapse border border-gray-300 mb-6">
                <thead>
                  <tr className="bg-gray-200 sticky top-0 z-10">
                    <th className="border p-2">Item Name</th>
                    <th className="border p-2">Category</th>
                    <th className="border p-2">Company</th>
                    <th className="border p-2">Sale Price</th>
                    <th className="border p-2">Purchase Price</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Quantity per Unit</th>
                    <th className="border p-2">Invoice Number</th>
                    <th className="border p-2">Serial Number</th>
                    <th className="border p-2">Batch Number</th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <tr key={item._id} className="border">
                        <td className="border p-2">{item.itemName}</td>
                        <td className="border p-2">{item.category}</td>
                        <td className="border p-2">{item.company}</td>
                        <td className="border p-2">{item.salePrice}</td>
                        <td className="border p-2">{item.purchasePrice}</td>
                        <td className="border p-2">{item.itemQuantity}</td>
                        <td className="border p-2">{item.quantityPerUnit}</td>
                        <td className="border p-2">{item.invoiceNumber}</td>
                        <td className="border p-2">{item.serialNumber}</td>
                        <td className="border p-2">{item.batchNumber}</td>
                        <td className="border p-2">{formatDate(item.date)}</td>
                        <td className="border p-2 flex space-x-2">
                          <button
                            onClick={() => handleEditItem(item)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="12" className="text-center p-4">
                        No items found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Search Bar for Categories */}
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search categories..."
                value={categorySearchTerm}
                onChange={(e) => setCategorySearchTerm(e.target.value)}
                className="border p-2 rounded"
              />
              <button
                onClick={() => setCategorySearchTerm(categorySearchTerm)}
                className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
              >
                Search
              </button>
            </div>

            {/* Categories List with Fixed Height and Scroll */}
            <div className="overflow-y-auto" style={{ maxHeight: "200px" }}>
              <ul className="border border-gray-300 p-4 rounded">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center py-2 border-b last:border-b-0"
                    >
                      {selectedCategory === category ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            className="border p-1 rounded"
                          />
                          <button
                            onClick={handleUpdateCategory}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <span>{category}</span>
                          <div className="space-x-2">
                            <button
                              onClick={() => handleDeleteCategory(category)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="text-center py-2">No categories found</li>
                )}
              </ul>
            </div>

            {/* Search Bar for Companies */}
            <h2 className="text-xl font-bold mb-4">Companies</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search companies..."
                value={companySearchTerm}
                onChange={(e) => setCompanySearchTerm(e.target.value)}
                className="border p-2 rounded"
              />
              <button
                onClick={() => setCompanySearchTerm(companySearchTerm)}
                className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
              >
                Search
              </button>
            </div>

            {/* Companies List with Fixed Height and Scroll */}
            <div className="overflow-y-auto" style={{ maxHeight: "200px" }}>
              <ul className="border border-gray-300 p-4 rounded">
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center py-2 border-b last:border-b-0"
                    >
                      {selectedCompany === company ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={newCompanyName}
                            onChange={(e) => setNewCompanyName(e.target.value)}
                            className="border p-1 rounded"
                          />
                          <button
                            onClick={handleUpdateCompany}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <span>{company}</span>
                          <div className="space-x-2">
                            <button
                              onClick={() => handleDeleteCompany(company)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="text-center py-2">No companies found</li>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemsPage;
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getItem, postItem, updateItem } from "../api"; // Added updateItem function

const schema = yup.object().shape({
  company: yup.string().required("Company is required"),
  itemName: yup.string().required("Item Name is required"),
  category: yup.string().required("Category is required"),
  salePrice: yup
    .number()
    .typeError("Sale Price must be a number")
    .required("Sale Price is required"),
  purchasePrice: yup
    .number()
    .typeError("Purchase Price must be a number")
    .required("Purchase Price is required")
    .test(
      "is-less",
      "Purchase Price must be less than Sale Price",
      function (value) {
        return value < this.parent.salePrice;
      }
    ),
  itemQuantity: yup
    .number()
    .typeError("Quantity must be a number")
    .default(1)
    .min(1, "Quantity must be at least 1"),
  quantityPerUnit: yup
    .string()
    .typeError("Quantity per Unit must be a number")
    .required("Quantity per Unit is required")
    .min(1, "Quantity per Unit must be at least 1"),
  invoiceNumber: yup.string().required("Invoice # is required"),
  serialNumber: yup.string().required("Serial Number is required"),
  batchNumber: yup.string().required("Batch No is required"),
  date: yup.date().required("Date is required"),
});

const ItemForm = ({ initialValues, onUpdate, onCancel, staticValues }) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues || {
      company: "",
      itemName: "",
      category: "",
      salePrice: "",
      purchasePrice: "",
      itemQuantity: "",
      quantityPerUnit: "",
      invoiceNumber: staticValues?.invoiceNumber || "",
      serialNumber: staticValues?.serialNumber || "",
      batchNumber: staticValues?.batchNumber || "",
      date: staticValues?.date || "",
    },
  });

  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [newCompany, setNewCompany] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getItem("item/categories");
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getItem("item/companies");
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const onSubmit = async (data) => {
    try {
      if (initialValues) {
        await updateItem("item/items", initialValues._id, data);
        onUpdate(data);
      } else {
        await postItem("item/newItem", data);
        reset();
      }
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const handleAddCategory = async () => {
    const trimmedCategory = newCategory.trim();
    if (trimmedCategory && !categories.includes(trimmedCategory)) {
      try {
        await postItem("item/category", { name: trimmedCategory });
        setCategories([...categories, trimmedCategory]);
        setValue("category", trimmedCategory);
        setNewCategory("");
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error adding new category:", error);
      }
    }
  };

  const handleAddCompany = async () => {
    const trimmedCompany = newCompany.trim();
    if (trimmedCompany && !companies.includes(trimmedCompany)) {
      try {
        await postItem("item/company", { name: trimmedCompany });
        setCompanies([...companies, trimmedCompany]);
        setValue("company", trimmedCompany);
        setNewCompany("");
        setIsCompanyModalOpen(false);
      } catch (error) {
        console.error("Error adding new company:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 bg-gray-100 p-4">
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-bold mb-4">{initialValues ? "Edit Item" : "Add Item"}</h2>
        <hr className="mb-6" />

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="relative">
            <div
              className={`w-full p-2 border rounded-md flex justify-between items-center transition-all cursor-pointer ${
                isCompanyDropdownOpen ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
            >
              <span className={`text-gray-500 ${watch("company") ? "text-black" : ""}`}>
                {watch("company") || "Select Company"}
              </span>
            </div>
            {isCompanyDropdownOpen && (
              <ul className="absolute w-full mt-1 bg-white border rounded-md shadow-md z-10">
                {companies.map((company, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setValue("company", company);
                      setIsCompanyDropdownOpen(false);
                    }}
                  >
                    {company}
                  </li>
                ))}
                <li
                  className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 border-t"
                  onClick={() => {
                    setIsCompanyModalOpen(true);
                    setIsCompanyDropdownOpen(false);
                  }}
                >
                  <span className="text-blue-500">Add New Company</span>
                </li>
              </ul>
            )}
          </div>
          {errors.company && <p className="text-red-500">{errors.company.message}</p>}

          <Controller
            name="itemName"
            control={control}
            render={({ field }) => (
              <input {...field} className="border p-2 w-full rounded outline-none" placeholder="Item Name" />
            )}
          />
          {errors.itemName && <p className="text-red-500">{errors.itemName.message}</p>}

          <div className="relative">
            <div
              className={`w-full p-2 border rounded-md flex justify-between items-center transition-all cursor-pointer ${
                isCategoryDropdownOpen ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            >
              <span className={`text-gray-500 ${watch("category") ? "text-black" : ""}`}>
                {watch("category") || "Select Category"}
              </span>
            </div>
            {isCategoryDropdownOpen && (
              <ul className="absolute w-full mt-1 bg-white border rounded-md shadow-md z-10">
                {categories.map((cat, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setValue("category", cat);
                      setIsCategoryDropdownOpen(false);
                    }}
                  >
                    {cat}
                  </li>
                ))}
                <li
                  className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 border-t"
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsCategoryDropdownOpen(false);
                  }}
                >
                  <span className="text-blue-500">Add New Category</span>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-3">
          <div className="flex-1">
            <Controller
              name="invoiceNumber"
              control={control}
              render={({ field }) => (
                <input {...field} className="border p-2 w-full rounded outline-none" placeholder="Invoice #" />
              )}
            />
            {errors.invoiceNumber && <p className="text-red-500">{errors.invoiceNumber.message}</p>}

            <Controller
              name="serialNumber"
              control={control}
              render={({ field }) => (
                <input {...field} className="border p-2 w-full rounded outline-none" placeholder="Serial Number" />
              )}
            />
            {errors.serialNumber && <p className="text-red-500">{errors.serialNumber.message}</p>}

            <Controller
              name="batchNumber"
              control={control}
              render={({ field }) => (
                <input {...field} className="border p-2 w-full rounded outline-none" placeholder="Batch No" />
              )}
            />
            {errors.batchNumber && <p className="text-red-500">{errors.batchNumber.message}</p>}

            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <input type="date" {...field} className="border p-2 w-full rounded outline-none" />
              )}
            />
            {errors.date && <p className="text-red-500">{errors.date.message}</p>}
          </div>

          <div className="flex-1">
            <Controller
              name="salePrice"
              control={control}
              render={({ field }) => (
                <input type="number" {...field} className="border p-2 w-full rounded outline-none" placeholder="Sale Price" />
              )}
            />
            {errors.salePrice && <p className="text-red-500">{errors.salePrice.message}</p>}

            <Controller
              name="purchasePrice"
              control={control}
              render={({ field }) => (
                <input type="number" {...field} className="border p-2 w-full rounded outline-none" placeholder="Purchase Price" />
              )}
            />
            {errors.purchasePrice && <p className="text-red-500">{errors.purchasePrice.message}</p>}

            <Controller
              name="itemQuantity"
              control={control}
              render={({ field }) => (
                <input type="number" {...field} className="border p-2 w-full rounded outline-none" placeholder="Item Quantity" />
              )}
            />
            {errors.itemQuantity && <p className="text-red-500">{errors.itemQuantity.message}</p>}

            {/* Quantity per Unit Input */}
            <Controller
              name="quantityPerUnit"
              control={control}
              render={({ field }) => (
                <input
                  type="string"
                  {...field}
                  className="border p-2 w-full rounded outline-none"
                  placeholder="Quantity per Unit"
                />
              )}
            />
            {errors.quantityPerUnit && <p className="text-red-500">{errors.quantityPerUnit.message}</p>}
          </div>
        </div>

        <div className="flex space-x-4 mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {initialValues ? "Update" : "Save"}
          </button>
          {initialValues && (
            <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add New Category</h2>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter category name"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
              <button onClick={handleAddCategory} className="bg-blue-500 text-white px-3 py-1 rounded">Add</button>
            </div>
          </div>
        </div>
      )}

      {isCompanyModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add New Company</h2>
            <input
              type="text"
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter company name"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setIsCompanyModalOpen(false)} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
              <button onClick={handleAddCompany} className="bg-blue-500 text-white px-3 py-1 rounded">Add</button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default ItemForm;
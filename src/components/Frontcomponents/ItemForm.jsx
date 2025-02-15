import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getItem, postItem } from "../api";

const schema = yup.object().shape({
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
});

const FloatingLabelInput = ({ label, value, onChange, onBlur, error }) => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!value) setIsFocused(false);
  }, [value]);

  return (
    <div className="relative w-full">
      <label
        className={`absolute left-3 transition-all bg-white px-1 ${
          isFocused || value ? "-top-2 text-xs text-blue-600" : "top-2 text-gray-500"
        }`}
      >
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(!!value);
          onBlur && onBlur(e);
        }}
        className="border p-2 w-full rounded outline-none bg-transparent"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

const ItemForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      itemName: "",
      category: "",
      salePrice: "",
      purchasePrice: "",
    },
  });

  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

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

  const onSubmit = async (data) => {
    try {
      await postItem("item/newItem", data);
      reset();
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        await postItem("item/category", { name: newCategory });
        setCategories([...categories, newCategory]);
        setValue("category", newCategory);
        setNewCategory("");
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error adding new category:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 bg-gray-100 p-4">
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-bold mb-4">Add Item</h2>
        <hr className="mb-6" />

        <div className="grid grid-cols-2 gap-4 mb-10">
          <Controller
            name="itemName"
            control={control}
            render={({ field }) => (
              <FloatingLabelInput label="Item Name" {...field} error={errors.itemName} />
            )}
          />

          <div className="relative">
            <div
              className={`w-full p-2 border rounded-md flex justify-between items-center transition-all ${
                isDropdownOpen ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="text-gray-500">{watch("category") || "Select Category"}</span>
            </div>
            {isDropdownOpen && (
              <ul className="absolute w-full mt-1 bg-white border rounded-md shadow-md z-10">
                {categories.map((cat, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setValue("category", cat);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {cat}
                  </li>
                ))}
                <li
                  className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 border-t"
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsDropdownOpen(false);
                  }}
                >
                  <span className="text-blue-500">Add New Category</span>
                </li>
              </ul>
            )}
          </div>
        </div>

        <Controller
          name="salePrice"
          control={control}
          render={({ field }) => (
            <FloatingLabelInput label="Sale Price" {...field} error={errors.salePrice} />
          )}
        />

        <Controller
          name="purchasePrice"
          control={control}
          render={({ field }) => (
            <FloatingLabelInput label="Purchase Price" {...field} error={errors.purchasePrice} />
          )}
        />

        <div className="text-right">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Save
          </button>
        </div>
      </div>

      {/* Modal for Adding New Category */}
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
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default ItemForm;

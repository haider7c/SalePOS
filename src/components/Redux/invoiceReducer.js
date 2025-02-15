import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk for fetching invoices
export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/invoices");
      return response.data;
    } catch (err) {
      console.error("Error fetching invoices:", err);
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  customerName: "",
  phoneNumber: "",
  invoiceAmount: 0,
  receivedAmount: 0,
  date: "",
  serialNumb: 0,
  invoiceItems: [],
  balance: 0,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setInvoiceData: (state, action) => {
      console.log("🔹 Redux Action Triggered:", action.payload);
      return { ...state, ...action.payload };
    },
  },
});

export const { setInvoiceData } = invoiceSlice.actions;
export default invoiceSlice.reducer;

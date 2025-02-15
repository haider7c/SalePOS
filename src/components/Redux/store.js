import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./invoiceReducer.js"; // Import the invoice slice

const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
  },
});

export default store;

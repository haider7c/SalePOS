import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/Redux/store.js";
// import Form from "./components/Frontcomponents/Form.jsx";
import Login from "./components/pages/Login.jsx";
import App from "./components/App.js";
import Home from "./components/pages/Home.jsx";
import InvoiceList from "./components/Frontcomponents/InvoiceList.jsx";
import Item from "./components/pages/Item.jsx";
import Sale from "./components/pages/Sale.jsx";
// import OrdersPage from "./components/pages/OrdersPage.jsx";
import "./App.css";
// import FormPage from "./components/pages/FormPage.jsx";
import POSCounterPage from "./components/pages/POSCounterPage.jsx";
import AllBillsPage from "./components/pages/AllBillsPage.jsx";
import AllExpensesPage from "./components/pages/AllExpensesPage.jsx";
import AllTransactionsPage from "./components/pages/AllTransactionsPage.jsx";
import StaffPage from "./components/pages/StaffPage.jsx";
import PackagesPage from "./components/pages/PackagesPage.jsx";
import ProductsPage from "./components/pages/ProductsPage.jsx";
import SettingsPage from "./components/pages/SettingsPage.jsx";
import UsersPage from "./components/pages/UsersPage.jsx";

// Ensure a root element exists in the DOM
let rootElement = document.getElementById("root");
if (!rootElement) {
  rootElement = document.createElement("div");
  rootElement.id = "root";
  document.body.appendChild(rootElement);
}

// Render the React app
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/form" element={<Form />} /> */}
          <Route path="/invoicelist" element={<InvoiceList />} />
          {/* <Route path="/orderspage" element={<OrdersPage />} /> */}
          {/* <Route path="/formpage" element={<FormPage />} /> */}
          <Route path="/item" element={<Item />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/poscounterpage" element={<POSCounterPage />} />
          <Route path="/allbillspage" element={<AllBillsPage />} />
          <Route path="/allexpensespage" element={<AllExpensesPage />} />
          <Route
            path="/alltransactionspage"
            element={<AllTransactionsPage />}
          />
          <Route path="/staffpage" element={<StaffPage />} />
          <Route path="/packagespage" element={<PackagesPage />} />
          <Route path="/productspage" element={<ProductsPage />} />
          <Route path="/settingspage" element={<SettingsPage />} />
          <Route path="/userspage" element={<UsersPage />} />
        </Routes> 
      </Router> 
    </Provider>
  </StrictMode>
);

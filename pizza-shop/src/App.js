import React from "react";
import "./App.css";
import "./scss/app.scss";
import MainLayout from "./components/MainLayout";

import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/pages/Home";
import NotFoundPage from "./components/pages/NotFoundPage";
import Cart from "./components/pages/Cart";
import PizzaInfoCart from "./components/pages/PizzaInfoCart";

export const SearchContext = React.createContext();

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="PizzaInfo/:id" element={<PizzaInfoCart />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        {/*<Route path="/" element={<Home />} />*/}
        {/*<Route path="/PizzaInfo/:id" element={<PizzaInfoCart />} />*/}
        {/*<Route path="/cart" element={<Cart />} />*/}
        {/*<Route path="*" element={<NotFoundPage />} />*/}
      </Routes>
    </div>
  );
}

export default App;

import React from "react";
import "./App.css";
import "./scss/app.scss";

import { Routes, Route } from "react-router-dom";
import { createContext } from "react";

import Header from "./components/Header";
import Home from "./components/pages/Home";
import NotFoundPage from "./components/pages/NotFoundPage";
import Cart from "./components/pages/Cart";

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="App">
      <div className="wrapper">
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </div>
  );
}

export default App;

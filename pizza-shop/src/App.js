import React from "react";
import "./App.css";
import "./scss/app.scss";

import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/pages/Home";
import NotFoundPage from "./components/pages/NotFoundPage";
import Cart from "./components/pages/Cart";

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  console.log(searchValue, "it works");
  return (
    <div className="App">
      <div className="wrapper">
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searchValue={searchValue} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

// import logo from './logo.svg';
import React from "react";
import "./App.css";
import "./scss/app.scss";

import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/pages/Home";
import NotFoundPage from "./components/pages/NotFoundPage";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            {/*<NotFoundPage />*/}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blabla" element={<h1>Blablable</h1>} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

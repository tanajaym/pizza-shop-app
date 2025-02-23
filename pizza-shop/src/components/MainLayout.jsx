import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;

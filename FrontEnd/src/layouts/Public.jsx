import React from "react";
import { Navbar, Footer, SideBar } from "./";
import { AppRoute } from "../route/AppRoute";
import { useAuthContext } from "../context/authContext";

const Public = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <div className="AppHeader">
        {user.role !== "Admin" && <Navbar />}
        {user.role === "Admin" && <SideBar />}
      </div>

      <div className="AppContent">
        <div className="PageContent">
          <AppRoute />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Public;

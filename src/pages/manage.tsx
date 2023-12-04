import { Login } from "../components/login";
import React from "react";
import AppNavbar from "../components/navbar";
import { Footer } from "../components/footer";
export function Manage() {
  return (
    <div>
      <div className="yes">
        <AppNavbar />
      </div>
      <Login />
      <div style={{ position: "fixed", bottom: "0px", width: "100%" }}>
        <Footer />
      </div>
    </div>
  );
}
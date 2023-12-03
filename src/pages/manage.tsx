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
        <Footer />
    </div>
  );
}
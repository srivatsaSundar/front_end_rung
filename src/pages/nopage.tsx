
import { Footer } from "../components/footer";
import React from 'react';
import { Navbar } from "react-bootstrap";
import AppNavbar from "../components/navbar";
// this opens when no page exists
export function NoPage() {
  return (
    <div>
      <AppNavbar />
      <p>Error: No page exists</p>
      <Footer/>
    </div>
  );
}

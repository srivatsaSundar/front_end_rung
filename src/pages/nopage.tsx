import { Footer } from "../components/footer";
import React from "react";
import AppNavbar from "../components/navbar";

export function NoPage() {
  return (
    <div>
      <AppNavbar />
      <p>Error: No page exists</p>
      <Footer />
    </div>
  );
}

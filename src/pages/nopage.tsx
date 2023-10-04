import { Header } from "../components/header";
import { Footer } from "../components/footer";
import React from 'react';
// this opens when no page exists
export function NoPage() {
  return (
    <div>
      <Header />
      <p>Error: No page exists</p>
      <Footer/>
    </div>
  );
}

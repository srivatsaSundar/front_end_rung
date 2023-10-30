
import './App.css';
import { Home } from './pages/home';
import { Contact } from './pages/contact';
import { Discount } from './pages/discount';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NoPage } from './pages/nopage';
import { Menu } from './pages/menu';
import React from 'react';
import { Order } from './pages/order';
import { LanguageProvider } from './components/LanguageProvider';
import { Final } from './pages/final';


function App() {
  return (
    <div >
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/discount' element={<Discount />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='*' element={<NoPage />} />
            <Route path='/order' element={<Order />} />
            <Route path="/placed" element={<Final />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </div>
  );
}

export default App;


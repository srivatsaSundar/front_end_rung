import { Login } from './pages/login';
import './App.css';
import { Home } from './pages/home';
import { Contact } from './pages/contact';
import { Discount } from './pages/discount';
import { About } from './pages/about';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { NoPage } from './pages/nopage';
import { City } from './pages/city';
import { RestaurantList } from './components/restaurantList';
import { Menu } from './pages/menu';
import React from 'react';
import { Order } from './pages/order';

function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/discount' element={<Discount/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/menu' element={<Menu/>} />
        <Route path='/city/:searchQuery' element={<City/>} />
        <Route path='/menu/:rest_id' element={<Menu/>} />
        <Route path='/restaurantList/:cuisineStr' element={<RestaurantList />} />
        <Route path='*' element={<NoPage/>} />
        <Route path='/order' element={<Order/>} />
      </Routes>
      </BrowserRouter>
      

    </div>
  );
}

export default App;


import { RestaurantList } from "../components/restaurantList";
import { Header } from "../components/header";
import React from 'react';


export function Restaurant() {
  return (
    <div>
      <Header />
      <p>City Name</p>
      <RestaurantList />
    </div>
  );
}



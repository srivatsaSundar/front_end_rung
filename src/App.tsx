import "./App.css";
import { Home } from "./pages/home";
import { Contact } from "./pages/contact";
import { Discount } from "./pages/discount";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NoPage } from "./pages/nopage";
import { Menu, MenuItem } from "./pages/menu";
import React, { useEffect, useRef, useState } from "react";
import { Order } from "./pages/order";
import { useLanguage } from "./components/LanguageProvider";
import { Final } from "./pages/final";
import translations_en from "../src/translations/translation_en.json";
import translations_de from "../src/translations/translation_de.json";
import { Manage } from "./pages/manage";
import { Dashboard } from "./pages/dashboard";
import { EditMenu } from "./components/menu_edit";
import { Postcodes } from "./components/postcodes";
import { Holiday } from "./components/holiday";
import { Addon } from "./components/addon";

function App() {
  const column3Ref = useRef(null || undefined);
  const [cart, setCart] = useState([]);
  const [add_on_drink, setAdd_on_drink] = useState([]) as any[];
  const [add_on_food, setAdd_on_food] = useState([]) as any[];

  const { selectedLanguage } = useLanguage();
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cart.length) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);
  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        localStorage.removeItem("cart");
        window.location.reload();
      },
      1 * 60 * 60 * 1000,
    );

    return () => clearTimeout(timeoutId);
  }, []);

  function increaseQuantity(item) {
    const existingItemIndex = cart.findIndex(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.drink === item.drink &&
        cartItem.food === item.food,
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    }
  }
  const removeFromCart = (item) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.drink === item.drink &&
        cartItem.food === item.food,
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[existingItemIndex].quantity > 1) {
        updatedCart[existingItemIndex].quantity -= 1;
      } else {
        updatedCart.splice(existingItemIndex, 1);
      }
      setCart(updatedCart);
    }
  };

  const deleteFromCart = (item) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.drink === item.drink &&
        cartItem.food === item.food,
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(existingItemIndex, 1);
      setCart(updatedCart);

      // Update localStorage after updating the cart state
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const calculateTotalPrice = () => {
    if (cart && cart.length > 0) {
      return cart.reduce((total, item) => {
        const basePrice = item.price.toFixed(2);
        let price = basePrice;

        if (item.drink) {
          const drink = add_on_drink.find(
            (drink) => drink.drink.name === item.drink,
          );
          if (drink) {
            price += drink.drink.price;
          }
        }
        if (item.food) {
          const food = add_on_food.find((food) => food.food.name === item.food);
          if (food) {
            price += food.food.price;
          }
        }

        return total + price * item.quantity;
      }, 0);
    } else {
      return 0;
    }
  };

  function calculateItemPrice(item) {
    let price = item.price.toFixed(2);

    if (item.drink) {
      const selectedDrink = add_on_drink.find(
        (drink) => drink.drink.name === item.drink,
      );
      if (selectedDrink) {
        price += selectedDrink.drink.price;
      }
    }
    if (item.food) {
      const selectedFood = add_on_food.find(
        (food) => food.food.name === item.food,
      );
      if (selectedFood) {
        price += selectedFood.food.price;
      }
    }

    return price;
  }

  const translations =
    selectedLanguage === "en" ? translations_en : translations_de;

  function PrivateRoute({ element }) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    return isLoggedIn ? (
      element
    ) : (
      <Navigate to="/manage" state={{ from: "/dashboard" }} />
    );
  }
  function PrivateRouteholi({ element }) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    return isLoggedIn ? (
      element
    ) : (
      <Navigate to="/manage" state={{ from: "/holiday" }} />
    );
  }

  function PrivateRoutemenu({ element }) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    return isLoggedIn ? (
      element
    ) : (
      <Navigate to="/manage" state={{ from: "/editmenu" }} />
    );
  }

  function PrivateRoutepost({ element }) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    return isLoggedIn ? (
      element
    ) : (
      <Navigate to="/manage" state={{ from: "/postcodes" }} />
    );
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/discount" element={<Discount />} />
          <Route path="/manage" element={<Manage />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/holiday"
            element={<PrivateRoute element={<Holiday />} />}
          />
          <Route
            path="/editmenu"
            element={<PrivateRoute element={<EditMenu />} />}
          />
          <Route path="/addon" element={<PrivateRoute element={<Addon />} />} />
          <Route
            path="/postcodes"
            element={<PrivateRoute element={<Postcodes />} />}
          />
          <Route
            path="/menu"
            element={
              <Menu
                ref={column3Ref}
                cart={cart}
                setCart={setCart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                deleteFromCart={deleteFromCart}
                calculateItemPrice={calculateItemPrice}
                calculateTotalPrice={calculateTotalPrice}
                translations={translations}
                add_on_drink={add_on_drink}
                setAdd_on_drink={setAdd_on_drink}
                add_on_food={add_on_food}
                setAdd_on_food={setAdd_on_food}
                selectedLanguage={selectedLanguage}
              />
            }
          />
          <Route path="*" element={<NoPage />} />
          <Route
            path="/order"
            element={
              <Order
                ref={column3Ref}
                cart={cart}
                setCart={setCart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                deleteFromCart={deleteFromCart}
                calculateItemPrice={calculateItemPrice}
                calculateTotalPrice={calculateTotalPrice}
                translations={translations}
              />
            }
          />
          <Route path="/placed" element={<Final />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import "./App.css";
import { Home } from "./pages/home";
import { Contact } from "./pages/contact";
import { Discount } from "./pages/discount";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NoPage } from "./pages/nopage";
import { Menu } from "./pages/menu";
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
import { Timing } from "./components/timing";
import { Discountvalue } from "./components/discountvalue";
import { ContactView } from "./components/contactView";
import useHolidayCheck from "./pages/holidaycheck";
import { toast } from "react-toastify";
import { OrderValue } from "./components/ordervalue";

function App() {
  const column3Ref = useRef(null || undefined);
  const [cart, setCart] = useState([]);
  const [add_on_drink, setAdd_on_drink] = useState([]) as any[];
  const [add_on_food, setAdd_on_food] = useState([]) as any[];
  const { isClosedOrder } = useHolidayCheck();

  const targetURL3 = "https://api.mrrung.com/add_on_food";
  useEffect(() => {
    fetch(targetURL3, { mode: "cors" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setAdd_on_food(data))
      .catch((err) => console.log("error in fetching add_on_food", err));
  }, []);

  // console.log(add_on_food)

  const handleResetOrder = () => {
    // Reset the order state to empty
    setCart([]);
  };
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
      1 * 60 * 60 * 1000
    );

    return () => clearTimeout(timeoutId);
  }, []);

  function increaseQuantity(item) {
    const existingItemIndex = cart.findIndex(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.drink === item.drink &&
        cartItem.food === item.food
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
        cartItem.food === item.food
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[existingItemIndex].quantity > 1) {
        updatedCart[existingItemIndex].quantity -= 1;
      } else {
        updatedCart.splice(existingItemIndex, 1);
      }
      if (isClosedOrder() === true) {
        const holidayMessage = "Today is a holiday.";
        toast.error(holidayMessage);
        return;
      } else {
        setCart(updatedCart);
      }
    }
  };

  const deleteFromCart = (item) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.drink === item.drink &&
        cartItem.food === item.food
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(existingItemIndex, 1);
      if (isClosedOrder() === true) {
        const holidayMessage = "Today is a holiday.";
        toast.error(holidayMessage);
        return;
      } else {
        setCart(updatedCart);
      }

      // Update localStorage after updating the cart state
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((acc, item) => {
      const price = calculateItemPrice ? calculateItemPrice(item) : item.price; // Use calculateItemPrice if available, otherwise use item.price
      return acc + price * item.quantity;
    }, 0);
  };

  function calculateItemPrice(item) {
    let price = item.price;

    if (item.drink) {
      const selectedDrink = add_on_drink.find(
        (drink) => drink.drink.name === item.drink
      );
      if (selectedDrink) {
        price += selectedDrink.drink.price;
      }
    }
    if (item.food) {
      const selectedFood = add_on_food.find(
        (food) => food.food.name === item.food
      );

      // console.log(selectedFood, "selected drink")
      if (selectedFood) {
        price += selectedFood.food.price;
        // console.log(price)
      }
    }
    // console.log('Calculated Price:', price.toFixed(2));

    return price.toFixed(2);
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
  function PrivateRouteadd({ element }) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    return isLoggedIn ? (
      element
    ) : (
      <Navigate to="/manage" state={{ from: "/addon" }} />
    );
  }
  function PrivateRoutetim({ element }) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    return isLoggedIn ? (
      element
    ) : (
      <Navigate to="/manage" state={{ from: "/timing" }} />
    );
  }
  function PrivateRoutediscount({ element }) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    return isLoggedIn ? (
      element
    ) : (
      <Navigate to="/manage" state={{ from: "/discountvalue" }} />
    );
  }
  function PrivateRouteorder({ element }) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    return isLoggedIn ? (
      element
    ) : (
      <Navigate to="/manage" state={{ from: "/ordervalue" }} />
    );
  }
  function PrivateRoutecontact({ element }) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    return isLoggedIn ? (
      element
    ) : (
      <Navigate to="/manage" state={{ from: "/contactview" }} />
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
            path="/ordervalue"
            element={<PrivateRoute element={<OrderValue />} />}
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
            path="/discountvalue"
            element={<PrivateRoute element={<Discountvalue />} />}
          />
          <Route
            path="/timing"
            element={<PrivateRoute element={<Timing />} />}
          />
          <Route
            path="/contactview"
            element={<PrivateRoute element={<ContactView />} />}
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
                onResetOrder={handleResetOrder}
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

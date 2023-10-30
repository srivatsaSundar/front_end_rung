import React, { useEffect, useRef, useState } from "react";
import "../static/menu.css";
import Icofont from "react-icofont";
import { Footer } from "../components/footer";
import { SocialLogin } from "../components/socialmedia";
import Popular from "../images/Popular_dishes.jpg";
import asiawok from "../images/asiawok.jpg";
import delicious_curry from "../images/delicious_curry.jpg";
import finger_food from "../images/finger_food.jpg";
import momos from "../images/momos.jpg";
import soup from "../images/soup.jpg";
import thai_wok from "../images/thai_wok.jpg";
import fry from "../images/fry.jpg";
import combodia from "../images/combodia.jpg";
import { useLanguage } from "../components/LanguageProvider";
import AppNavbar from "../components/navbar";
import drink from "../images/drink.jpg";
import soft from "../images/soft.jpg";
import duck from "../images/duck.jpg";
import noodle from "../images/noodle.jpg";
import rice from "../images/rice.jpg";
import veg from "../images/veg.jpg";
import Cart from "./cart";

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  amount: number;
}

interface IMenu {
  ref;
  removeFromCart;
  cart;
  increaseQuantity;
  calculateItemPrice;
  calculateTotalPrice;
  deleteFromCart;
  translations;
  setCart;
}

export function Menu(props: IMenu) {
  const {
    ref,
    removeFromCart,
    cart,
    increaseQuantity,
    calculateItemPrice,
    calculateTotalPrice,
    deleteFromCart,
    translations,
    setCart,
  } = props;
  const column3Ref = useRef(null || undefined);
  const [selectValue, setSelectValue] = useState("DEFAULT");

  const [selectedAddons, setSelectedAddons] = useState({});
  const [menu, setMenu] = useState([]);
  const uniqueTitlesRef = useRef<HTMLElement[]>([]);
  const [add_on_drink, setAdd_on_drink] = useState([]) as any[];
  const [add_on_food, setAdd_on_food] = useState([]) as any[];
  const [selectedItemName, setSelectedItemName] = useState<string | null>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const targetURL = translations.url;

  const targetURL2 = "https://backend-rung.onrender.com/add_on_drink";
  console.log(targetURL, { mode: "cors" }); //console

  useEffect(() => {
    fetch(targetURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setMenu(data))
      .catch((err) => console.log("error in fetching the menu", err));
  }, [targetURL]);

  const uniqueTitles: string[] = Array.from(
    new Set(menu.map((item) => item.title_name)),
  );
  uniqueTitlesRef.current = uniqueTitles.map(
    (_, index) => uniqueTitlesRef.current[index] as HTMLDivElement,
  );

  console.log(uniqueTitles); //console
  console.log("menu", menu);

  const titleImageUrls = {
    "Popular Dishes": Popular,
    "Delicious Asia Wok": asiawok,
    "Delicious Curry": delicious_curry,
    "Finger Food": finger_food,
    Momos: momos,
    Soups: soup,
    "Delicious Thai Wok": thai_wok,
    "Delicious Fry & Grill": fry,
    "Delicious Cambodia Work": combodia,
    "Alcholic Drinks": drink,
    "Soft Drinks": soft,
    "Delicious Duck": duck,
    "Delicious Noodle": noodle,
    "Delicious Rice": rice,
    "Delicious Vegetable": veg,
    "Beliebte Gerichte": Popular,
    Suppen: soup,
    "Alkoholische Getränke": drink,
    "Alkoholfreie Getränke": soft,
  };

  function scrollToTitle(index) {
    const element = uniqueTitlesRef.current[index];
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    fetch(targetURL2, { mode: "cors" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setAdd_on_drink(data))
      .catch((err) => console.log("error in fetching add_on_drink", err));
  }, [setMenu]);

  console.log(add_on_drink); //console

  const targetURL3 = "https://backend-rung.onrender.com/add_on_food";

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
  }, [setMenu]);

  function handleAddOnClick(itemName) {
    setSelectedItemName(itemName);
    if (!selectedAddons[itemName]) {
      setSelectedAddons({
        ...selectedAddons,
        [itemName]: {
          selectedDrink: null,
          selectedFood: null,
        },
      });
    }
  }

  function handleDrinkChange(event) {
    const selectedValue = event.target.value;
    const updatedAddons = {
      ...selectedAddons,
      [selectedItemName]: {
        ...selectedAddons[selectedItemName],
        selectedDrink: selectedValue,
      },
    };
    setSelectedAddons(updatedAddons);
  }

  function handleFoodChange(event) {
    const selectedValue = event.target.value;
    const updatedAddons = {
      ...selectedAddons,
      [selectedItemName]: {
        ...selectedAddons[selectedItemName],
        selectedFood: selectedValue,
      },
    };
    setSelectedAddons(updatedAddons);
  }

  const addToCart = (item) => {
    const selectedDrink = selectedAddons[item.name]?.selectedDrink || null;
    const selectedFood = selectedAddons[item.name]?.selectedFood || null;

    const existingItemIndex = cart.findIndex(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.drink === selectedDrink &&
        cartItem.food === selectedFood,
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...item,
          quantity: 1,
          drink: selectedDrink,
          food: selectedFood,
        },
      ]);
    }
  };

  function calculateUpdateItemPrice(item, selectedDrink, selectedFood) {
    const drink = add_on_drink.find(
      (drink) => drink.drink.name === selectedDrink,
    );
    const food = add_on_food.find((food) => food.food.name === selectedFood);
    return (
      item.price +
      (drink ? drink.drink.price : 0) +
      (food ? food.food.price : 0)
    );
  }

  useEffect(() => {
    setSelectValue("DEFAULT");
  }, [selectedItemIndex]);

  const scrollToColumn3 = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="yes">
        <AppNavbar />
      </div>
      <div className="menu-container">
        <div className="column1">
          {uniqueTitles.map((title, index) => (
            <div
              className={`menu-item ${
                index === selectedItemIndex ? "first" : ""
              }`}
              key={index}
              onClick={() => {
                setSelectedItemIndex(index);
                scrollToTitle(index);
              }}
            >
              <p>{title}</p>
            </div>
          ))}
        </div>
        <div className="mobile-dropdown">
          <select
            defaultValue={"DEFAULT"}
            className="menu-select"
            value={selectValue}
            onChange={(e) => {
              const selectedIndex = parseInt(e.target.value);
              setSelectedItemIndex(selectedIndex);
              scrollToTitle(selectedIndex);
              setSelectValue(e.target.value);
            }}
          >
            <option value="DEFAULT" disabled>
              {translations.menu}
            </option>
            {uniqueTitles.map((title, index) => (
              <option key={index} value={index}>
                {title}
              </option>
            ))}
          </select>
        </div>
        <div className="column2">
          {uniqueTitles.map((title, index) => (
            <div
              key={index}
              className="menu-name"
              ref={(el) =>
                (uniqueTitlesRef.current[index] = el as HTMLDivElement)
              }
            >
              <h2>{title}</h2>
              <img src={titleImageUrls[title]} alt={`Image for ${title}`} />
              <hr />
              {menu
                .filter((item) => item.title_name === title)
                .map((item, itemIndex) => (
                  <div className="cardMenu" key={itemIndex}>
                    <div className="card-bodyMenu">
                      <div className="card-nameMenu">
                        <h5 className="card-titleMenu">{item.name}</h5>
                        <p className="card-titleMenu price">
                          {item.price}/- CHF
                        </p>
                      </div>
                      <p className="card-textMenu">{item.description_1}</p>
                      {add_on_drink.some(
                        (drink) => drink.menu.name === item.name,
                      ) ||
                      add_on_food.some(
                        (food) => food.menu.name === item.name,
                      ) ? (
                        <button
                          onClick={() => handleAddOnClick(item.name)}
                          className="add-on-button"
                        >
                          + {translations.addon}
                        </button>
                      ) : null}
                      {selectedItemName === item.name && (
                        <div className="drink-food">
                          <br></br>
                          <div className="drink-dropdown">
                            <select
                              onChange={handleDrinkChange}
                              value={
                                selectedAddons[item.name].selectedDrink || ""
                              }
                            >
                              <option value="">
                                {translations.selectaddon}
                              </option>
                              {add_on_drink
                                .filter(
                                  (drink) => drink.menu.name === item.name,
                                )
                                .map((drink, drinkIndex) => (
                                  <option
                                    key={drinkIndex}
                                    value={drink.drink.name}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <span>{drink.drink.name}</span>
                                      <span>({drink.drink.price}/- CHF)</span>
                                    </div>
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div className="food-dropdown">
                            <select
                              onChange={handleFoodChange}
                              value={
                                selectedAddons[item.name].selectedFood || ""
                              }
                            >
                              <option value="">
                                {translations.selectaddon}
                              </option>
                              {add_on_food
                                .filter((food) => food.menu.name === item.name)
                                .map((food, foodIndex) => (
                                  <option
                                    key={foodIndex}
                                    value={food.food.name}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <span>{food.food.name}</span>
                                      <span>({food.food.price}/- CHF)</span>
                                    </div>
                                  </option>
                                ))}
                            </select>
                          </div>
                          {selectedAddons[item.name].selectedDrink ||
                          selectedAddons[item.name].selectedFood ? (
                            <div className="add-on-cost">
                              <p>
                                {calculateUpdateItemPrice(
                                  item,
                                  selectedAddons[item.name].selectedDrink ||
                                    null,
                                  selectedAddons[item.name].selectedFood ||
                                    null,
                                )}
                                /- CHF
                              </p>
                            </div>
                          ) : null}
                        </div>
                      )}
                      <button
                        className="add-button"
                        onClick={() => addToCart(item)}
                      >
                        <Icofont icon="icofont-bag" /> {translations.add}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
        <Cart
          ref={column3Ref}
          cart={cart}
          removeFromCart={removeFromCart}
          increaseQuantity={increaseQuantity}
          deleteFromCart={deleteFromCart}
          calculateItemPrice={calculateItemPrice}
          calculateTotalPrice={calculateTotalPrice}
          translations={translations}
          isMenu={false}
        />
        <div className="column4">
          <button className="cart-button" onClick={scrollToColumn3}>
            {translations.shoppingCartTitle} - {calculateTotalPrice()}/- CHF
          </button>
        </div>
      </div>
      <SocialLogin />
      <Footer />
    </div>
  );
}

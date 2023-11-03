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
import AppNavbar from "../components/navbar";
import drink from "../images/drink.jpg";
import soft from "../images/soft.jpg";
import duck from "../images/duck.jpg";
import noodle from "../images/noodle.jpg";
import rice from "../images/rice.jpg";
import veg from "../images/veg.jpg";
import Cart from "./cart";
import ScrollToTop from "react-scroll-to-top";

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
  add_on_drink;
  setAdd_on_drink;
  add_on_food;
  setAdd_on_food;
}

export function Menu(props: IMenu) {
  const { translations, deleteFromCart, removeFromCart, cart, setCart } = props;

  const column3Ref = useRef(null);
  const [selectValue, setSelectValue] = useState("DEFAULT");
  // const [cart, setCart] = useState<MenuItem[]>([]);
  const [isAddOnSelected, setIsAddOnSelected] = useState(false);
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

  function itemHasAddOns(itemName) {
    return (
      add_on_drink.some((drink) => drink.menu.name === itemName) ||
      add_on_food.some((food) => food.menu.name === itemName)
    );
  }

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
    console.log(uniqueTitles);
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
    if (selectedItemName === itemName) {
      // If the add-on options are already open, close them
      setSelectedItemName(null);
    } else {
      // If the add-on options are closed, open them
      setSelectedItemName(itemName);
    }

    // You can also add your existing code here to initialize selectedAddons if it doesn't exist
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

  const calculateTotalPrice = () => {
    if (cart && cart.length > 0) {
      return cart.reduce((total, item) => {
        const basePrice = item.price;
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

        return (total + price).toFixed(2) * item.quantity;
      }, 0);
    } else {
      return 0;
    }
  };

  function calculateItemPrice(item) {
    let price = item.price;

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

    return price.toFixed(2);
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

    // Update the state when add-ons are selected
    if (selectedValue) {
      setIsAddOnSelected(true);
    } else {
      setIsAddOnSelected(false);
    }
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

    // Update the state when add-ons are selected
    if (selectedValue) {
      setIsAddOnSelected(true);
    } else {
      setIsAddOnSelected(false);
    }
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
    ).toFixed(2);
  }

  useEffect(() => {
    setSelectValue("DEFAULT");
  }, [selectedItemIndex]);

  const scrollToColumn3 = () => {
    if (column3Ref.current) {
      console.log("Scrolling to column3");
      column3Ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToDiv = () => {
    const scrollableDiv = document.getElementById("scrollableDiv");
    scrollableDiv?.scrollIntoView({ behavior: "smooth" });
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
              <h2 id="scrollableDiv">{title}</h2>
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
                          {item.price.toFixed(2)}/- CHF
                        </p>
                      </div>
                      <p className="card-textMenu">
                        <b>{item.description_1}</b>
                      </p>
                      <p className="card-textMenu">{item.description_2}</p>

                      {add_on_drink.some(
                        (drink) => drink.menu.name === item.name,
                      ) ||
                      add_on_food.some(
                        (food) => food.menu.name === item.name,
                      ) ? (
                        <button
                          onClick={() => handleAddOnClick(item.name)}
                          className="add-on-button"
                          style={{ marginBottom: "-30px" }}
                        >
                          + {translations.addon}
                        </button>
                      ) : null}

                      <div>
                        {selectedItemName === item.name && (
                          <div
                            className="drink-food"
                            style={{
                              backgroundColor: "#efefef",
                              paddingTop: "15px",
                              paddingRight: "10px",
                              paddingLeft: "10px",
                              paddingBottom: "50px",
                              marginBottom: "-35px",
                            }}
                          >
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
                            <div
                              className="food-dropdown"
                              style={{ backgroundColor: "#efefef" }}
                            >
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
                                  .filter(
                                    (food) => food.menu.name === item.name,
                                  )
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
                            {(selectedAddons[item.name].selectedDrink ||
                              selectedAddons[item.name].selectedFood) && (
                              <div className="add-on-cost">
                                <p>
                                  {selectedAddons[item.name].selectedDrink &&
                                  selectedAddons[item.name].selectedFood
                                    ? calculateUpdateItemPrice(
                                        item,
                                        selectedAddons[item.name].selectedDrink,
                                        selectedAddons[item.name].selectedFood,
                                      )
                                    : selectedAddons[item.name].selectedDrink
                                    ? calculateUpdateItemPrice(
                                        item,
                                        selectedAddons[item.name].selectedDrink,
                                        null,
                                      )
                                    : calculateUpdateItemPrice(
                                        item,
                                        null,
                                        selectedAddons[item.name].selectedFood,
                                      )}
                                  /- CHF
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                        {(selectedItemName === item.name && isAddOnSelected) ||
                        !itemHasAddOns(item.name) ? (
                          <button
                            className="add-button"
                            onClick={() => addToCart(item)}
                          >
                            <Icofont icon="icofont-bag" /> {translations.add}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>

        <div className="column3" ref={column3Ref}>
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
        </div>
        <div className="column4">
          <button
            className="cart-button"
            onClick={() => {
              scrollToColumn3();
              console.log("Button clicked");
            }}
          >
            {translations.shoppingCartTitle} - {calculateTotalPrice()}/- CHF
          </button>
        </div>
      </div>
      <ScrollToTop
        smooth
        color="black"
        height="10px"
        className="scroll"
        onClick={scrollToDiv}
        top={2}
      />
      <SocialLogin />
      <Footer />
    </div>
  );
}

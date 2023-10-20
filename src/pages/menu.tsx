import { Header } from "../components/header";
import React, { useEffect, useRef, useState } from 'react';
import "../static/menu.css";
import Icofont from 'react-icofont';
import { Link } from "react-router-dom";
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

interface MenuItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}



export function Menu() {
  const [menu, setMenu] = useState([]) as any[];
  const uniqueTitlesRef = useRef<HTMLElement[]>([]);
  const [add_on_drink, setAdd_on_drink] = useState([]) as any[];
  const [add_on_food, setAdd_on_food] = useState([]) as any[];
  const [selectedItemName, setSelectedItemName] = useState<string | null>(null);
  const [selectedDrink, setSelectedDrink] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const targetURL ="http://13.233.96.33:8000/menu/"
  const proxyURL = "https://api.allorigins.win/raw?url=";
  const finalURL = proxyURL +targetURL;
  useEffect(() => {
    fetch(finalURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMenu(data))
      .catch(err => console.log("error in fetching the menu", err));
  }, []);

  const uniqueTitles: string[] = Array.from(new Set(menu.map((item) => item.title_name)));
  uniqueTitlesRef.current = uniqueTitles.map((_, index) => uniqueTitlesRef.current[index] as HTMLDivElement);
console.log(uniqueTitles)
  const titleImageUrls = {
    "Popular Dishes": Popular,
    "Delicious Asia Wok": asiawok,
    "Delicious Curry": delicious_curry,
    "Finger Food": finger_food,
    "Momos": momos,
    "Soups": soup,
    "Delicious Thai Wok": thai_wok,
    "Delicious Fry & Grill": fry,
    "Delicious Combodia Wok": combodia,
  };

  function scrollToTitle(index) {
    const element = uniqueTitlesRef.current[index];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  useEffect(() => {
    fetch('http://13.233.96.33:8000/add_on_drink/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setAdd_on_drink(data))
      .catch(err => console.log("error in fetching add_on_drink", err));
  }, []);

  useEffect(() => {
    fetch('http://13.233.96.33:8000/add_on_food/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setAdd_on_food(data))
      .catch(err => console.log("error in fetching add_on_food", err));
  }, []);
  function handleAddOnClick(itemName: string) {
    if (selectedItemName === itemName) {
      // If the button is clicked again for the same item, close it
      setSelectedItemName(null);
    } else {
      setSelectedItemName(itemName);
    }
  }
  function handleDrinkChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue = event.target.value;
    setSelectedDrink(selectedValue);
  }

  function handleFoodChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedFood(event.target.value);
  }

 
  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
  
    if (existingItem) {
      // If item already exists in the cart, increment its quantity and update the drink or food
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                drink: selectedDrink || cartItem.drink,
                food: selectedFood || cartItem.food,
              }
            : cartItem,
        ),
      );
    } else {
      // If item doesn't exist in the cart, add it with quantity 1 and update the drink or food
      setCart([...cart, { ...item, quantity: 1, drink: selectedDrink, food: selectedFood }]);
    }
  };
  

  const removeFromCart = (item: MenuItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem && existingItem.quantity > 1) {
      // If item exists in the cart with quantity > 1, decrement its quantity and update the total price
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity - 1,
                price: (cartItem.quantity - 1) * cartItem.price,
              }
            : cartItem
        )
      );
    } else {
      // If item exists in the cart with quantity 1 or doesn't exist, remove it
      setCart(cart.filter((cartItem) => cartItem.id !== item.id));
    }
  };

  const deleteFromCart = (item: MenuItem) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(updatedCart);
  };
  // Calculate the total price of all items in the cart

  const calculateTotalPrice = () => {
    if (cart && cart.length > 0) {
      return cart.reduce((total, item) => {
        const basePrice = item.price;
        let price = basePrice;

        // Calculate the total price based on selected drink and food
        if (selectedDrink) {
          const drink = add_on_drink.find(drink => drink.drink.name === selectedDrink);
          if (drink) {
            price += drink.drink.price;
          }
        }
        if (selectedFood) {
          const food = add_on_food.find(food => food.food.name === selectedFood);
          if (food) {
            price += food.food.price;
          }
        }

        // Return the total price of the item, including the price of the add-ons
        return total + price * item.quantity;
      }, 0);
    } else {
      return 0;
    }
  };
  

  function calculateItemPrice(item) {
    const basePrice = item.price;
    let price = basePrice;

    // Calculate the total price based on selected drink and food
    if (selectedDrink) {
      const drink = add_on_drink.find(drink => drink.drink.name === selectedDrink);
      if (drink) {
        price += drink.drink.price;
      }
    }
    if (selectedFood) {
      const food = add_on_food.find(food => food.food.name === selectedFood);
      if (food) {
        price += food.food.price;
      }
    }

    return price;
  }

 
  return (
    <div>
      <div className="yes">
        <Header />
      </div>
      <div className="menu-container">
        <div className="column1">
          {uniqueTitles.map((title, index) => (
            <div
              className={`menu-item ${index === selectedItemIndex ? 'first' : ''}`}
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
        <div className="column2">
  {uniqueTitles.map((title, index) => (
    <div key={index} className="menu-name" ref={(el) => (uniqueTitlesRef.current[index] = el as HTMLDivElement)}>
        <img src={titleImageUrls[title]} alt={`Image for ${title}`} />
      <h2>{title}</h2>
      <hr />
      {menu
        .filter(item => item.title_name === title)
        .map((item, itemIndex) => (
          <div className="cardMenu" key={itemIndex}>
            <div className="card-bodyMenu">
              <div className="card-nameMenu">
                <h5 className="card-titleMenu">{item.name}</h5>
                <p className="card-titleMenu price">{item.price}/- CHF</p>
              </div>
              <p className="card-textMenu">{item.description_1}</p>
              {add_on_drink.some(drink => drink.menu.name === item.name) || add_on_food.some(food => food.menu.name === item.name) ? (
                <button onClick={() => handleAddOnClick(item.name)} className="add-on-button">
                  + Add On
                </button>
              ) : null}
              {selectedItemName === item.name && (
                <div className="drink-food">
                  <br></br>
                  <div className="drink-dropdown">
                  <select onChange={handleDrinkChange} value={selectedDrink || ''}>
                    <option value="">Select Drink</option>
                    {add_on_drink
                      .filter(drink => drink.menu.name === item.name)
                      .map((drink, drinkIndex) => (
                        <option key={drinkIndex} value={drink.drink.name}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>{drink.drink.name}</span>
                            <span>({drink.drink.price}/- CHF)</span>
                          </div>
                        </option>
                      ))}
                  </select>
                  </div>
                  <div className="food-dropdown">
                  <select onChange={handleFoodChange} value={selectedFood || ''}>
                    <option value="">Select Food</option>
                    {add_on_food
                      .filter(food => food.menu.name === item.name)
                      .map((food, foodIndex) => (
                        <option key={foodIndex} value={food.food.name}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>{food.food.name}</span>
                            <span>({food.food.price}/- CHF)</span>
                          </div>
                        </option>
                      ))}
                  </select>
                  </div>
                  {selectedDrink || selectedFood ? (
  <p>{calculateItemPrice(item)}/- CHF</p>
) : null}
                </div>
              )}
              <button className="add-button" onClick={() => addToCart(item)}>
                <Icofont icon="icofont-bag" /> Add
              </button>
           
          </div>

          </div>
        ))}
    </div>
  ))}
</div>


        <div className="column3">
          <div className="title-cart">
          <p>Shopping Cart</p>
          {cart.length === 0 && (
  <>
    <Icofont icon="icofont-basket" className="basket" size="4" />
    <p>Choose delicious dishes from the menu and order your menu.</p>
  </>
)}
</div>
          <ul>
            {cart.map((item) => (
         
         <li key={item.id} className="cart-item">
  <span className="cart-item-name">
    {item.name}
    {item.drink && `\n+ ${item.drink}`}
    {item.food && `\n+ ${item.food}`}
  </span>
  <div className="cart-controls">
    <button className="plus-button" onClick={() => removeFromCart(item)}>-</button>
    <span className="quantity">{item.quantity}</span>
    <button className="plus-button" onClick={() => addToCart(item)}>+</button>
    <span className="price-cart">{calculateItemPrice(item)}/- CHF</span>
    <button className="icon-del" onClick={() => deleteFromCart(item)}>
      <Icofont icon="icofont-bin" size="1" />
    </button>
  </div>
</li>

       
            ))}
          </ul>
          {calculateTotalPrice() > 0 && (
            <div>
  <p>Total: {calculateTotalPrice()}/- CHF</p>
  {calculateTotalPrice() < 40 && (
  <p>Minimum order must be of 40/- CHF </p>
  )}
  </div>
)} 

{calculateTotalPrice() > 40 && (
  <Link style={{ textDecoration: 'none' }} to="/order">
 <button className="order-button">Order</button></Link>
 
)}


        </div>
      </div>
      <SocialLogin />
      <Footer />
    </div>
  );
            }
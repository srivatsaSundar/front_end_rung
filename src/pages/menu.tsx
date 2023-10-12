import { Header } from "../components/header";
import React, { useEffect, useRef, useState } from 'react';
import "../static/menu.css";
import Icofont from 'react-icofont';
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

  
  useEffect(() => {
    fetch('http://127.0.0.1:8000/menu/')
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

  function scrollToTitle(index: number) {
    if (uniqueTitlesRef.current[index]) {
      uniqueTitlesRef.current[index].scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {
    fetch('http://127.0.0.1:8000/add_on_drink/')
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
    fetch('http://127.0.0.1:8000/add_on_food/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setAdd_on_food(data))
      .catch(err => console.log("error in fetching add_on_food", err));
  }, []);
  console.log(add_on_drink);
  console.log(add_on_food);
  function handleAddOnClick(itemName: string) {
    setSelectedItemName(itemName);
  }

  function handleDrinkChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedDrink(event.target.value);
  }

  function handleFoodChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedFood(event.target.value);
  }

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // If item already exists in the cart, increment its quantity
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
            
        )
      );
    } else {
      // If item doesn't exist in the cart, add it with quantity 1
      setCart([...cart, { ...item, quantity: 1 }]);
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
    return cart.reduce((total, item) => total + item.price*item.quantity, 0);
  };


 
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
              <p className="card-textMenu">{item.description}</p>
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
                        <option key={drinkIndex} value={drink.name}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>{drink.drink.name}</span>
                            <span>{drink.drink.price}/- CHF</span>
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
                        <option key={foodIndex} value={food.name}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>{food.food.name}</span>
                            <span>{food.food.price}/- CHF</span>
                          </div>
                        </option>
                      ))}
                  </select>
                  </div>
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
           <span className="cart-item-name">{item.name}</span>
           <div className="cart-controls">
           <button className="plus-button" onClick={() => removeFromCart(item)}>-</button>
             <span className="quantity">{item.quantity}</span>
             <button className="plus-button" onClick={() => addToCart(item)}>+</button>
             <span className="price-cart">{item.price * item.quantity}/- CHF</span>
             <button className="icon-del" onClick={() => deleteFromCart(item)}>
               <Icofont icon="icofont-bin" size="1" />
             </button>
           </div>
         </li>
         
           
            
            ))}
          </ul>
          {calculateTotalPrice() > 0 && (
  <p>Total: {calculateTotalPrice()}/- CHF</p>
)}

        </div>
      </div>
    </div>
  );
            }
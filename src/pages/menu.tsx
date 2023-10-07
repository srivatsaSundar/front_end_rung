// imports
import { Header } from "../components/header";
import React, { useEffect } from 'react';
import "../static/menu.css"
import Icofont from 'react-icofont';
// types


export function Menu() {

  const [menu, setMenu] = React.useState([]) as any[];
  
  useEffect(() => {
    fetch('http://127.0.0.1:8000/menu/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMenu(data))
      .catch(err => console.log("error in fetching the menu",err));
  }
  , []);
console.log(menu);

const uniqueTitles: string[] = Array.from(new Set(menu.map((item) => item.title_name)));

  
  return (
  <div>
    <div className="yes">
      <Header/>
    </div>
      <div className="menu-container">
        <div className="column1">
        {uniqueTitles.map((title, index) => (
        <div className="menu-item" key={index}>
          <p>{title}</p>
        </div>
      ))}
        </div>
        <div className="column2">
          {uniqueTitles.map((title, index) => (
            <div key={index}>
              <h2>{title}</h2>
              <hr></hr>
              {menu
                .filter(item => item.title_name === title)
                .map((item, itemIndex) => (
                  <div className="cardMenu" key={itemIndex}>
                    <div className="card-bodyMenu">
                      <h5 className="card-titleMenu">{item.name}</h5>
                      <p className="card-textMenu">{item.price}/- CHF</p>
                      <p className="card-textMenu">{item.description}</p>
                      <button> <Icofont  icon="icofont-bag"/>Add </button>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
        <div className="column3">
            <h2>Shopping Cart</h2>
            <hr></hr>

            <Icofont icon="icofont-basket" size="4" />
            <p>Choose delicious dishes from the menu and order your menu.</p>
        </div>
      </div>
    </div>
    
  );
}


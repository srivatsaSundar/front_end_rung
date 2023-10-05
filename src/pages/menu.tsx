// imports

import "../static/menu.css";
import { Header } from "../components/header";
import React from 'react';
// types


export function Menu() {
  
  return (
  <div>
    <div className="yes">
      <Header/>
    </div>
      <div className="menu-container">
        <div className="column1">
           
            <h2>Column 1</h2>
            <p>This is the content of the first column.</p>
        </div>
        <div className="column2">
           
            <h2>Column 2</h2>
            <p>This is the content of the second column.</p>
        </div>
        <div className="column3">
            
            <h2>Column 3</h2>
            <p>This is the content of the third column.</p>
        </div>
      </div>
    </div>
    
  );
}


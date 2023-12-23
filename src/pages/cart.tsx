import React, { useEffect, useState } from "react";
import Icofont from "react-icofont";
import { Link } from "react-router-dom";
interface ICart {
  ref?;
  removeFromCart?;
  cart?;
  increaseQuantity?;
  calculateItemPrice?;
  calculateTotalPrice?;
  deleteFromCart?;
  translations;
  isMenu?;
  style?;
}
function Cart(props: ICart) {
  const {
    ref,
    style,
    isMenu,
    removeFromCart,
    cart,
    increaseQuantity,
    calculateItemPrice,
    calculateTotalPrice,
    deleteFromCart,
    translations,
  } = props;
  
  
  return (
    <div className="column3" ref={ref} style={style} id="cart">
      <div className="title-cart">
        <p>{translations.shoppingCartTitle}</p>
        {cart.length === 0 && (
          <>
            <Icofont icon="icofont-basket" className="basket" size="4" />
            <p>{translations.chooseDishesFromMenu}</p>
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
              <button
                className="plus-button"
                onClick={() => removeFromCart(item)}
              >
                -
              </button>
              <span className="quantity">{item.quantity}</span>
              <button
                className="plus-button"
                onClick={() => increaseQuantity(item)}
              >
                +
              </button>
              <span className="price-cart">
                {(calculateItemPrice(item) * item.quantity).toFixed(2)}/- CHF
              </span>
              <button className="icon-del" onClick={() => deleteFromCart(item)}>
                <Icofont icon="icofont-bin" size="" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {calculateTotalPrice() > 0 && (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "0px 18px",
            }}
          >
            <p>{translations.totalLabel}</p>
            <p style={{ float: "right" }}>
              {calculateTotalPrice().toFixed(2)}/- CHF
            </p>
          </div>
          {calculateTotalPrice() < 40 && (
            <p style={{ marginLeft: "15px", color: "rgb( 196, 61, 7 )" }}>
              {translations.minimumOrderMessage}{" "}
            </p>
          )}
        </div>
      )}
      {calculateTotalPrice() >= 40 && !isMenu && (
        <Link style={{ textDecoration: "none" }} to="/order">
          <button className="order-button" style={{ width: "320px" }}>
            {translations.orderButton}
          </button>
        </Link>
      )}
      {isMenu && (
        <Link style={{ textDecoration: "none" }} to="/menu">
          <button className="order-button" style={{ marginTop: "10px" }}>
            {translations.backToMenuButton}
          </button>
        </Link>
      )}
    </div>
  );
}
export default Cart;

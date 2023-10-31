import React from "react";
import Icofont from "react-icofont";
import { Link } from "react-router-dom";
interface ICart {
  ref;
  removeFromCart;
  cart;
  increaseQuantity;
  calculateItemPrice;
  calculateTotalPrice;
  deleteFromCart;
  translations;
  isMenu;
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
    <div className="column3" ref={ref} style={style}>
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
                {calculateItemPrice(item) * item.quantity}/- CHF
              </span>
              <button className="icon-del" onClick={() => deleteFromCart(item)}>
                <Icofont icon="icofont-bin" size="1" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {calculateTotalPrice() > 0 && (
        <div>
          <p>
            {translations.totalLabel} {calculateTotalPrice()}/- CHF
          </p>
          {calculateTotalPrice() < 40 && (
            <p>{translations.minimumOrderMessage} </p>
          )}
        </div>
      )}
      {calculateTotalPrice() >= 40 && !isMenu &&(
        <Link style={{ textDecoration: "none" }} to="/order">
          <button className="order-button">{translations.orderButton}</button>
        </Link>
      )}
      {isMenu && (
        <Link style={{ textDecoration: "none" }} to="/menu">
          <button
            className="order-button"
            style={{ marginTop: "10px", width: "280px" }}
          >
            {translations.backToMenuButton}
          </button>
        </Link>
      )}
    </div>
  );
}
export default Cart;
import React, { useEffect } from "react";
import "./Checkout.css";
import CheckoutBanner from "../CheckoutBanner";
import Subtotal from "../Subtotal/Subtotal";
import { useStateValue } from "../../StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { getCartTotal } from "../../reducer";
import CurrencyFormat from "react-currency-format";

function Checkout() {
  document.title = "Shopping Cart";
  // eslint-disable-next-line
  const [{ cart }, dispatch] = useStateValue();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="checkout">
      <div className="checkout-left">
        <div className="checkout-banner-body">
          <CheckoutBanner className="adsBox" />
        </div>

        <div className="cartBox">
          <h2 className="checkout-title">
            {cart.length === 0
              ? "Your Shopping Cart is empty"
              : "Shopping Cart"}
          </h2>

          {cart.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              imageURL={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}

          <div className="subtotalAmount">
            <CurrencyFormat
              renderText={(value) => (
                <div className="largerFont">
                  Subtotal ({cart.length} items):
                  <strong className="money">{value}</strong>
                </div>
              )}
              decimalScale={2}
              value={getCartTotal(cart).toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </div>
        </div>
      </div>

      <div className="checkout-right">
        <div className="subtotalBox">
          <Subtotal />
        </div>
      </div>
    </div>
  );
}

export default Checkout;

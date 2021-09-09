import React from "react";
import "./PaymentHeader.css";
import { useStateValue } from "../../StateProvider";
import { Link } from "react-router-dom";

function PaymentHeader() {
  // eslint-disable-next-line
  const [{ cart }, dispatch] = useStateValue();

  return (
    <div className="payment-header">
      <div className="payment-header-image-section">
        <Link to="/">
          <div className="payment-header-amazon-image"></div>
        </Link>
      </div>

      <div className="payment-header-title-section">
        <div className="payment-header-title">
          <h1>
            Checkout (
            <Link to="/checkout" style={{ textDecoration: "none" }}>
              <span className="item-color">
                {cart.length}
                {"  "}
                {cart.length <= 1 ? "item" : "items"}
              </span>
            </Link>
            )
          </h1>
        </div>
      </div>

      <div className="payment-header-lock-section">
        <div className="lock-image">
          <img
            src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/checkout/truespc/secured-ssl._CB485936932_.png"
            alt="lock"
          />
        </div>
      </div>
    </div>
  );
}

export default PaymentHeader;

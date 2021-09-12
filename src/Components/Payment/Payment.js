import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "../../StateProvider";
import { getCartTotal } from "../../reducer";
import CheckoutProduct from "../CheckoutProduct";
import Button from "react-bootstrap/Button";
import CurrencyFormat from "react-currency-format";
import OrderSummary from "../OrderSummary/OrderSummary";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "../../axios";
import { useHistory } from "react-router-dom";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

function Payment() {
  document.title = "Checkout";
  // eslint-disable-next-line
  const [{ cart, user }, dispatch] = useStateValue();

  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getCartTotal(cart) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [cart]);

  const handleSubmit = async (event) => {
    // stripe functionality
    event.preventDefault();
    setProcessing(true);

    // eslint-disable-next-line
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(async ({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        await setDoc(doc(db, "users", user?.uid, "orders", paymentIntent.id), {
          cart: cart,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_CART",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (event) => {
    // listen for changes in he CardElement
    // and display an errors as the customer types theor card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment-container">
        <div className="payment-left">
          {/* SHIPPING ADDRESS */}
          <div className="payment-section">
            <div className="payment-section-title-number">1</div>
            <div className="payment-section-title-word">Shipping address</div>
            <div className="payment-section-info">
              <p>{user?.displayName}</p>
              <p>123 REACT AVENUE</p>
              <p>NEW YORK, NY</p>
            </div>
          </div>

          <div className="payment-divider"></div>

          {/* PAYMENT METHOD */}
          <div className="payment-section">
            <div className="payment-section-title-number">2</div>
            <div className="payment-section-title-word">Payment method</div>
            <div className="payment-section-info">
              <div className="payment-detail">
                <form id="card-form" onSubmit={handleSubmit}>
                  <CardElement
                    className="payment-card-element"
                    onChange={handleChange}
                  />
                  {/* ERROR */}
                  {error && (
                    <div className="payment-card-error-message">{error}</div>
                  )}
                </form>
                <div className="payment-card-sample-box border border-1">
                  <div className="payment-card-sample-container">
                    Please use the testing card info below to pay for demoing
                    purpose.
                    <span className="payment-card-sample">
                      <span>Card Number: 4242 4242 4242 4242</span>
                      <span style={{ marginLeft: "110px" }}>EXP: 04/24</span>
                      <span style={{ marginLeft: "20px" }}>CVC: 242</span>
                      <span style={{ marginLeft: "20px" }}>ZIP: 42424</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-divider"></div>

          {/* REVIEW ITEMS AND SHIPPING */}
          <div className="payment-review-items-section">
            <div className="payment-review-items-section-title">
              <div className="payment-section-title-number">3</div>
              <div className="payment-review-items-section-title-word">
                Review items and shipping
              </div>
            </div>

            {/* ITEMS */}
            <div className="payment-items-section">
              {cart.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  imageURL={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </div>

            {/* PLACE ORDER */}
            <div className="payment-items-place-order">
              <div className="payment-place-order-button-section">
                <Button
                  type="submit"
                  form="card-form"
                  variant="warning"
                  className="payment-place-order-button"
                  disabled={processing || disabled || succeeded}
                >
                  <span>{processing ? "Processing" : "Place your order"}</span>
                </Button>
              </div>
              <div className="payment-order-total-section">
                <div className="payment-order-total-word">
                  Order total:{" "}
                  <span align="right">
                    <CurrencyFormat
                      decimalScale={2}
                      value={getCartTotal(cart).toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix="$"
                    />
                  </span>
                  <div className="payment-buying-notice">
                    By placing your order, you agree to
                    Amazon-Clone-Ecommerce-Website's{" "}
                    <span style={{ color: "rgb(13,120,139)" }}>
                      privacy notice
                    </span>{" "}
                    and{" "}
                    <span style={{ color: "rgb(13,120,139)" }}>
                      conditions of use
                    </span>
                    .
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="payment-right">
          <div className="sticky-top">
            <OrderSummary
              processing={processing}
              disabled={disabled}
              succeeded={succeeded}
              formID="card-form"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import { getCartTotal } from "../reducer";
import CheckoutProduct from "./CheckoutProduct";
import Button from "react-bootstrap/Button";
import CurrencyFormat from "react-currency-format";
import OrderSummary from "./OrderSummary";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "../axios";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
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
    <PaymentBody>
      <Container>
        <LeftSide>
          {/* SHIPPING ADDRESS */}
          <Section>
            <Number>1</Number>
            <Title>Shipping address</Title>
            <InfoSection>
              <Info>{user?.displayName}</Info>
              <Info>123 REACT AVENUE</Info>
              <Info>NEW YORK, NY</Info>
            </InfoSection>
          </Section>

          <Divider></Divider>

          {/* PAYMENT METHOD */}
          <Section>
            <Number>2</Number>
            <Title>Payment method</Title>
            <InfoSection>
              <PaymentDetail>
                <form id="card-form" onSubmit={handleSubmit}>
                  <StyledCardElement onChange={handleChange} />
                  {/* ERROR */}
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                </form>
                <CardSampleBox>
                  <CardSampleContainer>
                    Please use the testing card info below to pay for demoing
                    purpose.
                    <CardSample>
                      <span>Card Number: 4242 4242 4242 4242</span>
                      <span style={{ marginLeft: "110px" }}>EXP: 04/24</span>
                      <span style={{ marginLeft: "20px" }}>CVC: 242</span>
                      <span style={{ marginLeft: "20px" }}>ZIP: 42424</span>
                    </CardSample>
                  </CardSampleContainer>
                </CardSampleBox>
              </PaymentDetail>
            </InfoSection>
          </Section>

          <Divider></Divider>

          {/* REVIEW ITEMS AND SHIPPING */}
          <ReviewItemsSection>
            <ReviewItemsTitleBox>
              <Number>3</Number>
              <ReviewItemsTitle>Review items and shipping</ReviewItemsTitle>
            </ReviewItemsTitleBox>

            {/* ITEMS */}
            <ItemsSection>
              {cart.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  imageURL={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </ItemsSection>

            {/* PLACE ORDER */}
            <PlaceOrderSection>
              <PlaceOrderButtonSection>
                <PlaceOrderButton
                  type="submit"
                  form="card-form"
                  variant="warning"
                  disabled={processing || disabled || succeeded}
                >
                  <span>{processing ? "Processing" : "Place your order"}</span>
                </PlaceOrderButton>
              </PlaceOrderButtonSection>
              <PlaceOrderInfoSection>
                <OrderTotal>
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
                  <Notice>
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
                  </Notice>
                </OrderTotal>
              </PlaceOrderInfoSection>
            </PlaceOrderSection>
          </ReviewItemsSection>
        </LeftSide>

        <RightSide>
          <StickyOrderSummary>
            <OrderSummary
              processing={processing}
              disabled={disabled}
              succeeded={succeeded}
              formID="card-form"
            />
          </StickyOrderSummary>
        </RightSide>
      </Container>
    </PaymentBody>
  );
}

export default Payment;

const PaymentBody = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 80vh;
  min-width: 1140px;
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  padding: 14px 18px 18px;
  max-width: 1150px;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 3%;
  width: 100%;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 290px;
`;

const StickyOrderSummary = styled.div`
  position: sticky;
  top: 14px;
`;

const Section = styled.div`
  display: flex;
  width: 830px;
`;

const Number = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  width: 35px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 800;
  line-height: 24px;
  width: 180px;
`;

const InfoSection = styled.div`
  width: 615px;
  padding-left: 20px;
  height: max-content;
`;

const Info = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 1px;
`;

const Divider = styled.div`
  line-height: 1;
  font-size: 11px;
  color: #656464;
  font-weight: 400;
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 12px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-top: 1px solid #e3e3e3;
  }

  &:not(:empty)::before {
    margin-right: 0.25em;
  }

  &:not(:empty)::after {
    margin-left: 0.25em;
  }
`;

const PaymentDetail = styled.div``;

const StyledCardElement = styled(CardElement)`
  margin-top: 3px;
`;

const ErrorMessage = styled.div`
  margin-top: 5px;
  color: red;
  font-size: 14px;
`;

const CardSampleBox = styled.div`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
  margin-top: 10px;
  border: 1px solid lightgray;
`;

const CardSampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  width: 100%;
  color: grey;
`;

const CardSample = styled.span`
  background-color: rgb(234, 237, 237);
  color: grey;
  margin-top: 5px;
  padding: 10px;
  line-height: 10px;
`;

const ReviewItemsSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 830px;
`;

const ReviewItemsTitleBox = styled.div`
  display: flex;
  width: 800px;
`;

const ReviewItemsTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  line-height: 24px;
`;

const ItemsSection = styled.div`
  border: 1px solid lightgray;
  border-radius: 8px;
  margin-top: 20px;
  margin-left: 35px;
  padding: 0 20px 20px;
`;

const PlaceOrderSection = styled.div`
  border: 1px solid lightgray;
  border-radius: 8px;
  margin-top: 20px;
  margin-left: 35px;
  padding: 0 20px 20px;
  display: flex;
  height: 60px;
`;

const PlaceOrderButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 57px;
`;

const PlaceOrderInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60px;
`;

const PlaceOrderButton = styled(Button)`
  background-color: rgb(255, 216, 21);
  color: black;
  border: none;
  border-radius: 8px;
  width: 120px;
  height: 35px;
  font-weight: 500;
  font-size: 12px;

  &:hover {
    background-color: rgb(235, 191, 17);
    color: black;
  }

  &:focus {
    background-color: rgb(255, 216, 21);
    color: black;
    outline: none;
    outline-offset: none;
  }
`;

const OrderTotal = styled.div`
  color: #b12704;
  font-size: 18px;
  font-weight: 700;
  margin-left: 20px;
`;

const Notice = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: rgb(100, 103, 103);
  margin-top: -3px;
`;

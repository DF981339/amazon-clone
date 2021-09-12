import React, { useEffect } from "react";
import styled from "styled-components";
import CheckoutBanner from "./CheckoutBanner";
import Subtotal from "./Subtotal";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { getCartTotal } from "../reducer";
import CurrencyFormat from "react-currency-format";

function Checkout() {
  document.title = "Shopping Cart";
  // eslint-disable-next-line
  const [{ cart }, dispatch] = useStateValue();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CheckoutBody>
      <CheckoutLeftSide>
        <BannerBox>
          <CheckoutBanner />
        </BannerBox>

        <ShoppingCartBox>
          <CheckoutTitle>
            {cart.length === 0
              ? "Your Shopping Cart is empty"
              : "Shopping Cart"}
          </CheckoutTitle>

          {cart.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              imageURL={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}

          <CartSubtotalAmount>
            <CurrencyFormat
              renderText={(value) => (
                <SubtotalValue>
                  Subtotal ({cart.length} items):
                  <Amount>{value}</Amount>
                </SubtotalValue>
              )}
              decimalScale={2}
              value={getCartTotal(cart).toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </CartSubtotalAmount>
        </ShoppingCartBox>
      </CheckoutLeftSide>

      <CheckoutRightSide>
        <SubtotalBox>
          <Subtotal />
        </SubtotalBox>
      </CheckoutRightSide>
    </CheckoutBody>
  );
}

export default Checkout;

const CheckoutBody = styled.div`
  display: flex;
  padding: 20px;
  height: max-content;
  max-width: 100%;
  min-width: 998px;
  width: 100%;
`;

const CheckoutLeftSide = styled.div`
  margin-right: 10px;
  width: 100%;
`;

const CheckoutRightSide = styled.div`
  margin-left: 10px;
`;

const BannerBox = styled.div`
  display: flex;
  justify-content: center;
`;

const ShoppingCartBox = styled.div`
  margin: 20px 0 0;
  background-color: white;
  padding: 20px;
`;

const CheckoutTitle = styled.h2`
  padding-bottom: 5px;
  border-bottom: 1px solid lightgray;
`;

const CartSubtotalAmount = styled.div`
  text-align: right;
  padding-bottom: 15px;
`;

const SubtotalValue = styled.div`
  font-size: larger;
  font-weight: 500;
`;

const Amount = styled.strong`
  margin-left: 3px;
`;

const SubtotalBox = styled.div`
  padding: 10px 10px 20px 10px;
  background-color: white;
`;

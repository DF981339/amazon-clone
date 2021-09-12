import React from "react";
import styled from "styled-components";
import CurrencyFormat from "react-currency-format";
import Button from "react-bootstrap/Button";
import { useStateValue } from "../StateProvider";
import { getCartTotal } from "../reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
  // eslint-disable-next-line
  const [{ cart, user }, dispatch] = useStateValue();
  const history = useHistory();

  const handleClick = (event) => {
    event.preventDefault();

    if (user) {
      history.push("/payment");
    } else {
      history.push("/login");
    }
  };

  return (
    <SubtotalBody>
      <CurrencyFormat
        renderText={(value) => (
          <div>
            <SubtotalValue>
              Subtotal ({cart.length} items):
              <Amount>{value}</Amount>
            </SubtotalValue>
            <GiftOption>
              <GiftCheckbox type="checkbox" /> This order contains a gift
            </GiftOption>
          </div>
        )}
        decimalScale={2}
        value={getCartTotal(cart).toFixed(2)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <CheckoutButton
        variant="warning"
        onClick={handleClick}
        disabled={cart.length === 0 ? true : false}
      >
        Proceed to checkout
      </CheckoutButton>
    </SubtotalBody>
  );
}

export default Subtotal;

const SubtotalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 120px;
  padding: 10px;
`;

const CheckoutButton = styled(Button)`
  background-color: rgb(255, 216, 21);
  color: black;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  font-size: smaller;
  margin-top: 10px;

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

const SubtotalValue = styled.div`
  font-size: larger;
  font-weight: 500;
`;

const Amount = styled.strong`
  margin-left: 3px;
`;

const GiftOption = styled.small`
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const GiftCheckbox = styled.input`
  margin-right: 5px;
`;

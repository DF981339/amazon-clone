import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import Button from "react-bootstrap/Button";
import { useStateValue } from "../../StateProvider";
import { getCartTotal } from "../../reducer";
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
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <div className="priceAndGift">
              <div className="largerFont">
                Subtotal ({cart.length} items):
                <strong className="money">{value}</strong>
              </div>
              <small className="subtotal-gift">
                <input type="checkbox" className="gift-checkbox" /> This order
                contains a gift
              </small>
            </div>
          </>
        )}
        decimalScale={2}
        value={getCartTotal(cart).toFixed(2)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <Button
        variant="warning"
        className="checkoutButtonColor"
        onClick={handleClick}
        disabled={cart.length === 0 ? true : false}
      >
        Proceed to checkout
      </Button>
    </div>
  );
}

export default Subtotal;

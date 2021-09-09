import React from "react";
import "./CheckoutProduct.css";
import CurrencyFormat from "react-currency-format";
import StarIcon from "@material-ui/icons/Star";
import Button from "react-bootstrap/Button";
import { useStateValue } from "../../StateProvider";

function CheckoutProduct({ id, imageURL, title, price, rating }) {
  // eslint-disable-next-line
  const [{ cart }, dispath] = useStateValue();

  const removeFromCart = () => {
    dispath({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };

  return (
    <div className="checkout-product border border-1">
      <div className="imgBox">
        <img
          className="checkout-product-image"
          src={imageURL}
          alt="chekcout-product-IMG"
        />
      </div>

      <div className="checkout-product-info">
        <div className="checkout-product-title">{title}</div>
        <p className="checkout-product-price">
          <strong>
            <CurrencyFormat
              decimalScale={2}
              value={price.toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </strong>
        </p>

        <div className="checkout-product-rating">
          {Array(rating)
            .fill()
            .map(() => (
              <StarIcon className="star" />
            ))}
        </div>

        <Button
          type="button"
          variant="warning"
          className="removeFromCartButtonColor"
          onClick={removeFromCart}
        >
          Remove from Cart
        </Button>
      </div>
    </div>
  );
}

export default CheckoutProduct;

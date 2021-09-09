import React, { useState, useEffect } from "react";
import "./Product.css";
import StarIcon from "@material-ui/icons/Star";
import Button from "react-bootstrap/Button";
import { useStateValue } from "../../StateProvider";
import CurrencyFormat from "react-currency-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 1500));
}

function Product({ id, title, imageUrl, price, rating }) {
  // eslint-disable-next-line
  const [{ cart }, dispatch] = useStateValue();
  const [isAdded, setAdded] = useState(false);

  useEffect(() => {
    if (isAdded) {
      simulateNetworkRequest().then(() => {
        setAdded(false);
      });
    }
  }, [isAdded]);

  const buttonContent = () => {
    if (isAdded) {
      return (
        <div>
          Added to Cart
          <FontAwesomeIcon icon={faCheck} className="check-icon" />
        </div>
      );
    } else {
      return "Add to Cart";
    }
  };

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: id,
        title: title,
        image: imageUrl,
        price: price,
        rating: rating,
      },
    });
    if (!isAdded) setAdded(true);
  };

  return (
    <div className="product">
      <div className="product-info">
        <p>{title}</p>
        <p className="product-price">
          <small>$</small>
          <strong>
            <CurrencyFormat
              decimalScale={2}
              value={price.toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
            />
          </strong>
        </p>
        <div className="product-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon className="star" />
            ))}
        </div>
      </div>
      <img src={imageUrl} alt="productImg" />

      <Button
        type="button"
        variant="warning"
        disabled={isAdded}
        className="addToCartButtonColor"
        onClick={addToCart}
      >
        {buttonContent()}
      </Button>
    </div>
  );
}

export default Product;

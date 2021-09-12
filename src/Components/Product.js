import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StarIcon from "@material-ui/icons/Star";
import Button from "react-bootstrap/Button";
import { useStateValue } from "../StateProvider";
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
          <FontAwesomeIcon
            icon={faCheck}
            style={{ marginLeft: "5px", color: "green" }}
          />
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
    <ProductBody>
      <ProductInfoBox>
        <p>{title}</p>
        <ProductPrice>
          <small>$</small>
          <strong>
            <CurrencyFormat
              decimalScale={2}
              value={price.toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
            />
          </strong>
        </ProductPrice>
        <ProductRating>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon />
            ))}
        </ProductRating>
      </ProductInfoBox>
      <ProductImage src={imageUrl} alt="productImg" />

      <AddToCartButton
        type="button"
        variant="warning"
        disabled={isAdded}
        onClick={addToCart}
      >
        {buttonContent()}
      </AddToCartButton>
    </ProductBody>
  );
}

export default Product;

const ProductBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 20px;
  width: 100%;
  max-height: 700px;
  max-width: 100%;
  background-color: white;
  z-index: 1;
`;

const ProductImage = styled.img`
  height: 300px;
  width: 100%;
  object-fit: contain;
  margin-bottom: 50px;
  margin-top: 100px;
`;

const ProductInfoBox = styled.div`
  height: 100px;
  width: 100%;
  margin-bottom: 15px;
  padding: 10px 10px 0;
`;

const ProductPrice = styled.p`
  margin-top: 5px;
`;

const ProductRating = styled.div`
  display: flex;
  margin-bottom: 30px;
  color: orange;
`;

const AddToCartButton = styled(Button)`
  background-color: rgb(255, 216, 21);
  color: black;
  border: none;
  border-radius: 20px;
  max-width: 200px;
  min-width: 120px;
  font-weight: 500;
  font-size: smaller;

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

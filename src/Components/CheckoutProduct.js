import React from "react";
import styled from "styled-components";
import CurrencyFormat from "react-currency-format";
import StarIcon from "@material-ui/icons/Star";
import Button from "react-bootstrap/Button";
import { useStateValue } from "../StateProvider";

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
    <CheckoutProductBody>
      <ProductImageBox>
        <ProductImage src={imageURL} alt="chekcout-product-IMG" />
      </ProductImageBox>

      <ProductInfoBox>
        <ProductTitle>{title}</ProductTitle>
        <ProductPrice>
          <strong>
            <CurrencyFormat
              decimalScale={2}
              value={price.toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </strong>
        </ProductPrice>

        <ProductRating>
          {Array(rating)
            .fill()
            .map(() => (
              <StarIcon />
            ))}
        </ProductRating>

        <RemoveFromCartButton
          type="button"
          variant="warning"
          onClick={removeFromCart}
        >
          Remove from Cart
        </RemoveFromCartButton>
      </ProductInfoBox>
    </CheckoutProductBody>
  );
}

export default CheckoutProduct;

const CheckoutProductBody = styled.div`
  display: flex;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid lightgrey;
`;

const ProductImageBox = styled.div`
  margin-right: 20px;
  width: 220px;
  height: 220px;
  aspect-ratio: auto 220 / 220;
`;

const ProductImage = styled.img`
  object-fit: contain;
  width: 220px;
  height: 220px;
  aspect-ratio: auto 220 / 220;
  max-width: 100%;
  display: flex;
  justify-content: center;
`;

const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ProductTitle = styled.div`
  font-size: large;
  font-weight: 500;
`;

const ProductPrice = styled.p`
  font-size: x-large;
`;

const ProductRating = styled.div`
  color: orange;
`;

const RemoveFromCartButton = styled(Button)`
  background-color: rgb(255, 216, 21);
  color: black;
  border: none;
  border-radius: 20px;
  max-width: 200px;
  min-width: 120px;
  font-weight: 500;
  font-size: smaller;
  margin-top: 40px;

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

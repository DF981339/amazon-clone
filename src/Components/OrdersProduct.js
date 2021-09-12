import React from "react";
import styled from "styled-components";
import CurrencyFormat from "react-currency-format";
import StarIcon from "@material-ui/icons/Star";

function OrdersProduct({ id, imageURL, title, price, rating }) {
  return (
    <OrdersProductBody>
      <OrdersProductContainer>
        <OrdersProductImageSection>
          <OrdersProductImage src={imageURL} alt="chekcout-product-IMG" />
        </OrdersProductImageSection>

        <OrdersProductInfo>
          <OrdersProductTitle>{title}</OrdersProductTitle>
          <OrdersProductPrice>
            <strong>
              <CurrencyFormat
                decimalScale={2}
                value={price.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </strong>
          </OrdersProductPrice>
          <OrdersProductRating>
            {Array(rating)
              .fill()
              .map(() => (
                <StarIcon fontSize="small" />
              ))}
          </OrdersProductRating>
        </OrdersProductInfo>
      </OrdersProductContainer>
    </OrdersProductBody>
  );
}

export default OrdersProduct;

const OrdersProductBody = styled.div`
  padding: 10px;
`;
const OrdersProductContainer = styled.div`
  display: flex;
  width: 100%;
  height: max-content;
`;
const OrdersProductImageSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  aspect-ratio: auto 220 / 220;
  width: 90px;
  height: 90px;
  margin: 0 10px;
`;
const OrdersProductImage = styled.img`
  width: 90px;
  height: 90px;
  object-fit: contain;
`;
const OrdersProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const OrdersProductTitle = styled.div`
  margin-left: 3px;
`;
const OrdersProductPrice = styled.div`
  margin-left: 3px;
`;
const OrdersProductRating = styled.div`
  color: orange;
`;

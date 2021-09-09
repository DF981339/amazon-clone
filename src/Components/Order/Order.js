import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../StateProvider";
import OrdersProduct from "../OrdersProduct/OrdersProduct";

function Order({ order }) {
  // eslint-disable-next-line
  const [{ cart, user }, dispatch] = useStateValue();

  return (
    <div>
      <OrderBody>
        <OrderContainer>
          <OrderInfoBar>
            {/* LEFT SIDE */}
            <OrderInfoBarLeft>
              <OrderPlacedDate>
                <OrderInfoBarTop>ORDER PLACED</OrderInfoBarTop>
                <OrderInfoBarBottom>
                  {dayjs.unix(order.data.created).format("MMMM D, YYYY")}
                </OrderInfoBarBottom>
              </OrderPlacedDate>

              <OrderTotal>
                <OrderInfoBarTop>TOTAL</OrderInfoBarTop>
                <OrderInfoBarBottom>
                  <CurrencyFormat
                    decimalScale={2}
                    value={(order.data.amount / 100).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix="$"
                  />
                </OrderInfoBarBottom>
              </OrderTotal>

              <OrderShipping>
                <OrderInfoBarTop>SHIP TO</OrderInfoBarTop>
                <OrderInfoBarBottom>{user?.displayName}</OrderInfoBarBottom>
              </OrderShipping>
            </OrderInfoBarLeft>

            {/* RIGHT SIDE */}
            <OrderInfoBarRight>
              <OrderNumber>
                <OrderInfoBarTop>ORDER # {order.id}</OrderInfoBarTop>
              </OrderNumber>
            </OrderInfoBarRight>
          </OrderInfoBar>
          <OrderItemsSection>
            {order.data.cart?.map((item) => (
              <OrdersProduct
                id={item.id}
                title={item.title}
                imageURL={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </OrderItemsSection>
        </OrderContainer>
      </OrderBody>
    </div>
  );
}

export default Order;

const OrderBody = styled.div`
  margin-bottom: 20px;
`;
const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(213, 217, 217);
  border-radius: 8px;
`;
const OrderInfoBar = styled.div`
  display: flex;
  flex-direction: row;
  background-color: rgb(241, 242, 242);
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid rgb(213, 217, 217);
  padding: 14px 18px;
  color: #565959;
`;
const OrderInfoBarTop = styled.div`
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
`;
const OrderInfoBarBottom = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
`;
const OrderInfoBarLeft = styled.div`
  width: 100%;
  display: flex;
`;
const OrderInfoBarRight = styled.div`
  width: 290px;
`;
const OrderPlacedDate = styled.div`
  width: 23.448%;
  margin-right: 2%;
`;
const OrderTotal = styled.div`
  width: 14.948%;
  margin-right: 2%;
`;
const OrderShipping = styled.div`
  width: 340px;
`;
const OrderNumber = styled.div`
  width: 290px;
  text-align: right;
`;
const OrderItemsSection = styled.div``;

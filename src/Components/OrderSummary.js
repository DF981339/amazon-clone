import React from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import { getCartTotal } from "../reducer";
import Button from "react-bootstrap/Button";
import CurrencyFormat from "react-currency-format";

function OrderSummary({ processing, disabled, succeeded, formID }) {
  // eslint-disable-next-line
  const [{ cart, user }, dispatch] = useStateValue();

  return (
    <div>
      <Container>
        <PlaceOrderButton
          type="submit"
          form={formID}
          variant="warning"
          disabled={processing || disabled || succeeded}
        >
          <span>{processing ? "Processing" : "Place your order"}</span>
        </PlaceOrderButton>
        <NoticeSection>
          By placing your order, you agree to Amazon-Clone-Ecommerce-Website's{" "}
          <span style={{ color: "rgb(13,120,139)" }}>privacy notice</span> and{" "}
          <span style={{ color: "rgb(13,120,139)" }}>conditions of use</span>.
        </NoticeSection>

        <Divider></Divider>

        <Title>Order Summary</Title>

        <Table>
          <tbody>
            <tr>
              <td
                style={{
                  width: "70%",
                }}
              >
                Items:
              </td>
              <td
                style={{
                  width: "30%",
                }}
                align="right"
              >
                <CurrencyFormat
                  decimalScale={2}
                  value={getCartTotal(cart).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix="$"
                />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  paddingBottom: "5px",
                  width: "70%",
                }}
              >
                Shipping & handling:
              </td>
              <td
                align="right"
                style={{
                  borderBottom: "1px solid rgb(231,231,231)",
                  paddingBottom: "5px",
                  width: "30%",
                }}
              >
                $0.00
              </td>
            </tr>
            <tr>
              <td
                style={{
                  paddingTop: "5px",
                  width: "70%",
                }}
              >
                Total before tax:
              </td>
              <td
                style={{
                  paddingTop: "5px",
                  width: "30%",
                }}
                align="right"
              >
                <CurrencyFormat
                  decimalScale={2}
                  value={getCartTotal(cart).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix="$"
                />
              </td>
            </tr>
            <tr
              style={{
                borderBottom: "1px solid rgb(231,231,231)",
              }}
            >
              <td
                style={{
                  paddingBottom: "5px",
                  width: "70%",
                }}
              >
                Estimated tax to be collected:
              </td>
              <td
                style={{
                  paddingBottom: "5px",
                  width: "30%",
                }}
                align="right"
              >
                $0.00
              </td>
            </tr>
            <OrderTotal>
              <td>Order total:</td>
              <td align="right">
                <CurrencyFormat
                  decimalScale={2}
                  value={getCartTotal(cart).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix="$"
                />
              </td>
            </OrderTotal>
          </tbody>
        </Table>
      </Container>

      <Bottom>
        <BottomContent style={{ color: "rgb(13,120,139)" }}>
          How are shipping costs calculated?
        </BottomContent>
        <BottomContent>
          Prime shipping benefits have been applied to your order.
        </BottomContent>
      </Bottom>
    </div>
  );
}

export default OrderSummary;

const Container = styled.div`
  width: 290px;
  margin-right: -290px;
  float: left;
  border: 1px solid lightgray;
  border-radius: 8px 8px 0 0;
  display: flex;
  flex-direction: column;
  padding: 15px 15px 0;
`;

const PlaceOrderButton = styled(Button)`
  background-color: rgb(255, 216, 21);
  color: black;
  border: none;
  border-radius: 8px;
  width: 100%;
  height: 35px;
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

const NoticeSection = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: rgb(100, 103, 103);
  margin-top: 5px;
  padding: 0 3px;
  margin-bottom: -15px;
`;

const Divider = styled.div`
  line-height: 1;
  font-size: 11px;
  color: #656464;
  font-weight: 400;
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 25px;
  margin-bottom: 3px;

  &::before {
    content: "";
    flex: 1;
    border-top: 1px solid #e3e3e3;
  }

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

const Title = styled.div`
  font-size: 18px;
  font-weight: 800;
  line-height: 24px;
  margin-top: 10px;
  margin-bottom: 15px;
`;

const Table = styled.table`
  font-size: 11px;
  font-weight: 500;
  line-height: 18px;
  margin-bottom: 10px;
`;

const OrderTotal = styled.tr`
  color: #b12704;
  font-size: 18px;
  font-weight: 700;
  line-height: 45px;
  margin-top: 10px;
`;

const Bottom = styled.div`
  background-color: rgb(241, 242, 242);
  width: 290px;
  margin-right: -290px;
  float: left;
  border: 1px solid lightgray;
  margin-top: 310px;
  border-radius: 0 0 8px 8px;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
`;

const BottomContent = styled.p`
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 5px;
`;

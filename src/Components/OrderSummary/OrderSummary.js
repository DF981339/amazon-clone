import React from "react";
import "./OrderSummary.css";
import { useStateValue } from "../../StateProvider";
import { getCartTotal } from "../../reducer";
import Button from "react-bootstrap/Button";
import CurrencyFormat from "react-currency-format";

function OrderSummary({ processing, disabled, succeeded, formID }) {
  // eslint-disable-next-line
  const [{ cart, user }, dispatch] = useStateValue();

  return (
    <div>
      <div className="order-summary-container">
        <Button
          type="submit"
          form={formID}
          variant="warning"
          className="placeOrderButtonColor"
          disabled={processing || disabled || succeeded}
        >
          <span>{processing ? "Processing" : "Place your order"}</span>
        </Button>
        <div className="buying-notice">
          By placing your order, you agree to Amazon-Clone-Ecommerce-Website's{" "}
          <span style={{ color: "rgb(13,120,139)" }}>privacy notice</span> and{" "}
          <span style={{ color: "rgb(13,120,139)" }}>conditions of use</span>.
        </div>

        <div className="divider"></div>

        <div className="order-summary-title">Order Summary</div>

        <table className="order-summary-table">
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
            <tr className="order-total">
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
            </tr>
          </tbody>
        </table>
      </div>

      <div className="order-summary-bottom">
        <div className="order-summary-info-section">
          <p style={{ color: "rgb(13,120,139)" }}>
            How are shipping costs calculated?
          </p>
          <p>Prime shipping benefits have been applied to your order.</p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;

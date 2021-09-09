import React from "react";
import "./CheckoutBanner.css";
import { useStateValue } from "../../StateProvider";
import { getCartTotal, getCostAfterSaving } from "../../reducer";
import CurrencyFormat from "react-currency-format";

function CheckoutBanner() {
  // eslint-disable-next-line
  const [{ cart }, dispatch] = useStateValue();

  const renderRemainingNum = () => {
    return (
      <tr>
        <td style={{ width: "150px" }}>
          <span className="savings">Savings Remaining:</span>
        </td>
        <td style={{ width: "75px" }} align="right">
          <span className="savings">
            <CurrencyFormat
              decimalScale={2}
              value={Math.abs(getCostAfterSaving(getCartTotal(cart))).toFixed(
                2
              )}
              displayType={"text"}
              thousandSeparator={true}
              prefix="$"
            />
          </span>
        </td>
      </tr>
    );
  };

  const bannerContent = () => {
    if (cart.length !== 0) {
      return (
        <div className="amazon-card-ads">
          {/* Card Image */}
          <div className="amazon-card-section">
            <img
              src="https://images-na.ssl-images-amazon.com/images/G/01/credit/img17/CBCC/banners/orange._CB485928556_.png"
              alt="amazon-card"
              className="amazon-card"
            />
          </div>

          {/* Card Info Section */}
          <div class="amazon-card-word-section">
            <div className="amazon-card-word">
              Get a{" "}
              <strong>
                <span style={{ color: "#FF9900", fontWeight: "900" }}>
                  $50 Amazon Gift Card instantly
                </span>
              </strong>{" "}
              upon approval for the{" "}
              <strong style={{ fontWeight: "900" }}>
                Amazon Rewards Visa Card
              </strong>
            </div>
          </div>

          {/* Calculation Section */}
          <div className="amazon-card-calculation-section">
            <table style={{ width: "250px" }} cellPadding="0">
              <tbody>
                <tr>
                  <td style={{ width: "150px" }}>
                    <span className="current-total">Current Total:</span>
                  </td>
                  <td style={{ width: "75px" }} align="right">
                    <span className="current-total">
                      <CurrencyFormat
                        decimalScale={2}
                        value={getCartTotal(cart).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix="$"
                      />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "150px" }}>
                    <span className="savings">Savings:</span>
                  </td>
                  <td
                    align="right"
                    style={{ borderBottom: "1px solid black", width: "75px" }}
                  >
                    <span className="savings">-$50.00</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "150px" }}>
                    <span className="cost-after-savings">
                      Cost After Savings:
                    </span>
                  </td>
                  <td style={{ width: "75px" }} align="right">
                    <span className="cost-after-savings">
                      <CurrencyFormat
                        decimalScale={2}
                        value={
                          getCostAfterSaving(getCartTotal(cart)) < 0
                            ? (0).toFixed(2)
                            : getCostAfterSaving(getCartTotal(cart)).toFixed(2)
                        }
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix="$"
                      />
                    </span>
                  </td>
                </tr>
                {getCostAfterSaving(getCartTotal(cart)) < 0
                  ? renderRemainingNum()
                  : null}
              </tbody>
            </table>
          </div>

          {/* Apply Section */}
          <div className="apply-now-section">
            <img
              src="https://images-na.ssl-images-amazon.com/images/G/01/credit/ad-creative-12/buttons/apply-now-sec_btn._CB485933314_.png"
              alt=""
            />
          </div>
        </div>
      );
    } else {
      return (
        <img
          className="w-100 mb1"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="ads"
        />
      );
    }
  };

  return <div>{bannerContent()}</div>;
}

export default CheckoutBanner;

import React from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import { getCartTotal, getCostAfterSaving } from "../reducer";
import CurrencyFormat from "react-currency-format";

function CheckoutBanner() {
  // eslint-disable-next-line
  const [{ cart }, dispatch] = useStateValue();

  const renderRemainingNum = () => {
    return (
      <tr>
        <td style={{ width: "150px" }}>
          <Savings>Savings Remaining:</Savings>
        </td>
        <td style={{ width: "75px" }} align="right">
          <Savings>
            <CurrencyFormat
              decimalScale={2}
              value={Math.abs(getCostAfterSaving(getCartTotal(cart))).toFixed(
                2
              )}
              displayType={"text"}
              thousandSeparator={true}
              prefix="$"
            />
          </Savings>
        </td>
      </tr>
    );
  };

  const bannerContent = () => {
    if (cart.length !== 0) {
      return (
        <Ads>
          {/* Card Image */}
          <CardSection>
            <CardImage
              src="https://images-na.ssl-images-amazon.com/images/G/01/credit/img17/CBCC/banners/orange._CB485928556_.png"
              alt="amazon-card"
            />
          </CardSection>

          {/* Card Info Section */}
          <DescriptionSection>
            <Description>
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
            </Description>
          </DescriptionSection>

          {/* Calculation Section */}
          <CalculationSection>
            <table style={{ width: "250px" }} cellPadding="0">
              <tbody>
                <tr>
                  <td style={{ width: "150px" }}>
                    <CurrentTotal>Current Total:</CurrentTotal>
                  </td>
                  <td style={{ width: "75px" }} align="right">
                    <CurrentTotal>
                      <CurrencyFormat
                        decimalScale={2}
                        value={getCartTotal(cart).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix="$"
                      />
                    </CurrentTotal>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "150px" }}>
                    <Savings>Savings:</Savings>
                  </td>
                  <td
                    align="right"
                    style={{ borderBottom: "1px solid black", width: "75px" }}
                  >
                    <Savings>-$50.00</Savings>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "150px" }}>
                    <CostAfterSavings>Cost After Savings:</CostAfterSavings>
                  </td>
                  <td style={{ width: "75px" }} align="right">
                    <CostAfterSavings>
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
                    </CostAfterSavings>
                  </td>
                </tr>
                {getCostAfterSaving(getCartTotal(cart)) < 0
                  ? renderRemainingNum()
                  : null}
              </tbody>
            </table>
          </CalculationSection>

          {/* Apply Section */}
          <ApplyNowSection>
            <ApplyNowImage
              src="https://images-na.ssl-images-amazon.com/images/G/01/credit/ad-creative-12/buttons/apply-now-sec_btn._CB485933314_.png"
              alt=""
            />
          </ApplyNowSection>
        </Ads>
      );
    } else {
      return (
        <EmptyCartImage
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="ads"
        />
      );
    }
  };

  return <div>{bannerContent()}</div>;
}

export default CheckoutBanner;

const Ads = styled.div`
  display: flex;
  width: 100%;
  height: max-content;
  max-width: 1540px;
  background-color: white;
  border: solid 1px rgba(173, 216, 230, 0.667);
  padding: 5px 0;
`;

const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 25px;
`;

const CardImage = styled.img`
  width: 135px;
  height: 85px;
`;

const DescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 4px;
`;

const Description = styled.div`
  font-size: larger;
`;

const CalculationSection = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 21px;
  justify-content: center;
  align-items: center;
  width: 280px;
  margin-left: 50px;
`;

const CurrentTotal = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const Savings = styled.span`
  font-size: 14px;
  font-weight: 800;
`;

const CostAfterSavings = styled.span`
  font-size: 14px;
  font-weight: 900;
  color: #a13029;
`;

const ApplyNowSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 165px;
  margin: 0 20px;
`;

const ApplyNowImage = styled.img`
  object-fit: contain;
`;

const EmptyCartImage = styled.img`
  width: 100%;
  margin-bottom: ($spacer * 0.25);
`;

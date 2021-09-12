import React from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";

function PaymentHeader() {
  // eslint-disable-next-line
  const [{ cart }, dispatch] = useStateValue();

  return (
    <HeaderBody>
      <LogoSection>
        <Link to="/">
          <LogoImage></LogoImage>
        </Link>
      </LogoSection>

      <TitleSection>
        <TitleContainer>
          <Title>
            Checkout (
            <Link to="/checkout" style={{ textDecoration: "none" }}>
              <ItemAmount>
                {cart.length}
                {"  "}
                {cart.length <= 1 ? "item" : "items"}
              </ItemAmount>
            </Link>
            )
          </Title>
        </TitleContainer>
      </TitleSection>

      <LockSection>
        <LockContainer>
          <img
            src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/checkout/truespc/secured-ssl._CB485936932_.png"
            alt="lock"
          />
        </LockContainer>
      </LockSection>
    </HeaderBody>
  );
}

export default PaymentHeader;

const HeaderBody = styled.div`
  display: flex;
  justify-content: center;
  height: 60px;
  width: 100%;
  background-image: linear-gradient(
    to bottom,
    rgb(255, 255, 255),
    rgb(242, 242, 242)
  );
  border-bottom: 1px solid rgb(221, 221, 221);
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 192px;
  padding-top: 5px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 768px;
  padding-top: 5px;
`;

const LockSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 192px;
`;

const LogoImage = styled.div`
  background-image: url(https://m.media-amazon.com/images/S/sash/E6vgqiIirWgGb3f.png);
  background-size: 512px 256px;
  background-repeat: no-repeat;
  background-position: -2px -167px;
  height: 31px;
  width: 103px;
`;

const TitleContainer = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 28px;
  line-height: 36px;
`;

const LockContainer = styled.div`
  text-align: center;
`;

const ItemAmount = styled.span`
  color: rgb(1, 113, 133);
  font-size: 25px;
`;

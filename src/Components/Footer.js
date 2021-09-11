import React from "react";
import styled from "styled-components";

function Footer() {
  const year = new Date().getFullYear();
  return <FooterBody>© {year}, Amazon-Clone-Ecommerce-Website</FooterBody>;
}

export default Footer;

const FooterBody = styled.div`
  font-size: 11px;
  line-height: 1.465;
  text-align: center;
  color: #555;
  margin-top: 40px;
  margin-bottom: 40px;
`;

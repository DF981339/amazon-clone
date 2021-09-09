import React from "react";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();
  return <div className="footer">© {year}, Amazon-Clone-Ecommerce-Website</div>;
}

export default Footer;

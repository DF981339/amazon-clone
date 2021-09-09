import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { auth } from "../../firebase";

function Header() {
  // eslint-disable-next-line
  const [{ cart, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  const handleOrderRoute = () => {
    if (user) {
      return "/orders";
    } else {
      return "/login";
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header-logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazonimg"
        />
      </Link>

      <div className="header-search">
        <input className="header-searchBar" type="text" />
        <div className="header-searchIconDiv">
          <SearchIcon className="header-searchIcon" fontSize="large" />
        </div>
      </div>

      <div className="header-nav">
        <Link
          to={!user && "/login"}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div onClick={handleAuthentication} className="header-navItem">
            <span className="header-navItemTop">
              Hello, {user ? user.displayName : "Guest"}
            </span>
            <span className="header-navItemBottom">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link
          to={handleOrderRoute}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="header-navItem">
            <span className="header-navItemTop">Returns</span>
            <span className="header-navItemBottom">& Orders</span>
          </div>
        </Link>

        <Link to="/checkout" style={{ textDecoration: "none" }}>
          <div className="header-navCartItem">
            <ShoppingCartIcon className="header-cartIcon" />
            <span className="header-navItemBottom header-productCount">
              {cart?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;

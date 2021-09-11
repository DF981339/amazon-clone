import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";

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
    <HeaderContainer>
      <Link to="/">
        <HeaderLogo
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazonimg"
        />
      </Link>

      <HeaderSearch>
        <HeaderSearchBar type="text" />
        <HeaderSearchIconDiv>
          <HeaderSearchIcon fontSize="large" />
        </HeaderSearchIconDiv>
      </HeaderSearch>

      <HeaderNav>
        <Link
          to={!user && "/login"}
          style={{ textDecoration: "none", color: "white" }}
        >
          <HeaderNavItem onClick={handleAuthentication}>
            <HeaderNavItemTop>
              Hello, {user ? user.displayName : "Guest"}
            </HeaderNavItemTop>
            <HeaderNavItemBottom>
              {user ? "Sign Out" : "Sign In"}
            </HeaderNavItemBottom>
          </HeaderNavItem>
        </Link>
        <Link
          to={handleOrderRoute}
          style={{ textDecoration: "none", color: "white" }}
        >
          <HeaderNavItem>
            <HeaderNavItemTop>Returns</HeaderNavItemTop>
            <HeaderNavItemBottom>& Orders</HeaderNavItemBottom>
          </HeaderNavItem>
        </Link>

        <Link to="/checkout" style={{ textDecoration: "none" }}>
          <HeaderNavCartItem>
            <HeaderShoppingCartIcon />
            <HeaderProductCount>{cart?.length}</HeaderProductCount>
          </HeaderNavCartItem>
        </Link>
      </HeaderNav>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  color: white;
  background-color: #131921;
  position: sticky;
  top: 0;
  z-index: 100;
  min-width: 998px;
`;

const HeaderLogo = styled.img`
  width: 100px;
  object-fit: contain;
  margin: 0 20px;
  margin-top: 15px;
`;

const HeaderSearch = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  margin-right: 10px;
  margin-left: 5px;
`;

const HeaderSearchBar = styled.input`
  padding: 8px;
  border: none;
  width: 100%;
  border-radius: 5px 0 0 5px;

  &:focus {
    outline-width: 0;
  }
`;

const HeaderSearchIconDiv = styled.div`
  width: 45px;
  height: 40px;
  color: black;
  background-color: #febd69;
  border-radius: 0 5px 5px 0;
`;

const HeaderSearchIcon = styled(SearchIcon)`
  margin-top: 4px;
  margin-left: 5px;
`;

const HeaderNav = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const HeaderNavItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 15px;
  font-weight: bold;
`;

const HeaderNavItemTop = styled.span`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: -5px;
  padding-top: 2px;
`;

const HeaderNavItemBottom = styled.span`
  font-size: 14px;
  font-weight: 800;
`;

const HeaderNavCartItem = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 15px 0px;
  text-decoration: none;
`;

const HeaderShoppingCartIcon = styled(ShoppingCartIcon)`
  padding-top: 1px;
  color: white;
`;

const HeaderProductCount = styled.span`
  font-size: 14px;
  font-weight: 800;
  font-size: 20px;
  margin: 0 10px;
  color: orange;
`;

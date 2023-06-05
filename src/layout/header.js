import React, { useContext, useEffect, useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, NavbarText, Input } from "reactstrap";
import { BsBasketFill } from "react-icons/bs";
import { cardTotalPrice } from "../helpers/product-helper";
import ShoppingCard from "../pages/products/card";
import { LayoutContext } from "./layout";
import Filter from "../pages/products/filter";

export default function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [totalPrice, setTotalPrice] = useState(0);
  const layoutProps = useContext(LayoutContext);

  useEffect(() => {
    const handleStorageChange = () => {
      setTotalPrice(cardTotalPrice());
    };
    handleStorageChange();
    window.addEventListener("storageChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storageChanged", handleStorageChange);
    };
  }, []);

  return (
    <Navbar expand={"md"} sticky="top" color="white">
      <NavbarBrand href="/">Eteration</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse className="" isOpen={isOpen} navbar>
        <Nav className="me-auto d-flex w-100 justify-content-between align-items-center" navbar>
          <NavItem>
            <NavLink href="/">Ürünler</NavLink>
          </NavItem>
          <NavbarText>
            <div>
              <Input bsSize="sm" type="search" placeholder="Marka Ara.." onChange={(e) => layoutProps.setSearchText(e.target.value)} />
            </div>
          </NavbarText>
          <NavItem>
            <NavLink href="/card" className="d-flex align-items-center">
              <BsBasketFill className="me-2" />
              {totalPrice}₺
            </NavLink>
          </NavItem>
          <NavItem className="d-md-none d-sm-row row flex-column">
            <div className="col d-flex text-center">
              <ShoppingCard />
            </div>
            <div className="col">
              <Filter />
            </div>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

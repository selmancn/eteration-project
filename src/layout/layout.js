import { useState, createContext } from "react";
import Header from "./header";

export const LayoutContext = createContext();

function Layout({ children }) {
  const [searchText, setSearchText] = useState("");
  const [order, setOrder] = useState("");
  const [productFilters, setProductFilters] = useState({ brand: [], model: [] });

  return (
    <div className="px-5">
      <LayoutContext.Provider value={{ searchText, setSearchText, order, setOrder, productFilters, setProductFilters }}>
        <Header></Header>
        <div className="container-fluid mt-5">{children}</div>
      </LayoutContext.Provider>
    </div>
  );
}

export default Layout;

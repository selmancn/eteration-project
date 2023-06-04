import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Products from "../pages/products";
import ProductsDetail from "../pages/products/detail";
import Layout from "../layout/layout";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" Component={Products} />
          <Route path="/product-detail/:id" Component={ProductsDetail} />
        </Routes>
      </Layout>
    </Router>
  );
}

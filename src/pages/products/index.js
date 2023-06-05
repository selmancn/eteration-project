/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { getProducts } from "../../helpers/api-helper";
import ProductCard from "../../components/productCard";
import Filter from "./filter";
import ShoppingCard from "./card";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { LayoutContext } from "../../layout/layout";

export default function Products(props) {
  const [productList, setProductList] = useState([]);
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const layoutProps = useContext(LayoutContext);

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    filterProductList();
  }, [layoutProps.searchText, layoutProps.productFilters, layoutProps.order]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    productList.length > 0 && filterProductList();
  }, [productData]);

  const filterProductList = () => {
    let filteredList = productData;
    filteredList = productData.filter((product) => product.brand.toLowerCase().includes(layoutProps.searchText.toLowerCase()));
    if (layoutProps.productFilters.brand.length > 0) {
      filteredList = filteredList.filter((product) => layoutProps.productFilters.brand.some((filter) => filter.toLowerCase() === product.brand.toLowerCase()));
    }
    if (layoutProps.productFilters.model.length > 0) {
      filteredList = filteredList.filter((product) => layoutProps.productFilters.model.some((filter) => filter.toLowerCase() === product.model.toLowerCase()));
    }
    if (layoutProps.order === "fn") {
      filteredList = filteredList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (layoutProps.order === "fo") {
      filteredList = filteredList.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (layoutProps.order === "pl") {
      filteredList = filteredList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else {
      filteredList = filteredList.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    setProductList(filteredList);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filteredList.length / itemsPerPage));
  };
  const getProductsData = async () => {
    const data = await getProducts();
    setProductData(data);
    setProductList(data);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    setTotalPages(totalPages);
  };

  const renderData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return productList.length === 0 ? <div className="text-muted text-center mt-5">Aradığınız Kriterlerde Ürün Bulunamadı..</div> : productList.slice(startIndex, endIndex).map((item) => <ProductCard key={item.id} item={item}></ProductCard>);
  };

  const renderPagination = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PaginationItem active={i === currentPage ? true : false} className="justify-content-center" key={i} onClick={() => setCurrentPage(i)}>
          <PaginationLink>{i}</PaginationLink>
        </PaginationItem>
      );
    }

    return productList.length === 0 ? null : (
      <Pagination className="d-flex justify-content-center">
        <PaginationItem onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>
          <PaginationLink previous />
        </PaginationItem>
        {pageNumbers}
        <PaginationItem onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}>
          <PaginationLink next />
        </PaginationItem>
      </Pagination>
    );
  };

  return (
    <div className="row">
      <div className="col-md-3 col-lg-2 col-xl-2 text-center d-none d-md-block">
        <div>
          <Filter />
        </div>
      </div>
      <div className="col-md-6 col-lg-8 col-xl-8 ">
        <div className="row justify-content-center">{renderData()}</div>
        <div className="row">
          <div className="col-md-12 p-4">{renderPagination()}</div>
        </div>
      </div>
      <div className="col-md-3 col-lg-2 col-xl-2 text-center d-none d-md-block">
        <ShoppingCard />
      </div>
    </div>
  );
}

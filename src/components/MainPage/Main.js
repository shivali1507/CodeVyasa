import React, { useState, useEffect } from "react";
import "./Main.css";
import Tab from "./Tab/Tab";
import Search from "./Search/Search";
import Table from "./Table/Table";
import Filter from "./Filter/Filter";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

function Main() {
  const [apiData, setApiData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [brandFilter, setBrandFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setApiData(data?.products);
        setFilteredData(data?.products);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    let newData = apiData;

    if (searchTerm) {
      newData = newData.filter((item) =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (brandFilter) {
      newData = newData.filter((item) =>
        item.brand?.toLowerCase().includes(brandFilter.toLowerCase())
      );
    }

    if (categoryFilter) {
      newData = newData.filter((item) => item.category === categoryFilter);
    }

    if (priceFilter) {
      const [minPrice, maxPrice] = priceFilter.split(" - ").map(Number);
      newData = newData.filter(
        (item) => item.price >= minPrice && item.price <= maxPrice
      );
    }

    if (stockFilter) {
      const [minStock, maxStock] = stockFilter.split(" - ").map(Number);
      newData = newData.filter(
        (item) => item.stock >= minStock && item.stock <= maxStock
      );
    }

    setFilteredData(newData);
  }, [
    searchTerm,
    apiData,
    brandFilter,
    priceFilter,
    stockFilter,
    categoryFilter,
  ]);

  const toggleFilter = () => {
    setShowFilter((showFilter) => !showFilter);
  };

  const closeFilter = () => {
    setShowFilter(false);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const applyBrandFilter = (brand) => {
    setBrandFilter(brand);
  };

  const applyPriceFilter = (price) => {
    setPriceFilter(price);
  };

  const applyStockFilter = (stock) => {
    setStockFilter(stock);
  };

  const applyCategoryFilter = (category) => {
    setCategoryFilter(category);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setBrandFilter("");
    setPriceFilter("");
    setCategoryFilter("");
    setStockFilter("");
  };

  return (
    <div className="main-container">
      <div className="main">
        <Tab />
        <Search onFilterClick={toggleFilter} onSearch={handleSearch} />
        <Table data={filteredData} />
      </div>
      <Drawer
        open={showFilter}
        onClose={closeFilter}
        direction="right"
        className="drawer"
      >
        <Filter
          className="filter-panel"
          onFilterClose={closeFilter}
          applyBrandFilter={applyBrandFilter}
          resetFilters={resetFilters}
          drawerClose={closeFilter}
          applyPriceFilter={applyPriceFilter}
          applyStockFilter={applyStockFilter}
          applyCategoryFilter={applyCategoryFilter}
        />
      </Drawer>
    </div>
  );
}

export default Main;

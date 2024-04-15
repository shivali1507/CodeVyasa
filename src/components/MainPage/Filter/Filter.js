import React, { useState } from "react";
import "./Filter.css";
import CloseIcon from "../../../icons/close";
import {
  categories,
  prices,
  stocks,
} from "../../../constants/dropdown-constants";

function Filter({
  onFilterClose,
  applyBrandFilter,
  resetFilters,
  drawerClose,
  applyPriceFilter,
  applyStockFilter,
  applyCategoryFilter,
}) {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleStockChange = (e) => {
    setStock(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleApplyFilter = () => {
    applyBrandFilter(brand);
    applyPriceFilter(price);
    applyStockFilter(stock);
    applyCategoryFilter(category);
    drawerClose();
  };

  const handleResetFilter = () => {
    setBrand("");
    setPrice("");
    setStock("");
    setCategory("");
    resetFilters();
    drawerClose();
  };

  return (
    <div className="filter-container">
      <div className="filter-header">
        <span>Filters</span>
        <button onClick={onFilterClose} className="filter-close">
          <CloseIcon />
        </button>
      </div>
      <div className="filter-list">
        <label className="input-label">
          <span className="input-head">Brand</span>
          <div className="input-container">
            <input
              type="text"
              className="filter-input"
              placeholder="Brand"
              value={brand}
              onChange={handleBrandChange}
            />
          </div>
        </label>
        <label className="input-label">
          <span className="input-head">Category</span>
          <div className="input-container">
            <select className="filter-dropdown" onChange={handleCategoryChange}>
              <option value="">Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category.charAt(0).toUpperCase() +
                    category.slice(1).replace("-", " ")}
                </option>
              ))}
            </select>
          </div>
        </label>
        <label className="input-label">
          <span className="input-head">Price</span>
          <div className="input-container">
            <select className="filter-dropdown" onChange={handlePriceChange}>
              <option value="">Price</option>
              {prices.map((price, index) => (
                <option key={index} value={price}>
                  {price}
                </option>
              ))}
            </select>
          </div>
        </label>
        <label className="input-label">
          <span className="input-head">Stock</span>
          <div className="input-container">
            <select className="filter-dropdown" onChange={handleStockChange}>
              <option value="">Stock</option>
              {stocks.map((stock, index) => (
                <option key={index} value={stock}>
                  {stock}
                </option>
              ))}
            </select>
          </div>
        </label>
      </div>
      <div className="filter-btn">
        <button className="apply" onClick={handleApplyFilter}>
          Apply
        </button>
        <button className="reset" onClick={handleResetFilter}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Filter;

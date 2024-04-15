import React, { useState, useEffect } from "react";
import "./Main.css";
import Tab from "./Tab/Tab";
import Search from "./Search/Search";
import Table from "./Table/Table";
import Filter from "./Filter/Filter";
import Drawer from "react-modern-drawer";
import Modal from "react-modal";
import { saveAs } from "file-saver";
import "react-modern-drawer/dist/index.css";

Modal.setAppElement("#root");

function Main() {
  const [apiData, setApiData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [brandFilter, setBrandFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: 0,
    brand: "",
    discountPercentage: 0,
    category: "",
    stock: 0,
    rating: 0,
  });

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewProduct({
      title: "",
      price: 0,
      brand: "",
      discountPercentage: 0,
      category: "",
      stock: 0,
      rating: 0,
    });
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const addProduct = () => {
    setApiData([...apiData, newProduct]);
    setFilteredData([...filteredData, newProduct]);
    closeModal();
  };

  const convertToCSV = (data) => {
    const csvHeader =
      "Title,Brand,Category,Discount Percentage,Price,Rating,Stock\n";
    const csvData = data
      .map(
        (item) =>
          `${item.title},${item.brand},${item.category},${item.discountPercentage},${item.price},${item.rating},${item.stock}`
      )
      .join("\n");
    return csvHeader + csvData;
  };

  const handleExport = () => {
    const csvData = convertToCSV(filteredData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "products.csv");
  };

  const customStyles = {
    content: {
      width: "30%",
      height: "50%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <div className="main-container">
      <div className="main">
        <Tab />
        <Search
          onFilterClick={toggleFilter}
          onSearch={handleSearch}
          onOpenModal={openModal}
          onExport={handleExport}
        />
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Product"
        style={customStyles}
      >
        <h2 className="modal-head">Add Product</h2>
        <div className="modal-content">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newProduct.title}
            onChange={handleProductChange}
          />
          <div className="clubbed-fields">
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={newProduct.brand}
              onChange={handleProductChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={newProduct.category}
              onChange={handleProductChange}
            />
          </div>
          <div className="clubbed-fields">
            <input
              type="number"
              name="discountPercentage"
              placeholder="Discount Percentage"
              value={newProduct.discountPercentage}
              onChange={handleProductChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newProduct.price}
              onChange={handleProductChange}
            />
          </div>
          <div className="clubbed-fields">
            <input
              type="number"
              name="rating"
              placeholder="Rating"
              value={newProduct.rating}
              onChange={handleProductChange}
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={handleProductChange}
            />
          </div>
          <div className="modal-button">
            <button onClick={addProduct}>Add</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Main;

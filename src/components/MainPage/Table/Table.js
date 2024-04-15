import React, { useState, useEffect } from "react";
import { Pagination } from "../Pagination/Pagination";
import "./Table.css";

function Table({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOptions, setSortOptions] = useState({
    field: null,
    direction: "asc",
  });
  const [sortedData, setSortedData] = useState([]);
  const [allCheckboxChecked, setAllCheckboxChecked] = useState(false);

  const itemsPerPage = 9;
  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleHeaderCheckboxChange = (e) => {
    setAllCheckboxChecked(e.target.checked);
  };

  const handleSort = (field) => {
    let newDirection = "asc";
    if (sortOptions.field === field && sortOptions.direction === "asc") {
      newDirection = "desc";
    }

    setSortOptions({
      field,
      direction: newDirection,
    });
    const sortedItems = [...sortedData].sort((a, b) => {
      if (
        field === "price" ||
        field === "rating" ||
        field === "discountPercentage" ||
        field === "stock"
      ) {
        const comparison = a[field] - b[field];
        return newDirection === "asc" ? comparison : -comparison;
      } else {
        return 0;
      }
    });

    setSortedData(sortedItems);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedData?.slice(startIndex, endIndex);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={allCheckboxChecked}
                onChange={handleHeaderCheckboxChange}
              />
            </th>
            <th>Sr No.</th>
            <th>Title</th>
            <th>Brand</th>
            <th>Category</th>
            <th
              onClick={() => handleSort("discountPercentage")}
              style={{ cursor: "pointer" }}
            >
              Discount Percentage{" "}
              {sortOptions.field === "discountPercentage"
                ? sortOptions.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th
              onClick={() => handleSort("price")}
              style={{ cursor: "pointer" }}
            >
              Price{" "}
              {sortOptions.field === "price"
                ? sortOptions.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th
              onClick={() => handleSort("rating")}
              style={{ cursor: "pointer" }}
            >
              Rating{" "}
              {sortOptions.field === "rating"
                ? sortOptions.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th
              onClick={() => handleSort("stock")}
              style={{ cursor: "pointer" }}
            >
              Stock{" "}
              {sortOptions.field === "stock"
                ? sortOptions.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.length ? (
            currentItems?.map((item, index) => (
              <tr key={item.id}>
                <td>
                  <input type="checkbox" checked={allCheckboxChecked} />
                </td>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.brand}</td>
                <td>{item.category}</td>
                <td>{item.discountPercentage}</td>
                <td>{item.price}</td>
                <td>{item.rating}</td>
                <td>{item.stock}</td>
                <td>...</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" style={{ height: "200px", fontSize: "30px" }}>
                No data found !
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Table;

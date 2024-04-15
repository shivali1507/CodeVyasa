import React, { useState } from "react";
import { Pagination } from "../Pagination/Pagination";
import "./Table.css";

function Table() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(50 / itemsPerPage); // Assuming there are 50 items in total

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Sr No.</th>
            <th>Heading 1</th>
            <th>Heading 2</th>
            <th>Heading 3</th>
            <th>Heading 4</th>
            <th>Heading 5</th>
            <th>Heading 6</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(itemsPerPage)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{(currentPage - 1) * itemsPerPage + rowIndex + 1}</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>...</td>
            </tr>
          ))}
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

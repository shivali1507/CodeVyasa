import React from "react";
import "./Pagination.css";
import { PrevIcon } from "../../../icons/prev-icon";
import { NextIcon } from "../../../icons/next-icon";
import { PrevSecIcon } from "../../../icons/prev-sec-icon";
import { NextSecIcon } from "../../../icons/next-sec-icon";

export function Pagination({ totalPages, currentPage, onPageChange }) {
  if (
    typeof totalPages !== "number" ||
    totalPages <= 0 ||
    !Number.isInteger(totalPages)
  ) {
    return null;
  }
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  let displayPages = [];
  if (totalPages <= 5) {
    displayPages = pages;
  } else {
    if (currentPage <= 3) {
      displayPages = [...pages.slice(0, 3), "...", totalPages];
    } else if (currentPage >= totalPages - 2) {
      displayPages = [1, "...", ...pages.slice(totalPages - 3, totalPages)];
    } else {
      displayPages = [
        1,
        "...",
        ...pages.slice(currentPage - 1, currentPage + 1),
        "...",
        totalPages,
      ];
    }
  }

  return (
    <div className="pagination">
      <div className="pagination-sec-btn" onClick={() => onPageChange(1)}>
        <PrevSecIcon />
      </div>
      <div
        className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <PrevIcon />
      </div>
      {displayPages.map((page, index) => (
        <button
          key={index}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      ))}
      <div
        className={`pagination-btn ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <NextIcon />
      </div>
      <div
        className="pagination-sec-btn"
        onClick={() => onPageChange(totalPages)}
      >
        <NextSecIcon />
      </div>
    </div>
  );
}

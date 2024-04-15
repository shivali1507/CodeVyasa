import React from "react";
import "./Search.css";
import ExportIcon from "../../../icons/export-icon";
import FilterIcon from "../../../icons/filter-icon";
import AddIcon from "../../../icons/add-icon";
import SearchIcon from "../../../icons/search-icon";

function Search({ onFilterClick }) {
  return (
    <div className="search-section">
      <div>
        <span className="search-head">Search</span>
        <div class="input-icons">
          <i>
            <SearchIcon />
          </i>
          <input class="input-field" type="text" placeholder="Search" />
        </div>
      </div>

      <div className="btn">
        <button type="button" className="add-prod">
          <AddIcon />
          <span>Add Products</span>
        </button>
        <button type="button" className="filter" onClick={onFilterClick}>
          <FilterIcon />
          <span>Filter</span>
        </button>
        <button type="button" className="export">
          <ExportIcon />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
}

export default Search;

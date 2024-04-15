import React from "react";
import "./Filter.css";
import CloseIcon from "../../../icons/close";

function Filter({ onFilterClose }) {
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
          <span className="input-head">Product Name</span>
          <div className="input-container">
            <input
              type="text"
              className="filter-input"
              placeholder="Product Name"
            />
          </div>
        </label>
        <label className="input-label">
          <span className="input-head">Category</span>
          <div className="input-container">
            <select className="filter-dropdown">
              <option value="">Category</option>
              <option value="team1">Category 1</option>
              <option value="team2">Category 2</option>
              <option value="team3">Category 3</option>
            </select>
          </div>
        </label>
        <label className="input-label">
          <span className="input-head">Event Name</span>
          <div className="input-container">
            <input
              type="text"
              className="filter-input"
              placeholder="Event Name"
            />
          </div>
        </label>
        <label className="input-label">
          <span className="input-head">Test Match Name</span>
          <div className="input-container">
            <input
              type="text"
              className="filter-input"
              placeholder="Test Match Name"
            />
          </div>
        </label>
        <label className="input-label">
          <span className="input-head">Team</span>
          <div className="input-container">
            <select className="filter-dropdown">
              <option value="">Team</option>
              <option value="team1">Team 1</option>
              <option value="team2">Team 2</option>
              <option value="team3">Team 3</option>
            </select>
          </div>
        </label>
      </div>
      <div className="filter-btn">
        <button className="apply">Apply</button>
        <button className="reset">Reset</button>
      </div>
    </div>
  );
}

export default Filter;

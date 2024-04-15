import React, { useState } from "react";
import "./Main.css";
import Tab from "./Tab/Tab";
import Search from "./Search/Search";
import Table from "./Table/Table";
import Filter from "./Filter/Filter";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

function Main() {
  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter((showFilter) => !showFilter);
  };

  const closeFilter = () => {
    setShowFilter(false);
  };

  return (
    <div className="main-container">
      <div className="main">
        <Tab />
        <Search onFilterClick={toggleFilter} />
        <Table />
      </div>
      <Drawer
        open={showFilter}
        onClose={closeFilter}
        direction="right"
        className="drawer"
      >
        <Filter className="filter-panel" onFilterClose={closeFilter} />
      </Drawer>
    </div>
  );
}

export default Main;

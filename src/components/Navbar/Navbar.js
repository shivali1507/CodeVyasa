import React from "react";
import "./Navbar.css";
import LogoIcon from "../../icons/logo-icon";
import NewsIcon from "../../icons/news-icon";
import FeedIcon from "../../icons/feed-icon";
import StatsIcon from "../../icons/stats-icon";
import JournalIcon from "../../icons/journal-icon";
import ForwardIcon from "../../icons/forward-icon";

function Navbar() {
  return (
    <div className="navbar">
      <LogoIcon />
      <div className="menu-list">
        <div className="menu-options">
          <NewsIcon />
          <FeedIcon />
          <JournalIcon />
          <StatsIcon />
        </div>
        <ForwardIcon />
      </div>
    </div>
  );
}

export default Navbar;

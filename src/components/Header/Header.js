import React from "react";
import "./Header.css";
import NotificationBadge from "../../icons/notification-badge";
import DropdownIcon from "../../icons/dropdown-icon";

function Header() {
  return (
    <div className="header">
      <div className="product">Products</div>
      <div className="notification-badge">
        <NotificationBadge />
        <div className="user-badge">
          <img src="/user.jpg" alt="user" height="30px" width="30px" />
          <span>Matthews Gill</span>
          <DropdownIcon />
        </div>
      </div>
    </div>
  );
}

export default Header;

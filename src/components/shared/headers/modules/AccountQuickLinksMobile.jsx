import React from "react";
import { useDispatch } from "react-redux";
// import Menu from '../../../elements/menu/Menu';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
import { Dropdown, Menu } from "antd";
// import { logOut } from '../../../../store/auth/action';
import { Navigate, useNavigate } from "react-router-dom";
const AccountQuickLinks = () => {
  // const dispatch = useDispatch();
  // const router = useRouter();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/account/register");
  };

  const accountLinks = [
    {
      text: "Account Information",
      url: "/account/user-information",
    },
    {
      text: "Recent Viewed Product",
      url: "/account/recent-viewed-product",
    },
    {
      text: "Wishlist",
      url: "/account/wishlist",
    },
  ];

  const menu = (
    <Menu>
      {accountLinks.map((link) => (
        <Menu.Item key={link.url}>
          <a href={link.url}>
            <a>{link.text}</a>
          </a>
        </Menu.Item>
      ))}
      <Menu.Item>
        <a href="#" onClick={handleLogout}>
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomLeft">
      <a href="#" className="header__extra ps-user--mobile">
        <i className="icon-user"></i>
      </a>
    </Dropdown>
  );
};

export default AccountQuickLinks;

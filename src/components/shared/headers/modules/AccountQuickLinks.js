import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Menu, Dropdown, Button } from "antd";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AccountQuickLinks = (props, favItems) => {
  const [t, i18n] = useTranslation();
  const lang = i18n.language;
  const [isLoggedIn, setIsLoggedIn] = useState(props.isLoggedIn); // قيمة افتراضية من الـ props
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let user = {};
  if (typeof window !== "undefined" && localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  }

  // Log Out From WebSite

  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    // Retrieve the user data from localStorage
    const userData = localStorage.getItem("user");

    if (userData) {
      // Parse the JSON string to an object
      const userObject = JSON.parse(userData);

      // Extract the photo URL
      const userPhotoUrl = userObject.photo;

      // Set the photo URL to state
      setPhotoUrl(userPhotoUrl);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/account/register");
    setIsLoggedIn(false); // تحديث حالة التسجيل إلى false بعد تسجيل الخروج
  };

  // Toggle Menu

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle dropdown visibility
  };

  const accountLinks = [
    {
      text: "Account Information",
      url: "/account/user-information",
    },
  ];

  const linksView = accountLinks.map((item) => (
    <li key={item.text}>
      <a href={item.url}>
        <a style={{ fontSize: "15px" }}>{item.text}</a>
      </a>
    </li>
  ));
  const menu =
    typeof window !== "undefined" && localStorage.getItem("user") ? (
      <Menu>
        <Menu.Item>
          <div className="flex">
            <div className="ps-widget__header  ps-block__right d-flex justify-content-center align-items-center ">
              <img
                src={photoUrl}
                width="50px"
                height="50px"
                style={{ borderRadius: "50%" }}
              />
            </div>
          </div>
          <a href="/account/user-information">
            <a className="cairo">{t("accountInformation")}</a>
          </a>
        </Menu.Item>
        <Menu.Item>
          <a href="/account/favProduct/Favourite">
            <a className="cairo">{t("myProducts")}</a>
          </a>
        </Menu.Item>
        <Menu.Item>
          <a href="'/account/wishlist">
            <a className="cairo">{t("wishlist")}</a>
          </a>
        </Menu.Item>
        <Menu.Item>
          <p onClick={handleLogout} style={{ color: "black" }}>
            <a className="cairo">{t("logOut")}</a>
          </p>
        </Menu.Item>
      </Menu>
    ) : (
      <Menu>
        <a href="/account/login">
          <a className="cairo">{t("login")}</a>
        </a>
        <Menu.Item>
          <a href="/account/favProduct/Favourite">
            <a className="cairo">{t("myProducts")}</a>
          </a>
        </Menu.Item>
        <Menu.Item>
          <a href="'/account/wishlist">
            <a className="cairo">{t("wishlist")}</a>
          </a>
        </Menu.Item>
        <Menu.Item>
          <p onClick={handleLogout} style={{ color: "black" }}>
            <a className="cairo">{t("logOut")}</a>
          </p>
        </Menu.Item>
      </Menu>
    );
  const RentProduct = () => {
    navigate("/account/addProduct");
  };
  return (
    <div>
      <div
        className="ps-block--user-header"
        style={{
          marginTop: "-5px",
        }}
      >
        <div className={lang == "en" ? `ps-block__left ` : `ps-block__right`}>
          <button
            className="ps-btn cairo"
            style={{ backgroundColor: "#222", color: "#fff" }}
            onClick={(e) => RentProduct(e)}
          >
            {t("Rent")}
          </button>
        </div>
        <div
          className={
            lang == "en"
              ? `ps-block__left d-flex justify-content-between align-items-center  `
              : `ps-block__right d-flex justify-content-between align-items-center `
          }
          style={{ marginTop: "-10px" }}
        >
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            visible={visible}
            onVisibleChange={(flag) => setVisible(flag)}
          >
            {typeof window !== "undefined" && localStorage.getItem("user") ? (
              <Button
                className="ps-dropdown language"
                onClick={(e) => e.preventDefault()}
                style={{
                  marginBottom: "10px",
                  marginRight: "15px",
                  marginLeft: "15px",
                  backgroundColor: "transparent",
                  border: "none",
                  padding: 0,
                }}
              >
                <div
                  className={
                    lang == "en"
                      ? `ps-block__left mt-3 ml-2 mr-2 `
                      : `ps-block__right mt-3 ml-2 mr-2`
                  }
                >
                  <i className="icon-user"></i>
                </div>
              </Button>
            ) : (
              <Button
                className="ps-dropdown language"
                onClick={() => navigate("/account/login")}
                style={{
                  marginBottom: "10px",
                  marginRight: "15px",
                  marginLeft: "15px",
                  backgroundColor: "transparent",
                  border: "none",
                  padding: 0,
                }}
              >
                <div
                  className={
                    lang == "en"
                      ? `ps-block__left mt-3 ml-2 mr-2 `
                      : `ps-block__right mt-3 ml-2 mr-2`
                  }
                >
                  <i className="icon-user"></i>
                </div>
              </Button>
            )}
          </Dropdown>
          <Link to="/account/wishlist" className="header__extra">
            <i className="icon-heart ml-2 mr-2"></i>
            <span>
              <i>
                {props.favItems &&
                props.favItems.data &&
                props.favItems.data.items
                  ? props.favItems.data.items.length
                  : 0}
              </i>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect((state) => state)(AccountQuickLinks);

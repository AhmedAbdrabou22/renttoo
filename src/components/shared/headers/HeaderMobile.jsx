import React from "react";
import LanguageSwicher from "./modules/LanguageSwicher";
import MobileHeaderActions from "./modules/MobileHeaderActions";
import Imgg from "../../../static/img/logo.png";
import { useNavigate } from "react-router-dom";

const HeaderMobile = () => {
  const navigate = useNavigate();
  const RentProduct = () => {
    navigate("/account/addProduct");
  };

  let user = {};

  if (localStorage.getItem("token") && localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  }

  return (
    <header className="header header--mobile">
      <div className="header__top">
        <div className="header__left">
          <p>Welcome to Renttoo Online Shopping Store !</p>
        </div>
        <div className="header__right d-flex justify-content-between align-items-center">
          <ul className="navigation__extra">
            <li>
              <LanguageSwicher />
            </li>
          </ul>
          <button
            className="ps-btn cairo"
            style={{ backgroundColor: "#222", color: "#fff" }}
            onClick={(e) => RentProduct(e)}
          >
            Rent
          </button>
        </div>
      </div>
      <div className="navigation--mobile">
        <div className="navigation__left">
          <a href="/">
            <a className="ps-logo">
              <img src={Imgg} alt="Renttoo" width={"35px"} />
            </a>
          </a>
        </div>
       
          <MobileHeaderActions />
        
      </div>
      <div className="ps-search--mobile">
        <form className="ps-form--search-mobile" action="/" method="get">
          <div className="form-group--nest">
            <input
              className="form-control"
              type="text"
              placeholder="Search something..."
            />
            <button>
              <i className="icon-magnifier"></i>
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default HeaderMobile;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Drawer } from "antd";
import PanelMenu from "../panel/PanelMenu";
import PanelCartMobile from "../panel/PanelCartMobile";
import PanelSearch from "../panel/PanelSearch";
import PanelCategories from "../panel/PanelCategories";
import {  useNavigate } from "react-router-dom";

const NavigationList = () => {
  const [menuDrawer, setMenuDrawer] = useState(false);
  const [cartDrawer, setCartDrawer] = useState(false);
  const [searchDrawer, setSearchDrawer] = useState(false);
  const [categoriesDrawer, setCategoriesDrawer] = useState(false);
  const setting = useSelector((state) => state.setting);
  const [open, setOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
 
  const onClose = () => {
    setOpen(false);
  };
  const showDrawerCategory = () => {
    setOpenCategories(true);
  };
  const onCloseCategory = () => {
    setOpenCategories(false);
  };
  const showDrawerSearch = () => {
    setOpenSearch(true);
  };
  const onCloseSearch = () => {
    setOpenSearch(false);
  };
  return (
    <div className="navigation--list">
      <Drawer className="ps-panel--mobile" onClose={onClose} open={open}>
        <div className="ps-panel--wrapper">
          <div className="ps-panel__header">
            <h3>Home</h3>
          </div>
          <div className="ps-panel__content">
            <PanelCategories />
          </div>
        </div>
      </Drawer>

      <Drawer
        className="ps-panel--mobile"
        onClose={onCloseCategory}
        open={openCategories}
      >
        <div className="ps-panel--wrapper">
          <div className="ps-panel__header">
            <h3>Categories</h3>
          </div>
          <div className="ps-panel__content">
            <PanelMenu />
          </div>
        </div>
      </Drawer>

      <Drawer
        className="ps-panel--mobile"
        onClose={onCloseSearch}
        open={openSearch}
      >
        <div className="ps-panel--wrapper">
          <div className="ps-panel__header">
            <h3>Search</h3>
          </div>
          <div className="ps-panel__content">
            <PanelSearch />
          </div>
        </div>
      </Drawer>

      <div className="navigation__content">
        <a className={`navigation__item`} href="/">
          <i className="icon-menu"></i>
          <span>Home</span>
        </a>

        <a className={`navigation__item`} onClick={showDrawerCategory}>
          <i className="icon-list4"></i>
          <span> Categories</span>
        </a>
        <a className={`navigation__item`} onClick={showDrawerSearch}>
          <i className="icon-magnifier"></i>
          <span> Search</span>
        </a>
      </div>
    </div>
  );
};

export default NavigationList;

import React from "react";

import Menu from "../../elements/menu/Menu";
import LanguageSwicher from "../headers/modules/LanguageSwicher";
import MenuCategoriesDropdown from "../../../components/shared/menus/MenuCategoriesDropdown";
import { useTranslation } from "react-i18next";
const NavigationDefault = () => {
  const [t, i18n] = useTranslation();

  const Menudata = [
    {
      text: t("home"),
      url: "/",
    },
    {
      text: t("about-us"),
      url: "/page/about-us",
    },

    {
      text: t("faq"),
      url: "/page/faqs",
    },
    {
      text: t("terms"),
      url: "/page/blank",
    },
  ];
  return (
    <nav className="navigation">
      <div className="ps-container">
        {" "}
        <div className="navigation__left">
          <MenuCategoriesDropdown />
        </div>
        <div className="navigation__right">
          <Menu source={Menudata} className="menu" />

          <ul className="navigation__extra">
            <li>
              <LanguageSwicher />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationDefault;

import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const BreadCrumb = ({ breacrumb, layout }) => {
  const [t, i18n] = useTranslation();
  const textAlign = i18n.language === "ar" ? "left" : "right";
  return (
    <div className="ps-breadcrumb"   style={{ textAlign: textAlign}}>
      <div className={layout === "fullwidth" ? "ps-container" : "container"}>
        <ul className="breadcrumb">
          {breacrumb.map((item, index) => {
            if (!item.url) {
              return <li key={index}>{item.text}</li>;
            } else {
              return (
                <li key={item.text}>
                  <Link href={item.url}>{item.text}</Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default BreadCrumb;

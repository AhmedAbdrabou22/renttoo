import React from "react";
import { useTranslation } from "react-i18next";

const SiteFeatures = () => {
  const { t, i18n } = useTranslation();



  const style = i18n.language === "ar" 
    ? { paddingLeft: "25px" }
    : { paddingRight: "25px" };

 const  text = i18n.language === "ar"  ? "left" : "right"
 const  direction = i18n.language === "ar"  ? "ltr" : "rtl"
 const  reversedDir = i18n.language === "en"  ? "ltr" : "rtl"
  return (
    <div className="ps-site-features" style={{direction:direction}}>
      <div className="container">
        <div className="ps-block--site-features ps-block--site-features-2">
          <div className="ps-block__item " style={{textAlign :text , direction:direction }}  >
            <div className="ps-block__left">
              <i className="icon-rocket"></i>
            </div>
            <div style={style}>
              <h4>{t("FreeDelivery")}</h4>
              <p>{t("Forallordersover$99")}</p>
            </div>
          </div>
          
          <div className="ps-block__item " style={{textAlign :text , direction:direction }} >
            <div className="ps-block__left">
              <i className="icon-credit-card"></i>
            </div>
            <div style={style}>
              <h4>{t("securepayment")}</h4>
              <p>{t("100%securepayment")}</p>
            </div>
          </div>
          
          <div className="ps-block__item " style={{textAlign :text , direction:direction }} >
            <div className="ps-block__left">
              <i className="icon-bubbles"></i>
            </div>
            <div style={style}>
              <h4>{t("24/7Support")}</h4>
              <p>{t("Dedicatedsupport")}</p>
            </div>
          </div>
          
          <div className="ps-block__item " style={{textAlign :text , direction:direction }} >
            <div className="ps-block__left">
              <i className="icon-gift"></i>
            </div>
            <div style={style}>
              <h4>{t("GiftService")}</h4>
              <p>{t("Supportgiftservic")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteFeatures;

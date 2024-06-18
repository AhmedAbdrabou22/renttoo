import React from "react";
import { useTranslation } from "react-i18next";
import { FaGooglePlay } from "react-icons/fa6";
const DownloadApp = () => {
  const [t, i18n] = useTranslation();

  return (
    <a href="https://play.google.com/store/apps/details?id=com.renttoo.app">
      <div className="downloadApp shadow" style={{ left: i18n.language === "en" ? "5%" : undefined }}>
        {/* <img src={Logo} style={{width:"250px"}} alt="logo"/> */}
        <a href="https://play.google.com/store/apps/details?id=com.renttoo.app">
          <FaGooglePlay size={"15px"} />
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.renttoo.app">
          {t('DownloadApp')}
        </a>
      </div>
    </a>
  );
};

export default DownloadApp;

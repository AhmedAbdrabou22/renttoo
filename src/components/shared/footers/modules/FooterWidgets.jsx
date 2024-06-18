// import Link from 'next/link';
// import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { IncreaseAnalatycis, getContactUs } from '~/store/contact/action';
import {
  IncreaseAnalatycis,
  getContactUs,
} from "../../../../store/contact/action";
import { getSocialLink } from "../../../../store/socialLinks/action";
import { useTranslation } from "react-i18next";
const FooterWidgets = () => {
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation();

  // const router = useRouter();
  const [loadin, setLoading] = useState(false);

  const getContact = async () => {
    setLoading(true);
    try {
      await dispatch(getContactUs());
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const getSocialLinks = async () => {
    setLoading(true);
    try {
      await dispatch(getSocialLink());
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getContact();
    getSocialLinks();
  }, [dispatch]);
  const contact = useSelector((state) => state.contact.contact);
  const social = useSelector((state) => state.socialLinks.socialLinks);
  const RedirectWhatsapp = async () => {
    setLoading(true);
    try {
      await dispatch(IncreaseAnalatycis());
      navigate(`https://wa.me/${contact.content}`);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const facebookLink = social?.data?.[0]?.link || "#";
  const tiktokLink = social?.data?.[1]?.link || "#";
  const youtubeLink = social?.data?.[2]?.link || "#";
  const instagramLink = social?.data?.[3]?.link || "#";
  const route = () => {
    navigate(`https://wa.me/${contact.content}`);
  };
  const textAlign = i18n.language === "ar" ? "left" : "right";

  return (
    <div style={{ textAlign }}>
      <div
        className="row jusrify-content-between align-items-center"
        style={{ marginBottom: "35px" }}
      >
        <div
          className="row justify-content-between align-items-center col-12"
          style={{ flexWrap: "wrap", width: "100%" }}
        >
          {" "}
          <div className="col-lg-4 ">
            <div>
              <aside className="widget widget_footer ">
                <h4 className="widget-title">{t("contact-us")}</h4>
                <div className="widget_content">
                  {contact && contact.contact_us
                    ? contact.contact_us.map((contact) => {
                        return (
                          <div style={{ cursor: "pointer" }}>
                            <button
                              className="ps-btn cairo p-3 "
                              style={{width:'37%'}}
                              onClick={() => route()}
                            >
                              {t("contact")} <i className="icon-telephone"></i>{" "}
                            </button>
                          </div>
                        );
                      })
                    : null}
                  <ul className="ps-list--social">
                    <li style={{margin:0}}>
                      <a className="facebook" href={facebookLink}>
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a className="tiktok" href={tiktokLink}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          width="35"
                          height="35"
                          style={{ marginBottom: "5px" }}
                        >
                          <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a className="youtube-plus" href={youtubeLink}>
                        <i className="fa fa-youtube"></i>
                      </a>
                    </li>
                    <li>
                      <a className="instagram" href={instagramLink}>
                        <i className="fa fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div>
              <aside className="widget widget_footer">
                <h4 className="widget-title">{t('Quicklinks')}</h4>
                <ul className="ps-list--link">

                  <li>
                    <a href="/page/blank">
                      <a>{t('terms')}</a>
                    </a>
                  </li>

                  <li>
                    <a href="/page/faqs">
                      <a>{t('faq')}</a>
                    </a>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div>
              <aside className="widget widget_footer">
                <h4 className="widget-title"> {t('company')}</h4>
                <ul className="ps-list--link">
                  <li>
                    <a href="/page/about-us">
                      <a>{t('about-us')}</a>
                    </a>
                  </li>
                  <li>
                    <a href="/page/contact-us">
                      <a>{t('contact')}</a>
                    </a>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterWidgets;

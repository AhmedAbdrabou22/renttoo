import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetRecent } from "../../../store/userItems/actions";
import Product from "../../../components/elements/products/Product";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Imgg from "../../../static/img/users/Animation - 1716196066837.gif";
const RecentViewedProducts = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation();
  const lang = i18n.language;

  const getRecentSeen = async () => {
    setLoading(true);
    try {
      await dispatch(GetRecent());
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecentSeen();
  }, [dispatch]);

  const userItems = useSelector((state) => state.Recent.Recent);
  const accountLinks = [
    {
      text: "Account Information",
      url: "/account/user-information",
      icon: "icon-user",
    },
    {
      text: "My product",
      url: "/account/favProduct/Favourite",
      icon: "icon-papers",
    },
    {
      text: "Recent Viewed Product",
      url: "/account/recent-viewed-product",
      active: true,
      icon: "icon-store",
    },
    {
      text: "Wishlist",
      url: "/account/wishlist",
      icon: "icon-heart",
    },
  ];
  return (
    <section className="ps-my-account ps-page--account">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="ps-section__left">
              <aside className="ps-widget--account-dashboard">
                <div className="ps-widget__header">
                  <img src="/static/img/users/3.jpg" />
                  <figure>
                    <figcaption>Hello</figcaption>
                    <p>username@gmail.com</p>
                  </figure>
                </div>
                <div className="ps-widget__content">
                  <ul>
                    {accountLinks.map((link) => (
                      <li
                        key={link.text}
                        className={link.active ? "active" : ""}
                      >
                        <Link to={link.url}>
                          <i className={link.icon}></i>
                          {link.text}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/account/my-account">
                        <i className="icon-power-switch"></i>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>

          <div dir={lang == "en" ? "ar" : "en"} className="col-lg-8">
            <section className="ps-section--account-setting">
              <div className="ps-section__header">
                <h3>{t("RecentViewedItems")}</h3>
              </div>
              <div className="ps-section__content">
                {userItems?.data?.items?.length > 0 ? (
                  <div className="row">
                    {userItems?.data?.items.map((viewItem) => {
                      return (
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
                          <Product product={viewItem} />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className=" d-flex justify-content-center align-items-center">
                    <img
                      src={Imgg}
                      width="300px"
                      height="300px"
                      alt="Renttoo"
                    />
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentViewedProducts;

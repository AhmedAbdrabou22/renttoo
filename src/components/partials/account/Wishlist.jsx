import React, { Component, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import useEcomerce from "../../../hooks/useEcomerce";
import ProductCart from "../../../components/elements/products/ProductCart";
import Product from "../../../components/elements/products/Product";
import ProductFav from "./ProductFav";
import { GetMyFavouriteItems } from "../../../store/favourite/action";
import { useTranslation } from "react-i18next";
import PageContainer from "../../layouts/PageContainer";
import { Link } from "react-router-dom";
import Imgg from "../../../static/img/users/Animation - 1716196066837.gif";

const Wishlist = () => {
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation();
  const lang = i18n.language;
  const getFavsItems = async () => {
    try {
      await dispatch(GetMyFavouriteItems());
    } catch (e) {
    } finally {
    }
  };

  useEffect(() => {
    getFavsItems();
  }, []);

  const favsItems = useSelector((state) => state.favsItems.Facourites);

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
      icon: "icon-store",
    },
    {
      text: "Wishlist",
      active: true,
      url: "/account/WishlistPage",
      icon: "icon-heart",
    },
  ];

  console.log(favsItems);
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
                <h3>{t("wishList")}</h3>
              </div>
              <div className="ps-section__content">
                {favsItems?.data?.items?.length > 0 ? (
                  favsItems?.data?.items && (
                    <>
                      <div className="row">
                        {favsItems?.data?.items.map((item) => {
                          return (
                            <div className="col-lg-3 col-sm-12 col-md-6">
                              <Product product={item} key={item} />
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )
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

export default Wishlist;

import React, { useState } from "react";
import { Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  GetMyFavouriteItems,
  PostNewFavourite,
} from "../../../store/favourite/action";
import "react-rater/lib/react-rater.css";
import useProduct from "../../../hooks/useProduct";
import { useNavigate } from "react-router-dom";
import { RiWhatsappFill } from "react-icons/ri";
import { Rating } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TbTruckDelivery } from "react-icons/tb";
import { GetSingleProduct } from "../../../store/products/action";

const Product = ({ product, features }) => {
  const [t, i18n] = useTranslation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [isFavorite, setIsFavorite] = useState(product.i_love_it === 1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCloseContact = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const productDetails = useSelector(
    (state) => state.singleProduct.SingleProduct
  );

  const redirectToProductDetails = async (id) => {
    if (!features) {
      try {
        await dispatch(
          GetSingleProduct({
            id: id,
            lang: i18n.language,
          })
        );

        if (productDetails?.data) {
          const cayegory = productDetails.data?.item?.sub_category;

          navigate(
            `/${cayegory?.category?.name.replace(/\s+/g, "_")}/${cayegory?.name.replace(/\s+/g, "_")}/${productDetails?.data?.item?.name.replace(/\s+/g, "_")}/${product.id}`
          );
        }
      } catch (e) {
        // Handle error
      }
    }
  };
  const postNewFavorite = async (e) => {
    if (typeof window !== "undefined" && localStorage.getItem("user")) {
      e.preventDefault();
      setLoading(true);
      setIsFavorite(!isFavorite);
      try {
        await dispatch(PostNewFavourite({ id: product.id }));
      } catch (e) {
        console.error(e);
        setIsFavorite(!isFavorite);
      } finally {
        setLoading(false);
        await dispatch(GetMyFavouriteItems());
      }
    } else {
      dialogOpen();
    }
  };
  const handleDelete = (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  // Call useProduct hook outside of conditional statement
  const { thumbnailImage, price, badge, title, name, rate, rate_count } =
    useProduct();

  if (!product) {
    return <Skeleton />;
  }

  const trimString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    }
    return str;
  };
  const dialog = document.getElementById("dialog");
  const cancelButton = document.getElementById("cancel");

  const dialogOpen = () => {
    console.log("open");
    dialog.showModal();
  };
  const dialogClose = () => {
    dialog.close();
  };

  const style = {
    ...(features && {
      border: "1px solid #bfbfbf",
      marginBottom: "30px",
      padding: "20px 10px",
      textAlign: "center",
      transition: "all .4s ease",
      width: "100%",
      direction: i18n.language === "ar" ? "ltr" : "rtl",
    }),
    ...(!features && {
      paddingLeft: "12px",
      paddingRight: "12px",
      direction: i18n.language === "ar" ? "ltr" : "rtl",
    }),
  };

  return (
    <>
      <div className="ps-product" style={style}>
        <div className="ps-product__thumbnail">
          {!features && (
            <div className="product-image">
              <div
                onClick={postNewFavorite}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "5px",
                  cursor: "pointer",
                  zIndex: 10,
                }}
              >
                <input
                  value="favorite-button"
                  name="favorite-checkbox"
                  id="favorite"
                  checked={isFavorite} // Set the checked state dynamically
                  type="checkbox"
                />
                <label class="Favcontainer action" for="favorite">
                  <svg
                    class="feather feather-heart"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </label>
              </div>
            </div>
          )}
          <div
            onClick={() => {
              redirectToProductDetails(product.id);
            }}
          >
            <a>{thumbnailImage(product)}</a>
          </div>
          {badge(product)}
        </div>
        {!features ? (
          <div
            className="ps-product__container"
            style={{ textAlign: i18n.language === "en" ? "right" : "left" }}
          >
            <div
              onClick={() => {
                redirectToProductDetails(product.id);
              }}
            >
              {trimString(product.name, 15)} {/* Adjust maxLength as needed */}
            </div>
            <a className="ps-product__vendor"></a>
            <div>
              <Rating name="read-only" value={product.rate} readOnly />
              <div className="d-flex justify-content-between">
                <span>
                  {product.rental_price_per_day}
                  {t("EGP")} / {t("PerDay")}
                </span>
                <div
                  onClick={() => {
                    redirectToProductDetails(product.id);
                  }}
                >
                  {" "}
                  {product.free_delivery == 1 ? (
                    <TbTruckDelivery size={"25px"} color="green" />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="ps-product__container "
            style={{
              display: "grid",
              justifyContent: "center",
              textAlign: i18n.language === "en" ? "right" : "left",
            }}
          >
            <div
              onClick={() => {
                redirectToProductDetails(product.id);
              }}
            >
              {trimString(product.name, 15)} {/* Adjust maxLength as needed */}
            </div>
          </div>
        )}
        <dialog id="dialog" className="p-6">
          <h2>Hello.</h2>
          {typeof window !== "undefined" && localStorage.getItem("user") ? (
            <>
              <div
                className="d-flex justify-content-between p-5"
                style={{
                  flexDirection: "row-reverse",
                }}
              >
                <p>
                  {t("ContactName")} : {product?.data?.item}
                </p>
                <p>
                  <a
                    href={`https://wa.me/${product?.data?.item?.owner_phone}`}
                    target="_blank"
                  >
                    <RiWhatsappFill size={"30px"} color="green" />
                  </a>
                </p>
              </div>
            </>
          ) : (
            <>
              <h8> {t("Register")}</h8>
              <div
                className="d-flex justify-content-around p-5"
                style={{ gap: "2rem" }}
              >
                <button
                  className="ps-btn p-3"
                  onClick={() => navigate("/account/login")}
                >
                  {t("Login")}
                </button>
                <button
                  className="ps-btn p-3"
                  onClick={() => navigate("/account/register")}
                >
                  {t("Register")}
                </button>
              </div>
            </>
          )}
          <button
            id="cancel"
            aria-label="close"
            class="x"
            onClick={() => dialogClose()}
          >
            ❌
          </button>
        </dialog>
      </div>
    </>
  );
};

export default Product;

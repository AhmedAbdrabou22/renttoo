import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Rating } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { GetUserItems } from "../../../../store/userItems/actions";
import { DeleteItem } from "../../../../store/addItems/action";
import { AddNewRate } from "../../../../store/rate/action";

import { RiWhatsappFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Rate } from "antd";
const ModuleDetailTopInformation = ({ product }) => {
  let user = {};
  if (typeof window !== "undefined" && localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  }

  const navigate = useNavigate();
  const [t, i18n] = useTranslation();
  const textAlign = i18n.language === "ar" ? "left" : "right";
  const dispatch = useDispatch();
  const [rate, setRate] = useState("");

  // Views
  let priceView;

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const dialog = document.getElementById("dialog");
  const dialogRating = document.getElementById("dialogRating");
  const cancelButton = document.getElementById("cancel");

  const dialogRatingOpen = () => {
    console.log("open");
    dialogRating.showModal();
  };
  const dialogRatingClose = () => {
    dialogRating.close();
  };

  const dialogOpen = () => {
    console.log("open");
    dialog.showModal();
  };
  const dialogClose = () => {
    dialog.close();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelteing = () => {
    DeletePro();
    setOpen(false);
  };
  const DeletePro = async () => {
    try {
      await dispatch(DeleteItem(deleteId));
    } catch (e) {
      console.error(e);
    } finally {
      await dispatch(GetUserItems());
      navigate("/account/favProduct/Favourite");
    }
  };

  const handleRate = async (e) => {
    setRate(parseInt(e));
    try {
      await dispatch(
        AddNewRate({
          item_id: product?.data?.item?.id,
          rate: parseInt(e),
        })
      );
    } catch (e) {
      console.log(e);
    } finally {
      dialogRatingClose();
    }
  };

  if (product && product.data && product?.data?.item) {
    priceView = (
      <div className="mr-2">
        <h1 className="cairo text-left" style={{ textAlign }}>
          {t("rental")} :{" "}
        </h1>
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ textAlign: "left" }}>
            <p>{product?.data?.item?.rental_price_per_day}LE Per Day</p>
          </div>
          <p>{product?.data?.item?.rental_price_per_week}LE Per Week</p>
          <p>{product?.data?.item?.rental_price_per_month}LE Per Month</p>
        </div>
      </div>
    );
  } else {
    priceView = (
      <h4 className="ps-product__price">${product.rental_price_per_day}</h4>
    );
  }
  const handleDelete = (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  return (
    <header style={{ textAlign }}>
      {product && product.data && product?.data?.item ? (
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1>{product?.data?.item?.name}</h1>
          </div>

          {product?.data?.item?.user_id === user?.id ? (
            <div>
              <div className="d-flex flex-wrap justify-contnet-center align-items-center">
                <Button
                  className="m-2"
                  variant="contained"
                  onClick={() => {
                    navigate(
                      `/account/addProduct/Id/${product?.data?.item?.id}`
                    );
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {t("edit")}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  className="m-2"
                  onClick={() => {
                    handleDelete(product?.data?.item?.id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {t("delete")}
                </Button>
                <button
                  onClick={() => dialogOpen()}
                  className=""
                  style={{
                    border: "none",
                    padding: "5px",
                    borderRadius: "5px",
                    fontSize: "15px",
                    cursor: "pointer",
                  }}
                >
                  {t("contact")}
                </button>
              </div>
            </div>
          ) : (
            <button className="ps-btn cairo p-3" onClick={() => dialogOpen()}>
              {t("contact")} <i className="icon-telephone"></i>{" "}
            </button>
          )}
        </div>
      ) : null}
      <div className="ps-product__meta" style={{gap:'1rem'}}>
        <p>
          {product?.data?.item?.user_id != user?.id ? (
            <Link
              to={`/account/UserProfile/${product?.data?.item?.user_id}`}
              key={product.id}
            >
              <a>{product?.data?.item?.owner_name}</a>
            </Link>
          ) : typeof window !== "undefined" && localStorage.getItem("user") ? (
            <Link
              to={`/account/favProduct/Favourite/${product?.data?.item?.id}`}
              key={product.id}
            >
              <a>{product?.data?.item?.owner_name}</a>
            </Link>
          ) : (
            <a style={{ cursor: "pointer" }} onClick={() => dialogOpen()}>
              {product?.data?.item?.owner_name}
            </a>
          )}
        </p>
        <Rating value={product?.data?.item?.rates} size="20px" readOnly />
        {""} ( {product?.data?.item?.rate_count} {""} {t('reviews')} )
        <Button
          variant="outlined"
          color={"warning"}
          className="mx-2"
          onClick={dialogRatingOpen}
        >
{t('RateNow')}        </Button>
      </div>

      <dialog id="dialogRating">
        <h2>{t('RateNow')}</h2>

        <>
          <h5>{t('Youcannowratethisitem')}</h5>
          <div
            className="d-flex justify-content-center"
            style={{
              flexDirection: "row",
            }}
          >
            <Rate onChange={handleRate} />
          </div>
        </>

        <button
          id="cancel"
          aria-label="close"
          class="x"
          onClick={() => dialogRatingClose()}
        >
          ❌
        </button>
      </dialog>
      <dialog id="dialog">
        <h2>{t('greeting')} {user.f_name}</h2>
        {typeof window !== "undefined" && localStorage.getItem("user") ? (
          <>
            <h5>
            {t('Youcancontact')}{" "}
              <span style={{ color: "#890b0b" }}>
                {product?.data?.item?.owner_name}
              </span>
            </h5>
            <div
              className="d-flex justify-content-center"
              style={{
                flexDirection: "row",
              }}
            >
              <a
                href={`https://wa.me/${product?.data?.item?.owner_phone}`}
                target="_blank"
                className="mx-3 "
              >
                <RiWhatsappFill size={"20px"} color="green" />
              </a>
              <h5 className="mt-1">{product?.data?.item?.owner_phone}</h5>
            </div>
          </>
        ) : (
          <>
            <h8>{t('YouneedtohaveanaccountFirst')}</h8>
            <div
              className="d-flex justify-content-around p-5"
              style={{ gap: "2rem" }}
            >
              <button className="ps-btn p-3">{t('Login')}</button>
              <button className="ps-btn p-3">{t('Register')}</button>
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
      <div className="rent">
        {product && product.data && product?.data?.item ? (
          <div className="mr-2">
            <h4>
              <a href="shop-default.html">
                <strong>{t("rental")} :</strong>
              </a>
            </h4>

            <div
              className="ps-block--site-features ps-block--site-features-2 "
              style={{ padding: "0px", justifyContent: "start" }}
            >
              <div className="ps-block__item" style={{ maxWidth: "33%" }}>
                <div className="ps-block__right">
                  <h4> {product?.data?.item?.rental_price_per_day} {t('EGP')}</h4>
                  <span>{t('Peryear')}</span>
                </div>
              </div>

              <div className="ps-block__item" style={{ maxWidth: "33%" }}>
                <div className="ps-block__right">
                  <h4>{product?.data?.item?.rental_price_per_week} {t('EGP')}</h4>
                  <span>{t('PerDay')}</span>
                </div>
              </div>
              <div className="ps-block__item" style={{ maxWidth: "33%" }}>
                <div className="ps-block__right">
                  <h4>{product?.data?.item?.rental_price_per_month} {t('EGP')}</h4>
                  <span>{t('Permonth')}</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {/* Dialog For Delete Item */}
      <Dialog
        // Set the maximum width of the dialog to small
        PaperProps={{ style: { minHeight: "100px" } }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ fontWeight: "bold" }}>
          {/* Apply bold style to the title */}
          Are You Sure You Want To delete this item ?
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button
            onClick={handleDelteing}
            style={{ fontSize: "20px" }}
            className="cairo"
          >
            {t("delete")}
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            style={{ fontSize: "20px" }}
            className="cairo"
          >
            {t("close")}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog For Contact */}

      {/* Dialog For Contact */}
    </header>
  );
};

export default ModuleDetailTopInformation;

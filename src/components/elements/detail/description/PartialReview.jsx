import React, { useEffect, useState } from "react";
import { Rate } from "antd";
import { useDispatch } from "react-redux";
// import { AddComment } from '~/store/comments/action';
import { AddComment } from "../../../../store/comments/action";
import { GetSingleProduct } from "../../../../store/products/action";
import { AddNewRate } from "../../../../store/rate/action";
import { useTranslation } from "react-i18next";
const PartialReview = ({ product }) => {
  const [t, i18n] = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState("");

  // Handle Rate
  const handleRate = (e) => {
    setRate(parseInt(e));
  };

  // Add Comment Api
  const addComment = async (e, id) => {
    setLoading(true);
    e.preventDefault();
    try {
      await dispatch(
        AddComment({
          comment: comment,
          id,
        })
      );
      if (rate !== "") {
        addRate();
      }
    } catch (e) {
    } finally {
      setLoading(false);
      await dispatch(
        GetSingleProduct({
          id,
          lang: i18n.language,
        })
      );
      setComment("");
      setRate(0);
    }
  };

  // Add Rate Api
  const addRate = async (id) => {
    setLoading(true);
    try {
      await dispatch(
        AddNewRate({
          item_id: product.data.item.id,
          rate: rate,
        })
      );
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {product && product.data && product.data.item ? (
        <div className="row">
          <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 ">
            <div className="ps-block--average-rating">
              <div className="">
                <h3 style={{ fontSize: "35px", color: "#690" }}>
                  {product.data.item.rates}
                </h3>
                <Rate defaultValue={product.data.item.rate_count} disabled />

                <br />

                <span>{product.data.item.viewers_count} View</span>
              </div>
            </div>
          </div>
          <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 ">
            <form className="ps-form--review">
              <h4>{t("submitReview")}</h4>
              {/* Rate */}
              <Rate
                defaultValue={product.data.item.rate_count}
                onChange={handleRate}
              />
              <div className="form-group">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="form-control"
                  rows="6"
                  placeholder="Write your review here"
                ></textarea>
              </div>
              <div className="form-group submit">
                <button
                  className="ps-btn"
                  onClick={(e) => addComment(e, product.data.item.id)}
                >
                  {t("pushComment")}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PartialReview;

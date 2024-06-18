import React from "react";
import LazyLoad from "react-lazyload";
// import { formatCurrency } from '../utilities/product-helper';
import { formatCurrency } from "../utilities/product-helper";

function getImageURL(source, size) {
  let image, imageURL;
  if (source.image) {
    // Use source.image if available
    image = source.image;
  } else if (source.images && source.images.length > 0) {
    // Use the first image from source.images if available
    image = source.images[0].image;
  }
  return image;
}

function getImageURLArr(source) {
  let image, imageURL;
  if (source) {
    image = source.images[0]?.image;
  }
  return image;
}

export default function useProduct() {
  return {
    thumbnailImage: (payload) => {
      if (payload) {
        if (payload.image || payload.images) {
          return (
            <>
              <LazyLoad>
                <img
                  src={getImageURL(payload)}
                  alt={getImageURL(payload)}
                  height="150px"
                />
              </LazyLoad>
            </>
          );
        }
      }
    },
    price: (payload) => {
      let view;
      if (payload.sale_price) {
        view = (
          <p className="ps-product__price sale">
            <span>EGP</span>
            {formatCurrency(payload.sale_price)}
            <del className="ml-2">
              <span>EGP </span>
              {formatCurrency(payload.rental_price_per_day)}
            </del>
          </p>
        );
      } else {
        view = (
          <p className="ps-product__price">
            <span>EGP</span>
            {formatCurrency(payload.rental_price_per_day)}
          </p>
        );
      }
      return view;
    },
    badges: (payload) => {
      let view = null;
      if (payload.badges && payload.badges.length > 0) {
        const items = payload.badges.map((item) => {
          if (item.value === "hot") {
            return (
              <span className="ps-product__badge hot" key={item.id}>
                Hot
              </span>
            );
          }
          if (item.value === "new") {
            return (
              <span className="ps-product__badge new" key={item.id}>
                New
              </span>
            );
          }
          if (item.value === "sale") {
            return (
              <span className="ps-product__badge sale" key={item.id}>
                Sale
              </span>
            );
          }
        });
        view = <div className="ps-product__badges">{items}</div>;
      }
      return view;
    },
    badge: (payload) => {
      let view;
      if (payload.badge && payload.badge !== null) {
        view = payload.badge.map((badge) => {
          if (badge.type === "sale") {
            return <div className="ps-product__badge">{badge.value}</div>;
          } else if (badge.type === "outStock") {
            return (
              <div className="ps-product__badge out-stock">{badge.value}</div>
            );
          } else {
            return <div className="ps-product__badge hot">{badge.value}</div>;
          }
        });
      }
      if (payload.sale_price) {
        const discountPercent = (
          ((payload.price - payload.sale_price) / payload.sale_price) *
          100
        ).toFixed(0);
        return <div className="ps-product__badge">-{discountPercent}%</div>;
      }
      return view;
    },
    brand: (payload) => {
      let view;
      if (payload.brands && payload.brands.length > 0) {
        view = (
          <a href="/shop">
            <a className="text-capitalize">{payload.brands[0].name}</a>
          </a>
        );
      } else {
        view = (
          <a href="/shop">
            <a className="text-capitalize">No Brand</a>
          </a>
        );
      }
      return view;
    },
    title: (payload) => {
      let view = (
        <a href={`/product/${payload.id}`} as={`/product/${payload.id}`}>
          <a className="ps-product__title">{payload.description}</a>
        </a>
      );
      return view;
    },
  };
}

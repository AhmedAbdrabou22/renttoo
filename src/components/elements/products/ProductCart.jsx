import React from "react";

const ProductCart = ({ product }) => {
  const { thumbnailImage, title } = product;
  return (
    <div className="ps-product--cart">
      <div className="ps-product__thumbnail"></div>
      {/* <div className="ps-product__content">{title(product)}</div> */}
    </div>
  );
};

export default ProductCart;

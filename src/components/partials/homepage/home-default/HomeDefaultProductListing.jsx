import React, { useEffect, useState } from "react";
import SkeletonProduct from "../../../../components/elements/skeletons/SkeletonProduct";
// import { generateTempArray } from '~/utilities/common-helpers';
import { generateTempArray } from "../../../../utilities/common-helpers";
// import { ProductGroupWithCarousel } from '~/components/partials/product/ProductGroupWithCarousel';
import { ProductGroupWithCarousel } from "../../../../components/partials/product/ProductGroupWithCarousel";
// import useGetProducts from '~/hooks/useGetProducts';
// import { useSyncExternalStore } from 'react';
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const HomeDefaultProductListing = ({ categoryId, collectionSlug, title }) => {
  const [productItems, getProductsByCollection] = useState(collectionSlug);
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(false);

  let productItemsView;
  if (!loading) {
    if (productItems && productItems.length > 0) {
      productItemsView = (
        <ProductGroupWithCarousel products={productItems} type="normal" />
      );
    } else {
      productItemsView = <p>No product(s) found.</p>;
    }
  } else {
    const skeletons = generateTempArray(6).map((item) => (
      <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
        <SkeletonProduct />
      </div>
    ));
    productItemsView = <div className="row">{skeletons}</div>;
  }

  const categoryName = categoryId.name.replace(/\s+/g, "_");
  return (
    <div className="ps-product-list " style={{ paddingBottom: "30px" }}>
      <div className="ps-container">
        <div className="ps-section__header">
          <h3>
            {t("mostPopular")} {title}
          </h3>
          <ul className="ps-section__links">
            <li>
              <a href={`/category/${categoryName}/${categoryId.id}`}>
                <a>{t("viewAll")}</a>
              </a>
            </li>
          </ul>
        </div>

        <div style={{ paddingTop: "30px" }}>{productItemsView}</div>
      </div>
    </div>
  );
};

export default HomeDefaultProductListing;

import React, { useEffect, useState } from "react";
import SkeletonProductDetail from "../../components/elements/skeletons/SkeletonProductDetail";
import BreadCrumb from "../../components/elements/BreadCrumb";
import ProductWidgets from "../../components/partials/product/ProductWidgets";
import ProductDetailFullwidth from "../../components/elements/detail/ProductDetailFullwidth";
import HeaderProduct from "../../components/shared/headers/HeaderProduct";
import HeaderDefault from "../../components/shared/headers/HeaderDefault";
import PageContainer from "../../components/layouts/PageContainer";
import Newletters from "../../components/partials/commons/Newletters";
import HeaderMobileProduct from "../../components/shared/header-mobile/HeaderMobileProduct";
import { useDispatch, useSelector } from "react-redux";
// import { GetSingleProduct } from '~/store/products/action';
import { GetSingleProduct } from "../../store/products/action";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const ProductDefaultPage = () => {
  const [t, i18n] = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  //To Get Details Of Product
  const getSingleProductDetails = async (id) => {
    try {
      await dispatch(
        GetSingleProduct({
          id: id,
          lang: i18n.language,
        })
      );
    } catch (e) {
    } finally {
     

    }
  };
  useEffect(() => {
    getSingleProductDetails(id);
  }, [id]);
  
  const productDetails = useSelector(
    (state) => state.singleProduct.SingleProduct
  );
  console.log(productDetails.data?.item?.sub_category?.category?.name) 

  // Views
  let productView, headerView;
  if (!loading) {
    if (productDetails) {
      productView = <ProductDetailFullwidth product={productDetails} />;
      headerView = (
        <>
          <HeaderProduct product={productDetails} />
          <HeaderMobileProduct />
        </>
      );
    } else {
      headerView = (
        <>
          <HeaderDefault />
          <HeaderMobileProduct />
        </>
      );
    }
  } else {
    productView = <SkeletonProductDetail />;
  }

  const breadCrumb = [
    {
      text: t("home"),
      url: "/",
    },
    {
      text: productDetails?.data?.item?.name,
    },
  ];

  return (
    <PageContainer header={headerView} title={productDetails?.data?.item?.name}>
      <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
      <div className="ps-page--product">
        <div className="ps-container">
          <div className="ps-page__container">
            <div className="ps-page__left">{productView}</div>
            <div className="ps-page__right">
              {/* Products Has Same sub Category Id */}
              <ProductWidgets
                subCategoryId={productDetails?.data?.item?.sub_category_id}
              />
            </div>
          </div>
        </div>
      </div>
      <Newletters />
    </PageContainer>
  );
};

export default ProductDefaultPage;

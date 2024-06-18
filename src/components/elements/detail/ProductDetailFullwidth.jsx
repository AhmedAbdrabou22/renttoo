import React from "react";
import ThumbnailDefault from "../../../components/elements/detail/thumbnail/ThumbnailDefault";
import DefaultDescription from "../../../components/elements/detail/description/DefaultDescription";
import ModuleDetailTopInformation from "../../../components/elements/detail/modules/ModuleDetailTopInformation";
import { Tabs } from "antd";
import PartialDescription from "../../../components/elements/detail/description/PartialDescription";
import PartialSpecification from "../../../components/elements/detail/description/PartialSpecification";
import { useTranslation } from "react-i18next";
import ModuleProductDetailDescription from './modules/ModuleProductDetailDescription';
import { TbTruckDelivery } from 'react-icons/tb';

// import Comments from './Comments';
const { TabPane } = Tabs;

const ProductDetailFullwidth = ({ product }) => {
  const [t, i18n] = useTranslation();
  const textAlign = i18n.language === "ar" ? "left" : "right";
  return (
    <div className="ps-product--detail ps-product--fullwidth">
      <div
        className="ps-product__header"
        style={{ textAlign: textAlign, minHeight: "460px" }}
      >
        <ThumbnailDefault product={product} />
        <div className="ps-product__info mx-5">
          <ModuleDetailTopInformation product={product} />

          {/* <Tabs defaultActiveKey="1">
            <TabPane tab={t("Description")} key="1">
              <PartialDescription product={product} />
            </TabPane>
            {/* <TabPane tab={t("owner")} key="2">
              <PartialSpecification product={product} />
            </TabPane> 
          </Tabs> */}
      <div className="ps-product__meta mt-5">
</div>
<div style={{textAlign}}>
            <div className="ps-document">
                <div className="d-flex justify-content-between align-items-center">
                    <div className='description-container' style={{width: "60%",textAlign:textAlign}}>
                      

{product && product.data && product.data.item ? (
                       
                       <div className='description-container' style={{width: "60%",textAlign:textAlign}}>
                 <span className="cairo"> {t("Description")}: </span>
                 {product.data.item.description}          
                 </div>  
               ) : null}
                    </div>
                    
                    <div>
                        {product && product?.data && product?.data?.item && product?.data?.item?.free_delivery === 1 ? (
                            <span>{t("freeDelivery")} <TbTruckDelivery size={'25px'} color="green" /> </span>
                        ) : (
                            <span>{t("abilityDelivery")} <TbTruckDelivery size={'25px'} color="black" /></span>
                        )}
                    </div>
                </div>
                <ModuleProductDetailDescription product={product} />
            </div>
        </div>
        </div>
      </div>

      <DefaultDescription product={product} />
    </div>
  );
};

export default ProductDetailFullwidth;

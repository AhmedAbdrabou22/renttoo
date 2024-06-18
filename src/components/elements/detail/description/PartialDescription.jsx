import React from 'react';
import ModuleProductDetailDescription from '../modules/ModuleProductDetailDescription';
import { TbTruckDelivery } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';

const PartialDescription = ({ product }) => {
    const [t , i18n] = useTranslation();
    const textAlign = i18n.language === 'ar' ? 'right' : 'left';

    return (
        <div style={{textAlign}}>
            <div className="ps-document">
                <div className="d-flex justify-content-between align-items-center">
                    <div className='description-container' style={{width: "60%" , textAlign:textAlign}}>
                        {product && product.data && product.data.item ? (
                            <div>{product.data.item.description}</div>
                        ) : null}
                    </div>
                    <div>
                        {product && product.data && product.data.item && product.data.item.free_delivery === 1 ? (
                            <span>{t("freeDelivery")} <TbTruckDelivery size={'25px'} color="green" /> </span>
                        ) : (
                            <span>{t("abilityDelivery")} <TbTruckDelivery size={'25px'} color="black" /></span>
                        )}
                    </div>
                </div>
                <ModuleProductDetailDescription product={product} />
            </div>
        </div>
    );
};

export default PartialDescription;

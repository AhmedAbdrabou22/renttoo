import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../../../components/elements/products/Product';
import SkeletonProduct from '../../../components/elements/skeletons/SkeletonProduct';
import { GetSubCategoryItems } from '../../../store/categories/action';

const WidgetProductSameBrands = ({ collectionSlug, subCategoryId }) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const[t , i18n] = useTranslation();

    const getProducts = async () => {
        setLoading(true);
        try {
            await dispatch(GetSubCategoryItems({ id: subCategoryId }));
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, [dispatch, subCategoryId]);

    const relatedProducts = useSelector((state) => state.categories.SubCategoriesItems);

    // Ensure relatedProducts is loaded and then slice to get the first two items
    const productItemsView = loading
        ? Array(2).fill(<SkeletonProduct />)
        : relatedProducts?.data?.items?.items_data?.data.slice(0, 2).map((item) => (
            <Product product={item} key={item.id} />
        ));

        const textAlign = i18n.language === "ar" ? "left" : "right";

    return (
        <aside className="widget widget_same-brand">
            <h3 style={{textAlign}}>{t('relatedProducts')}</h3>
            <div className="widget__content">{productItemsView}</div>
        </aside>
    );
};

export default WidgetProductSameBrands;

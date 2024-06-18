import React from 'react';
// import WidgetProductSameBrands from '~/components/shared/widgets/WidgetProductSameBrands';
import WidgetProductSameBrands from '../../../components/shared/widgets/WidgetProductSameBrands';

const ProductWidgets = ({subCategoryId}) => {
    return (
        <section>
            <WidgetProductSameBrands collectionSlug="shop-same-brand" subCategoryId={subCategoryId}/>
        </section>
    );
};

export default ProductWidgets;

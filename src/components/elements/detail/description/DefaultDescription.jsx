import React from 'react';
import { Tabs } from 'antd';
// import PartialReview from '~/components/elements/detail/description/PartialReview';
import PartialReview from '../../../../components/elements/detail/description/PartialReview';
import Comments from './Comments';
import { useTranslation } from 'react-i18next';

const { TabPane } = Tabs;

const DefaultDescription = ({product}) => {
    const [t , i18n] = useTranslation()
    const isArabic = i18n.language === 'ar';
    return (
        <div className={`ps-product__content ps-tab-root ${isArabic ? 'tabs-arabic' : ''}`}>
        <Tabs defaultActiveKey="1">
       
            <TabPane tab={t('comments')} key="4">
                <Comments product={product} />
            </TabPane>
        </Tabs>
    </div>
    );
};

export default DefaultDescription;

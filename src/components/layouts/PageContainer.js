import React from 'react';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';
import HeaderDefault from '../shared/headers/HeaderDefault';
import { Helmet } from 'react-helmet';

const initHeaders = (
    <>
        <HeaderDefault />
        <HeaderMobile />
    </>
);
const initFooters = (
    <>
        <FooterFullwidth />
    </>
);

const PageContainer = ({
    header = initHeaders,
    footer = initFooters,
    children,
    title = 'Page',
}) => {
    let titleView;

    if (title !== '') {
        titleView = "Renttoo" + ' | ' + title;
    } else {
        titleView = "Renttoo" + ' | ' + "Renttoo";
    }

    return (
        <>
            <Helmet>
                <title>{titleView}</title>
                <meta property="og:title" content="Rentto" />
                <meta property="og:description" content="مع رينتو اجر اللي نفسك فيه بامان" />
                <meta property="og:image" content='../../static/img/logo.png' />
                <meta property="og:url" content='https://renttoo.com/' />
                <meta property="og:type" content="website" />
            </Helmet>
            {header}
            {children}
            {footer}
        </>
    );
};

export default PageContainer;

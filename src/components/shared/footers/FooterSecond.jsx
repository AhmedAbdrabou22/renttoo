import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const FooterSecond = ({ classes }) => {
    const { t, i18n } = useTranslation();

    return (
        <footer className={`ps-footer ps-footer--2 ${classes}`}>
            <div className="container">
                <div className="ps-footer__content">
                    <div className="row">
                        <div className="col-xl-8">
                            <div className="row">
                                <div className="col-md-12 col-lg-6 col-sm-6">
                                    <aside className="widget widget_footer">
                                        <h4 className="widget-title">
                                            {t('Quicklinks')}
                                        </h4>
                                        <ul className="ps-list--link">
                                            <li>
                                                <Link href="/page/blank">
                                                    <a>{t('policy')}</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/page/blank">
                                                    <a>{t('termCondition')}</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/page/blank">
                                                    <a>{t('shipping')}</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/page/blank">
                                                    <a>{t('return')}</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/page/faqs">
                                                    <a>{t('faqs')}</a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </aside>
                                </div>
                                {/* Additional columns */}
                            </div>
                        </div>

                        <div className="col-xl-4 col-md-6">
                            <aside className="widget widget_newletters">
                                <h4 className="widget-title">Newsletter</h4>
                                <form
                                    className="ps-form--newletter"
                                    action="#"
                                    method="get">
                                    <div className="form-group--nest">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Email Address"
                                        />
                                        <button className="ps-btn">
                                            {t('subscribe')}
                                        </button>
                                    </div>
                                    {/* Social media links */}
                                </form>
                            </aside>
                        </div>
                    </div>
                </div>
                <div className="ps-footer__copyright">
                    <p>&copy;2021 Renttoo. All Rights Reserved</p>
                    <p>
                        <span>{t('safePayment')}</span>
                        <Link href="/page/blank">
                            <a>
                                <img
                                    src="/static/img/payment-method/1.jpg"
                                    alt="Renttoo"
                                />
                            </a>
                        </Link>
                        {/* Additional payment method images */}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default FooterSecond;

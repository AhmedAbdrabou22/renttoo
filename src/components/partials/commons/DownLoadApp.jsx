import React from 'react';
import app from '../../../static/img/app.png'
import Play from '../../../static/img/google-play.png'
import Store from '../../../static/img/app-store.png'
const DownloadApp = () => (
    <section className="ps-download-app">
        <div className="ps-container">
            <div className="ps-block--download-app">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ">
                            <div className="ps-block__thumbnail">
                                <img src={app} alt="Renttoo" />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ">
                            <div className="ps-block__content">
                                <p className="download-link">
                                    <a href="https://play.google.com/store/apps/details?id=com.renttoo.app">
                                        <img
                                            src={Play}
                                            alt="Renttoo"
                                        />
                                    </a>
                                    <a href="#">
                                        <img
                                            src={Store}
                                            alt="Renttoo"
                                        />
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default DownloadApp;

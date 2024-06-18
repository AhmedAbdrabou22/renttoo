import React from "react";
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import { Link } from "react-router-dom";
import NotFoundImage from '../../static/img/404.jpg'
const NotFound = () => {
  return (
    <div>
      <div className="site-content">
        <HeaderDefault />
        <div className="ps-page--404">
          <div className="container">
            <div className="ps-section__content">
              <figure>
                <img src={NotFoundImage} alt="" />
                <h3>Ohh! Page not found</h3>
                <p>
                  It seems we can't find what you're looking for. <br />
                  Go back to
                  <Link to="/">
                    <a> Homepage</a>
                  </Link>
                </p>
              </figure>
            </div>
          </div>
        </div>
        <FooterDefault />
      </div>
    </div>
  );
};

export default NotFound;

import React from 'react';
import LogoImage from "../../../static/img/logo.png"
const Logo = ({ type }) => {
    return (
        <a href={'/'}>
            <a className="ps-logo">
                <img src={LogoImage} style={{
                    width:"80px",
                    marginTop:"-20px"
                }} alt="" />
            </a>
        </a>
    );
};

export default Logo;

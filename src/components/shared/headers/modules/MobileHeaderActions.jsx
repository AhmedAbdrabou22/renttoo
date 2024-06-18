import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Link from 'next/link';
import AccountQuickLinksMobile from './AccountQuickLinksMobile';

const MobileHeaderActions = ({ auth, ecomerce }) => {
    
    return (
        <div className="navigation__right">

            { typeof window !== 'undefined' && localStorage.getItem('user')? (
                <AccountQuickLinksMobile />
            ) : (
                <div className="header__extra">
                    <a href="/account/login">
                        <i className="icon-user"></i>
                    </a>
                </div>
            )}
        </div>
    );
};

export default connect((state) => state)(MobileHeaderActions);

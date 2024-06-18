import React from 'react';
import { connect } from 'react-redux';

// import AccountQuickLinks from '~/components/shared/headers/modules/AccountQuickLinks';
import AccountQuickLinks from '../../../../components/shared/headers/modules/AccountQuickLinks';

const HeaderActions = ({ ecomerce, auth, favItems }) => {
    // const { compareItems, wishlistItems } = ecomerce;
    // views
    let headerAuthView;
    let isLoggedIn = false;
    let user = {};

    if (typeof window !== 'undefined' && localStorage.getItem('user')) {
        user = JSON.parse(localStorage.getItem('user'));
        isLoggedIn = true;
    }

    return (
        <div className="header__actions">
            <AccountQuickLinks favItems={favItems} />

            {/* <MiniCart /> */}
            {headerAuthView}
        </div>
    );
};

export default connect((state) => state)(HeaderActions);

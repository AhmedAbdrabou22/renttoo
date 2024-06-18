import React from 'react';
// import Link from 'next/link';
// import MegaMenu from '../../../components/elements/menu/MegaMenu';
import MegaMenu from '../../../components/elements/menu/MegaMenu';

const Menu = ({ source, className }) => {
    let menuView;
    if (source) {
        menuView = source.map((item) => {
            if (item.subcategories) {
                return <MegaMenu source={item} key={item.text} />;
            } else {
                return (
                    <li key={item.text}>
                        <a href={item.url}>
                            <a>
                                {item.icon && <i className={item.icon}></i>}
                                {item.text}
                            </a>
                        </a>
                    </li>
                );
            }
        });
    } else {
        menuView = (
            <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                    No menu item.
                </a>
            </li>
        );
    }
    return <ul className={className}>{menuView}</ul>;
};

export default Menu;

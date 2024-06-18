import React from 'react';
// import Link from 'next/link';

const MegaMenu = ({ source }) => {
    let megaContentView;

    if (source) {
        megaContentView = (
            <div className="mega-menu__column" key={source.name}>
                <h4>{source.name}</h4>
                <ul className="mega-menu__list">
                    {source.subcategories.map((subItem) => (
                        <li key={subItem.name}>
                            <a href={`/${source.name}/${subItem.id}`}>
                                <a>{subItem.name}</a>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    return (
        <li className="menu-item-has-children has-mega-menu">
            {/* <Link href={source.url !== '' ? source.url : '/'}> */}
            <a>
                {/* {source.icon && <i className={source.icon}></i>} */}
                {source.name}
            </a>
            {/* </Link> */}
            <div className="mega-menu">{megaContentView}</div>
        </li>
    );
};

export default MegaMenu;

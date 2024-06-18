import React, { useEffect } from 'react';
import MenuCategories from '../../../components/shared/headers/modules/MenuCategories';
import SearchHeader from '../../../components/shared/headers/modules/SearchHeader';
import HeaderActions from '../../../components/shared/headers/modules/HeaderActions';
import NavigationDefault from '../../../components/shared/navigation/NavigationDefault';
import ProductOnHeader from '../../../components/elements/products/ProductOnHeader';
import { stickyHeader } from '../../../utilities/common-helpers';
import Logo from '../../../components/elements/common/Logo';
import MenuCategoriesDropdown from '../menus/MenuCategoriesDropdown';
import { GetMyFavouriteItems } from '../../../store/favourite/action';
import { useDispatch, useSelector } from 'react-redux';

const HeaderProduct = ({ product }) => {
   useEffect(() => {
        window.addEventListener('scroll', stickyHeader);
        return () => {
            window.removeEventListener('scroll', stickyHeader);
        };
    }, []);
    const dispatch = useDispatch();

    const getFavouriteItems = async () => {
        try {
            await dispatch(GetMyFavouriteItems());
        } catch (e) {
        } finally {
        }
    };

    useEffect(() => {
        getFavouriteItems();
    }, [dispatch]);

    const favouriteItems = useSelector((state) => state.favsItems.Facourites);

    return (
        <header
            className="header header--1 header--product">
            <div className="header__top ">
                <div className="ps-container">
                <div className="header__left">
                        <Logo />
                        <div className="menu--product-categories">
                            <div className="menu__toggle">
                                <i className="icon-menu"></i>
                                <span> Shop by Department</span>
                            </div>
                            <div className="menu__content">
                                <MenuCategories />
                            </div>
                        </div>
                    </div>
                    <div className="header__center">
                        <SearchHeader />
                    </div>
                    <div className="header__right">
                        <HeaderActions favItems={favouriteItems} />
                    </div>
                </div>
            </div>
            <NavigationDefault />
            <nav className="navigation navigation--product">
                <div className="container">
                    <ProductOnHeader product={product} />
                </div>
            </nav>
        </header>
    );
};
export default HeaderProduct;

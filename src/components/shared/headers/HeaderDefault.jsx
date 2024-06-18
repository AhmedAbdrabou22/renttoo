import React, { useEffect } from 'react';
import Logo from '../../../components/elements/common/Logo';
import SearchHeader from '../../../components/shared/headers/modules/SearchHeader';
import NavigationDefault from '../../../components/shared/navigation/NavigationDefault';
import HeaderActions from '../../../components/shared/headers/modules/HeaderActions';
import { stickyHeader } from '../../../utilities/common-helpers';
import MenuCategoriesDropdown from '../../../components/shared/menus/MenuCategoriesDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { GetMyFavouriteItems } from '../../../store/favourite/action';

const HeaderDefault = () => {
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
            className="header header--1"
            data-sticky="true"
            id="headerSticky">
            <div className="header__top">
                <div className="ps-container">
                    <div className="header__left">
                        <Logo />
                        <MenuCategoriesDropdown />
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
        </header>
    );
};

export default HeaderDefault;

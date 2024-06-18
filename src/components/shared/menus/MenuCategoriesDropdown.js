import React, { useEffect, useState } from 'react';
// import Menu from '~/components/elements/menu/Menu';
import Menu from '../../../components/elements/menu/Menu';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllCategories } from '../../../store/categories/action';

const MenuCategoriesDropdown = () => {
    const [t, i18n] = useTranslation();
    const lang = i18n.language;
    const dispatch = useDispatch();
    const [loading, setLaoding] = useState(false);

    // Get ALL Categories Data
    const getCategories = async () => {
        try {
            setLaoding(true);
            await dispatch(GetAllCategories(i18n.language));
        } catch (e) {
            console.log(e);
        } finally {
            setLaoding(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, [dispatch]);

    const categories = useSelector((state) => state.categories.Categories);

    return (
        <div className="menu--product-categories">
            <div className="menu__toggle">
                <i
                    className="icon-menu"
                    style={{ paddingLeft: lang === 'ar' ? '0' : '10px' }}></i>
                <span className="cairo">{t('categories')}</span>
            </div>
            <div className="menu__content">
                {categories && categories.data ? (
                    <Menu
                        source={categories.data.categories}
                        className="menu--dropdown"
                    />
                ) : null}
            </div>
        </div>
    );
};

export default MenuCategoriesDropdown;

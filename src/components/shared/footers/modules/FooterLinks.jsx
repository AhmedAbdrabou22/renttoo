import React, { useEffect } from 'react';
// import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
// import { GetAllCategories } from '@/src/store/categories/action';
const FooterLinks = () => {
    // const dispatch = useDispatch();

    // const getCategory = async () => {
    //     try {
    //         await dispatch(GetAllCategories(i18n.language));
    //     } catch (e) {
    //     } finally {
    //     }
    // };

    // useEffect(() => {
    //     getCategory();
    // }, []);

    // const categories = useSelector((state) => state.categories.Categories);

    return (
        <div className="ps-footer__links">
            {/* {categories && categories.data && categories.data.categories
                ? categories.data.categories.map((category) => {
                      return (
                          <p>
                              <strong>
                                  <a href={`/shop/${category.id}`}>
                                      {category.name}
                                  </a>
                              </strong>
                              {category.subcategories.map((item) => (
                                  <a
                                      href={`/subcategory/${item.id}`}
                                      key={item.id}>
                                      <a>{item.name}</a>
                                  </a>
                              ))}
                          </p>
                      );
                  })
                : null} */}
            
        </div>
    );
};

export default FooterLinks;

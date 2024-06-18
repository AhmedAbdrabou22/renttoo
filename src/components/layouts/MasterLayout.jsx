import React, { useEffect } from "react";
import { BackTop } from "antd";
import { Provider, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import PageLoader from "../../components/elements/common/PageLoader";
// import NavigationList from '~/components/shared/navigation/NavigationList';
import NavigationList from "../../components/shared/navigation/NavigationList";
import store from "../../store/store";
import PageContainer from "./PageContainer";
const MasterLayout = ({ children }) => {
  // // const dispatch = useDispatch();
  // const [cookies] = useCookies(['cart', 'compare', 'wishlist']);

  // function initEcomerceValues() {
  //     if (cookies) {
  //         if (cookies.cart) {
  //             dispatch(setCartItems(cookies.cart));
  //         }
  //         if (cookies.wishlist) {
  //             dispatch(setWishlistTtems(cookies.wishlist));
  //         }
  //         if (cookies.compare) {
  //             dispatch(setCompareItems(cookies.compare));
  //         }
  //     }
  // }

  // useEffect(() => {
  //     initEcomerceValues();
  // }, []);

  return (
    <>
      <Provider store={store}>
        {children}
        <PageLoader />
        <NavigationList />
        <BackTop>
          <button className="ps-btn--backtop">
            <i className="icon-arrow-up" />
          </button>
        </BackTop>
      </Provider>
    </>
  );
};

export default MasterLayout;

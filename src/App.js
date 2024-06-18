import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home/HomePage";
import "../src/static/fonts/Linearicons/Font/demo-files/demo.css";
import "../src/static/fonts/font-awesome/css/font-awesome.min.css";
import "../src/static/css/bootstrap.min.css";
import "../src/static/css/slick.min.css";
import "../src/scss/style.scss";
import "../src/scss/home-default.scss";
import "../src/scss/market-place-1.scss";
import "../src/scss/market-place-2.scss";
import "../src/scss/market-place-3.scss";
import "../src/scss/market-place-4.scss";
import "../src/scss/electronic.scss";
import "../src/scss/furniture.scss";
import "../src/scss/organic.scss";
import "../src/scss/technology.scss";
import "../src/scss/autopart.scss";
// Import Ant Design styles

import "../src/scss/electronic.scss";
import Wishlist from "./components/partials/account/Wishlist";
import LoginPage from "./components/partials/account/loginPage";
import RegisterPage from "./components/partials/account/RegisterPage";
import ProductDefaultPage from "./components/ProductDetails/ProductDetails";
import ShopDefaultPage from "./components/Category/Category";
import AboutUsPage from "./components/partials/page/about-us/about-us";
import FaqsPage from "./components/partials/page/faqs";
import BlankPage from "./components/partials/page/BlankPage";
import Favourite from "./components/partials/account/favProduct/[index]";
import RecentViewedProductsPage from "./components/partials/account/recent-viewed-product";
import RecentViewedProducts from "./components/partials/account/RecentViewedProducts";
import MyAccountPage from "./components/partials/account/my-account";

import SubCategoryPage from "./components/Category/SubCategory";
import SearchPage from "./components/Search/Search";
import { useTranslation } from "react-i18next";
import "../src/Style.css";
import UserInformationPage from "./components/partials/account/user-information";
import "../src/static/css/Style.css";
import NotFound from "./components/Error/NotFound";
import AddProduct from "./components/partials/account/addProduct";
import DownloadApp from "./components/Download/DownloadApp";
import UserProfile from "./components/partials/account/UserProfile";
import WishlistPage from "./components/partials/account/WishListPage";
import { useEffect } from "react";
import SubCategory from "./components/Category/SubCategory";

function App() {
  const { i18n } = useTranslation();
  const storedLang = localStorage.getItem('lang');


  useEffect(() => {
    
    if (storedLang) {
      i18n.changeLanguage(storedLang);
    }
  }, [localStorage]); // Run only once on component mount

  const getDir = () => {
    if (typeof window !== "undefined" && storedLang === "en") {
      localStorage.setItem('lang', storedLang);


      return "rtl";
    } else {
      localStorage.setItem('lang', storedLang);


      return "ltr";
    }

  };

  return (
    <div className="App" dir={getDir()}>
      <BrowserRouter>
      <DownloadApp  />
        <Routes>
          <Route index element={<Home />} />
          <Route path={`/product/:id`} element={<ProductDefaultPage />} />
          <Route path={`/:category/:subCategory/:product/:id`} element={<ProductDefaultPage />} />

          <Route path={`/category/:name/:id`} element={<ShopDefaultPage />} />
          <Route path={`/:subcategory/:id`} element={<SubCategory />} />
          {/* <Route
            path={`/category/subcategory/:id`}
            element={<SubCategoryPage />}
          /> */}
          <Route
            path={`/category/:name/:id/:name/:id`}
            element={<SubCategoryPage />}
          />
          <Route path={`/page/faqs`} element={<FaqsPage />} />
          <Route path={`/page/blank`} element={<BlankPage />} />
          <Route path={`/page/about-us`} element={<AboutUsPage />} />
          <Route path={`/product/:id`} element={<ProductDefaultPage />} />
          <Route path={`account/UserProfile/:id`} element={<UserProfile />} />
          <Route path={`account/addProduct`} element={<AddProduct />} />
          <Route path={`/account/wishlist`} element={<WishlistPage />} />
          <Route path={`/account/login`} element={<LoginPage />} />
          <Route
            path={`/account/favProduct/Favourite/:id`}
            element={<Favourite />}
          />
          <Route path={`/account/register`} element={<RegisterPage />} />
          <Route
            path={`/account/user-information`}
            element={<UserInformationPage />}
          />
          <Route
            path={`/account/recent-viewed-product`}
            element={<RecentViewedProductsPage />}
          />
          <Route
            path={`/account/Recent-viewed-product`}
            element={<RecentViewedProducts />}
          />
          <Route path={`/account/my-account`} element={<MyAccountPage />} />
          <Route
            path={`/account/favProduct/Favourite`}
            element={<Favourite />}
          />
          <Route path={`/search/:keyword`} element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

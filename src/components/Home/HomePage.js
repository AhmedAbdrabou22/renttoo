import React, { useEffect, useState } from "react";
import PageContainer from "../layouts/PageContainer";
import SiteFeatures from "../../components/partials/homepage/home-default/SiteFeatures";
import HomeDefaultBanner from "../../components/partials/homepage/home-default/HomeDefaultBanner";
import HomeDefaultTopCategories from "../../components/partials/homepage/home-default/HomeDefaultTopCategories";
import Newletters from "../../components/partials/commons/Newletters";
import DownLoadApp from "../../components/partials/commons/DownLoadApp";
import HomeDefaultProductListing from "../../components/partials/homepage/home-default/HomeDefaultProductListing";
import { GetMostPopular } from "../../store/categories/action";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { generateTempArray } from "../../utilities/common-helpers";
import SkeletonProduct from "../elements/skeletons/SkeletonProduct";
const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [t, i18n] = useTranslation();
  const lang = i18n.language;

  const popularData = async () => {
    setLoading(true);
    try {
      await dispatch(GetMostPopular(lang));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    popularData();
  }, [dispatch]);
  const skeletons = generateTempArray(5).map((item) => (
    <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
      <SkeletonProduct />
    </div>
  ));
  const popularItems = useSelector((state) => state.categories.Popular);
  return (
    <div>
      <PageContainer title="Renttoo">
        <main id="homepage-1">
          <div style={{marginBottom:'50px'}}>
          <HomeDefaultBanner />
          </div>
          <SiteFeatures />

          <HomeDefaultTopCategories />

          {popularItems && popularItems.data ? (
            popularItems.data.popular.map((populdrItem) => {
              return (
                <>
                  {populdrItem.items.length > 0 && (
                    <HomeDefaultProductListing
                      categoryId={populdrItem}
                      collectionSlug={populdrItem.items}
                      title={populdrItem.name}
                    />
                  )}
                </>
              );
            })
          ) : (
            <>
              <div className="row d-flex justify-content-center">{skeletons}</div>
            </>
          )}

          {/* <DownLoadApp /> */}
          <Newletters />
        </main>
      </PageContainer>
    </div>
  );
};

export default Home;

import React from "react";

import BreadCrumb from "../../../components/elements/BreadCrumb";
import PageContainer from "../../../components/layouts/PageContainer";
import FooterDefault from "../../../components/shared/footers/FooterDefault";
import Newletters from "../../../components/partials/commons/Newletters";
import Wishlist from "./Wishlist";

const WishlistPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "WishList",
    },
  ];
  return (
    <>
      <PageContainer footer={<FooterDefault />} title="Recent Viewed Products">
        <div className="ps-page--my-account">
          <BreadCrumb breacrumb={breadCrumb} />
          <Wishlist />
        </div>
        <Newletters layout="container" />
      </PageContainer>
    </>
  );
};

export default WishlistPage;

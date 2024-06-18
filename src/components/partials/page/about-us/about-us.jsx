import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/elements/BreadCrumb";
import FooterDefault from "../../../../components/shared/footers/FooterDefault";
import Newletters from "../../../../components/partials/commons/Newletters";
import PageContainer from "../../../../components/layouts/PageContainer";
import { useDispatch, useSelector } from "react-redux";
import { AboutUs } from "../../../../store/TermsAndConditions/action";

const AboutUsPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getAboutUS = async () => {
    try {
      await dispatch(AboutUs());
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAboutUS();
  }, [dispatch]);

  const aboutUs = useSelector((state) => state.AboutUs.aboutUs);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!aboutUs) {
    return <p>No About Us available.</p>;
  }
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "About Us",
    },
  ];
  return (
    <PageContainer footer={<FooterDefault />} title="About Us">
      <div className="ps-page--single">
        <BreadCrumb breacrumb={breadCrumb} />
        <div className="p-5">
          <div
            dangerouslySetInnerHTML={{
              __html: aboutUs.data,
            }}
          />
        </div>{" "}
      </div>
      <Newletters layout="container" />
    </PageContainer>
  );
};
export default AboutUsPage;

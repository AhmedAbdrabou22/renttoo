import React from "react";

import BreadCrumb from "../../../components/elements/BreadCrumb";
import PageContainer from "../../../components/layouts/PageContainer";
import FooterDefault from "../../../components/shared/footers/FooterDefault";
import Newletters from "../../../components/partials/commons/Newletters";
import Login from "./Login";

const LoginPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Login",
    },
  ];
  return (
    <>
      <PageContainer footer={<FooterDefault />} title="Login">
        {/* <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Login />
                </div> */}
        <div className="ps-page--my-account">
          <BreadCrumb breacrumb={breadCrumb} />
          <div className="row justify-content-between align-items-center py-5">
            <div className="col-lg-6 col-sm-12 col-md-12"></div>
            <div className="col-lg-6 col-sm-12 col-md-12">
              <Login />
            </div>
          </div>
        </div>
        <Newletters layout="container" />
      </PageContainer>
    </>
  );
};

export default LoginPage;

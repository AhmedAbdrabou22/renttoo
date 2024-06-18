import React from "react";

import BreadCrumb from "../../../components/elements/BreadCrumb";
import PageContainer from "../../../components/layouts/PageContainer";
import FooterDefault from "../../../components/shared/footers/FooterDefault";
import Newletters from "../../../components/partials/commons/Newletters";
import Register from "./Register";

const RegisterPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Register an account",
    },
  ];

  return (
    <>
      <PageContainer footer={<FooterDefault />} title="Register">
        <div className="ps-page--my-account">
          <BreadCrumb breacrumb={breadCrumb} />
          <div className="row justify-content-between align-items-center py-5">
            <div className="col-lg-6 col-sm-12 col-md-12">
              {/* <Register /> */}
            </div>
            <div className="col-lg-6 col-sm-12 col-md-12">
              <Register />
            </div>
          </div>
        </div>
        <Newletters layout="container" />
      </PageContainer>
    </>
  );
};

export default RegisterPage;

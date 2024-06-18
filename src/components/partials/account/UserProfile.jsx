import React, {  useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import PageContainer from "../../layouts/PageContainer";
import { useParams } from "react-router-dom";
import { GetUserItems } from "../../../store/userItems/actions";

import Imgg from "../../../static/img/users/Animation - 1716196066837.gif";
import Product from "../../elements/products/Product";
import { GetUserProfile } from "../../../store/User/action";

const UserProfile = ({name}) => {
  const id = useParams()
    const dispatch = useDispatch();
    const [t, i18n] = useTranslation();
    useEffect(() => {
      try {
        dispatch(GetUserItems(id.id)); // Pass the user ID from userInfo
        dispatch(GetUserProfile(id.id)); // Pass the user ID from userInfo
      } catch (e) {
        console.log(e);
      }
    }, [id]); // Add userInfo to the dependency array
  
    const userItems = useSelector((state) => state.userItems.UserItems);
    const userdata = useSelector((state) => state.UserProfile.userProfile);
   console.log(userItems)
   console.log(userdata)
  return (
    <PageContainer title="Multipurpose Marketplace Renttoo">
      <div className="ps-section--shopping ps-whishlist">
        <div className="container">
          <div className="ps-section__header">
            <h2>{userdata?.data?.data?.f_name} {''} {t("UserProfile")}</h2>
          </div>
          <div className="ps-section__content">
            <div className="row">
              {userItems?.data?.items?.length>0?(
               userItems?.data?.items?.map((item) => {
                    return (
                      <div className="col-lg-3 col-sm-12 col-md-6">
                        <Product product={item} key={item} />
                      </div>
                    )}
                  ))
                 : (
                  <div className=" d-flex justify-content-center align-items-center">
                    <img src={Imgg} width="300px" height="300px" alt="Renttoo" />
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>

);
};
export default connect((state) => state)(UserProfile);
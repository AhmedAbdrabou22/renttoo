import React, { Component, useEffect, useState } from "react";
import FormChangeUserInformation from "../../../components/shared/FormChangeUserInformation";
import { GetUserInformation } from "../../../store/auth/action";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserInformation = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [address, setAddress] = useState("");
  const [sex, setSex] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [accountType, setAccountType] = useState("");
  const [photo, setPhoto] = useState(null);

  // Dispatch To Get User Information
  const getInformationUser = async () => {
    try {
      await dispatch(GetUserInformation());
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  //ينشغل الالفانكشن getInformationUser اول مايفتح الroute دا
  useEffect(() => {
    getInformationUser();
  }, [dispatch]);

  //access Response From Api
  const userInfo = useSelector((state) => state.auth.InformationUser);

  useEffect(() => {
    if (userInfo && userInfo.data) {
      setFirstName(userInfo.data.user.f_name);
      setLastName(userInfo.data.user.l_name);
      setEmail(userInfo.data.user.email);
      setPhone(userInfo.data.user.phone);
      setAddress(userInfo.data.user.address);
      setBirthday(userInfo.data.user.birthdate);
      setAccountType(userInfo.data.user.account_type);
      setPhoto(userInfo.data.user.photo);
    }
  }, [userInfo]);

  const accountLinks = [
    {
      text: "Account Information",
      url: "/account/user-information",
      icon: "icon-user",
      active: true,
    },
    {
      text: "My product",
      url: "/account/favProduct/Favourite",
      icon: "icon-papers",
    },
    {
      text: "Recent Viewed Product",
      url: "/account/recent-viewed-product",
      icon: "icon-store",
    },
    {
      text: "Wishlist",
      url: "/account/wishlist",
      icon: "icon-heart",
    },
  ];
  //Views
  const accountLinkView = accountLinks.map((item) => (
    <li key={item.text} className={item.active ? "active" : ""}>
      <Link to={item.url}>
        <i className={item.icon}></i>
        {item.text}
      </Link>
    </li>
  ));

  return (
    <section className="ps-my-account ps-page--account">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="ps-section__left">
              <aside className="ps-widget--account-dashboard">
                <div className="ps-widget__header">
                  <img src={`${photo}`} />
                  <figure>
                    <figcaption>Hello</figcaption>
                    <p>{email}</p>
                  </figure>
                </div>
                <div className="ps-widget__content">
                  <ul className="ps-list--user-links">
                    {accountLinks.map((link) => (
                      <li
                        key={link.text}
                        className={link.active ? "active" : ""}
                      >
                        <Link to={link.url}>
                          <a>
                            <i className={link.icon}></i>
                            {link.text}
                          </a>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/account/my-account">
                        <i className="icon-power-switch"></i>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="ps-page__content">
              {userInfo && userInfo.data ? (
                <FormChangeUserInformation userInfoData={userInfo} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserInformation;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../../store/auth/action";
import { Form, Input, notification } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import Imgg from "../../../static/img/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [t, i18n] = useTranslation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Handle Change Phone Number
  const handlePhoneNumberChange = (value, country, e, formattedValue) => {
    setPhone(`+${value}`);
  };

  // Handle Login To Enter WebSite
  const handleLoginSubmit = async () => {
    setLoading(true);
    try {
      await dispatch(
        LoginUser({
          phone,
          password,
        })
      );
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  // Handle UseSelector To Handle And Access Data From response

  const loginData = useSelector((state) => state.auth.LoginUser);

  useEffect(() => {
    if (loading === false) {
      if (loginData && loginData.data) {
        if (loginData?.data.status === true) {
          localStorage.setItem("token", loginData.data.data.token);
          localStorage.setItem(
            "user",
            JSON.stringify(loginData.data.data.user)
          );
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        }
      }
    }
  }, [loading, loginData]);

  return (
    <>
      <div style={{ height: "60vh" }}>
        {/* onFinish={handleLoginSubmit} */}
        <Form className="ps-form--account">
          <ul className="ps-tab-list">
            <li className="active">
              <Link to="/account/login" className="cairo">
                {t("login")}
              </Link>
            </li>
            <li>
              <Link to="/account/register" className="cairo">
                {t("register")}
              </Link>
            </li>
          </ul>
          <div className="ps-tab active" id="sign-in">
            <div className="ps-tab active text-center">
              <img src={Imgg} style={{ width: "80px" }} alt="logoRentoo" />
              <p className="cairo">{t("loginyou")}</p>
            </div>
            <div className="ps-form__content">
              <div className="form-group form-forgot">
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Phone!",
                    },
                  ]}
                >
                  <PhoneInput
                    country={"eg"}
                    onChange={handlePhoneNumberChange}
                    countryCodeEditable={false}
                    disableDropdown={true}
                    inputProps={{
                      placeholder: "ادخل رقم الموبايل",
                    }}
                  />
                </Form.Item>
              </div>
              <div className="form-group form-forgot">
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    type="password"
                    placeholder={t("EnterPassword")}
                  />
                </Form.Item>
              </div>
              <div className="form-group submit" onClick={handleLoginSubmit}>
                <button
                  type="submit"
                  className="ps-btn ps-btn--fullwidth cairo"
                >
                  {t("login")}
                </button>
              </div>
              <div className="form-group form-forgot">
                <p className="cairo">
                  {" "}
                  {t("policy")}{" "}
                  <Link
                    href="/policy"
                    className="cairo"
                    style={{ textDecoration: "underLine" }}
                  >
                    <span
                      style={{
                        textDecoration: "underLine",
                        cursor: "pointer",
                      }}
                      className="cairo"
                    >
                      {t("linkPolicy")}
                    </span>
                  </Link>
                </p>
              </div>
              <div>
                <Link
                  href="/account/password"
                  className="cairo "
                  style={{ textDecoration: "underLin" }}
                >
                  <p className="cairo" style={{ cursor: "pointer" }}>
                    {t("ForgetPassword")}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </Form>
      </div>
      {loading ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255, 255, 255, 0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999, // Ensure it's above other content
          }}
        >
          <span className="loader"></span>
        </div>
      ) : null}
    </>
  );
};

export default Login;

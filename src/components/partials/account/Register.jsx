import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterNewUser } from "../../../store/auth/action";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Input } from "antd";
import PhoneInput from "react-phone-input-2";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Imgg from "../../../static/img/logo.png";
import ReactDatePicker from "react-datepicker";

const Register = () => {
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation();

  // Data To Be Sent To Api (name , phone , pass  , .......)

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [address, setAddress] = useState("");
  const [sex, setSex] = useState("");
  const [birthday, setBirthday] = useState("");
  const [accountType, setAccountType] = useState("");
  const [loading, setLoading] = useState(false);

  // handle Change PhoneNumber => علشان مكتبه
  const handlePhoneNumberChange = (value, country, e, formattedValue) => {
    setPhone(`+${value}`);
  };

  // handle Change Birthday From DateBicker => علشان مكتبه
  const handleBirthdayDateChange = (value, dateString) => {
    setBirthday(dateString);
  };

  // Choose Image From SelectImages Component
  const [selectedImageFront, setSelectedImageFront] = useState(null);
  const [selectedImageBack, setSelectedImageBack] = useState(null);

  const handleImageChangeFront = (imageFile) => {
    setSelectedImageFront(imageFile);
  };
  const handleImageChangeBack = (imageFile) => {
    setSelectedImageBack(imageFile);
  };

  // تنفيذ عملة الربط مع الApi وارسال البيانات

  const sendToRegister = async () => {
    const formData = new FormData();
    try {
      setLoading(true);
      formData.append("f_name", firstName);
      formData.append("l_name", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("c_password", confirmPass);
      formData.append("address", address);
      formData.append("sex", sex);
      formData.append("birthdate", birthday);
      formData.append("account_type", accountType);
      formData.append("national_id_front", selectedImageFront);
      formData.append("national_id_back", selectedImageBack);
      await dispatch(RegisterNewUser(formData));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // Use Selector To Access Response From Api
  const newRegister = useSelector((state) => state.auth.RegisterUser);

  useEffect(() => {
    if (loading === false) {
      if (newRegister && newRegister.data) {
        if (newRegister.data.status === true) {
          localStorage.setItem("token", newRegister.data.data.token);
          localStorage.setItem(
            "user",
            JSON.stringify(newRegister.data.data.user)
          );
          // router.push('/');
          window.location.href = "/";
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setPassword("");
          setConfirmPass("");
          setSex("");
          setBirthday("");
          setAccountType("");
          setLoading(true);
        }
      }
    }
  }, [loading, newRegister]);

  return (
    <div className="ps-my-account">
      <div style={{ margin: "auto", textAlign: "center" }}>
        <Form className="ps-form--account">
          {/* Login &&  Register Routes */}
          <ul className="ps-tab-list">
            <li>
              <Link to="/account/login">
                <a className="cairo">{t("login")}</a>
              </Link>
            </li>
            <li className="active">
              <Link href="/account/register">
                <a className="cairo">{t("register")}</a>
              </Link>
            </li>
          </ul>

          {/* Data To Sent  To Api */}
          <div className="ps-tab active text-center" id="register">
            <img src={Imgg} style={{ width: "80px" }} alt="logoRentoo" />
            <p className="cairo">{t("rento")}</p>
            <span className="cairo">{t("loginNow")}</span>
            <div className="ps-form__content">
              <div className="row">
                <div className="col-lg-6 col-sm-12 col-md-12">
                  <div className="form-group">
                    <Form
                      name="firstName"
                      rules={[
                        {
                          required: true,
                          message: "Please input your FirstName!",
                        },
                      ]}
                    >
                      <Input
                        className="form-control"
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        placeholder={t("FirstName")}
                      />
                    </Form>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-md-12">
                  {/* <span class="loader"></span> */}

                  <div className="form-group">
                    <Form
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: "Please input your LastName!",
                        },
                      ]}
                    >
                      <Input
                        className="form-control"
                        value={lastName}
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder={t("LastName")}
                      />
                    </Form>
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <div className="form-group">
                    <Form
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Please input your LastName!",
                        },
                      ]}
                    >
                      <Input
                        className="form-control"
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        placeholder={t("address")}
                      />
                    </Form>
                  </div>
                </div>
              </div>

              <div className="form-group form-forgot">
                <Form
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Phone!",
                    },
                  ]}
                >
                  <PhoneInput
                    onChange={handlePhoneNumberChange}
                    country={"eg"}
                    countryCodeEditable={false}
                    disableDropdown={true}
                    value={phone}
                    inputProps={{
                      placeholder: "ادخل رقم الموبايل", // Placeholder text in Arabic
                    }}
                  />
                </Form>
              </div>

              <div className="row">
                <div className="col-lg-6 col-sm-12 col-md-6">
                  <div className="form-group">
                    <Form
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Password!",
                        },
                      ]}
                    >
                      <Input
                        className="form-control"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t("EnterPassword")}
                        value={password}
                      />
                    </Form>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-md-6">
                  <div className="form-group">
                    <Form
                      name="confirmPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please input your confirm Password!",
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) => setConfirmPass(e.target.value)}
                        className="form-control"
                        type="password"
                        placeholder={t("confirmPassword")}
                        value={confirmPass}
                      />
                    </Form>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <Form
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: `${t("email")}`,
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    type="email"
                    placeholder={t("email")}
                    value={email}
                  />
                </Form>
              </div>

              {/* <div className="form-group">
                <Form.Item
                  name="birthday"
                  className="w-100"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <ReactDatePicker
                    onChange={handleBirthdayDateChange}
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                    locale="en-GB"
                    placeholderText={t("selectDate")}
                    value={birthday}
                  />
                </Form.Item>
              </div> */}

              {/* Include your SelectImages component here */}

              {/* <div className="row justify-content-between align-items-center">
                <div className="col-lg-6 col-md-12 col-sm-12">
                  {selectedImageFront ? (
                    <img
                      src={URL.createObjectURL(selectedImageFront)}
                      alt="الهوية الأمامية"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                      }}
                    />
                  ) : (
                    <SelectImages
                      onImageChange={handleImageChangeFront}
                      title={"اختر صورة الهويه الاماميه"}
                    />
                  )}
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                  {selectedImageBack ? (
                    <img
                      src={URL.createObjectURL(selectedImageBack)}
                      alt="الهوية الخلفيه"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                      }}
                    />
                  ) : (
                    <SelectImages
                      onImageChange={handleImageChangeBack}
                      title={"اختر صورة الهويه الخلفيه"}
                    />
                  )}
                </div>
              </div> */}

              <div className="d-flex justify-content-between align-items-center">
                {/* Type Your Gender */}
                <div className="form-group text-right mx-auto">
                  <Form
                    name="sex"
                    className="w-100"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Your Gender",
                      },
                    ]}
                  >
                    {/* To Choose Gender */}
                    <div className="">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="male"
                          id="flexCheckDefault"
                          name="gender"
                          onChange={(e) => setSex(e.target.value)}
                        />
                        <label
                          className="form-check-label cairo mx-2" // Adjust mx value as needed
                          htmlFor="flexCheckDefault" // Use htmlFor instead of "for" for label association
                        >
                          {t("genderMale")}
                        </label>
                      </div>

                      <div class="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          value="female"
                          id="flexCheckChecked"
                          onChange={(e) => setSex(e.target.value)}
                        />
                        <label
                          className="form-check-label cairo mx-2"
                          for="flexCheckChecked"
                        >
                          {t("genderFemale")}
                        </label>
                      </div>
                    </div>
                  </Form>
                </div>

                {/* Type Your Account Type */}
                <div className="form-group text-right mx-auto">
                  <Form
                    name="sex"
                    className="w-100"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Your Acount Type",
                      },
                    ]}
                  >
                    <div className="">
                      <div class="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="corporate"
                          id="accountTypeCompany"
                          name="accountType"
                          onChange={(e) => setAccountType(e.target.value)}
                        />
                        <label
                          className="form-check-label cairo mx-2"
                          for="accountTypeCompany"
                        >
                          {t("company")}
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="accountType"
                          value="personal"
                          id="accountTypeMember"
                          onChange={(e) => setAccountType(e.target.value)}
                        />
                        <label
                          className="form-check-label cairo mx-2"
                          for="accountTypeMember"
                        >
                          {t("member")}
                        </label>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>

              {/* زرار التاكيد علي ارسال البيانات */}

              <div className="form-group submit">
                <button
                  onClick={sendToRegister}
                  type="submit"
                  className="ps-btn ps-btn--fullwidth cairo"
                >
                  {t("register")}
                </button>
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
    </div>
  );
};

export default Register;

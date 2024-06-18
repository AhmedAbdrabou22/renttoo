import React, { useEffect, useState } from "react";
import { DatePicker, Form, Input, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  GetUserInformation,
  UpdateUserInformation,
} from "../../store/auth/action";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import moment from "moment";
import PhoneInput from "react-phone-input-2";
import SelectImageNational from "./SelectImageNational";
import SelectImages from "../partials/account/SelectImages";

const FormChangeUserInformation = ({ userInfoData }) => {
  const [t, i18n] = useTranslation();
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
  const [nationalFront, setNationalFront] = useState(null);
  const [nationalBack, setNationalBack] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userInfoData) {
      setFirstName(userInfoData.data.user.f_name);
      setLastName(userInfoData.data.user.l_name);
      setEmail(userInfoData.data.user.email);
      setPhone(userInfoData.data.user.phone);
      setAddress(userInfoData.data.user.address);
      setBirthday(userInfoData.data.user.birthdate);
      setAccountType(userInfoData.data.user.account_type);
      setPhoto(userInfoData.data.user.photo);
      setNationalFront(userInfoData.data.user.national_id_front);
      setNationalBack(userInfoData.data.user.national_id_back);
    }
  }, [userInfoData]);

  // Select Image Profile
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  // Handle Change Phone Number
  const handlePhoneNumberChange = (newPhoneNumber) => {
    setPhone(newPhoneNumber);
    // setIsValidPhoneNumber(isValid);
  };

  // Handle BirthDay Change
  const handleBirthdayDateChange = (value, dateString) => {
    setBirthday(dateString);
  };

  // handle Image Change
  const [selectedImageFront, setSelectedImageFront] = useState(null);
  const [selectedImageBack, setSelectedImageBack] = useState(null);

  const handleImageChangeFront = (imageFile) => {
    setSelectedImageFront(imageFile);
  };
  const handleImageChangeBack = (imageFile) => {
    setSelectedImageBack(imageFile);
  };
  // update user Profile Information
  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    try {
      formData.append("f_name", firstName);
      formData.append("l_name", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("birthdate", birthday);
      formData.append("photo", imageFile);
      formData.append("national_id_front", selectedImageFront);
      formData.append("national_id_back", selectedImageBack);
      await dispatch(UpdateUserInformation(formData));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setImageFile(null);
      await dispatch(GetUserInformation());
      setSelectedImageFront(null);
      setSelectedImageBack(null);
    }
  };

  return (
    <form className="ps-form--account-setting">
      <div className="ps-form__header">
        <h3>{t("accountInformation")}</h3>
      </div>
      <div className="ps-form__content">
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Username or email address"
            value={email}
          />
        </div>
        <div className="form-group">
          {imageFile ? (
            <div style={{ margin: "auto", textAlign: "center" }}>
              <img
                src={URL.createObjectURL(imageFile)}
                alt="الهوية الخلفية"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  textAlign: "center",
                  margin: "auto",
                }}
              />
              <span
                style={{
                  marginTop: "10px",
                  fontSize: "25px",
                  cursor: "pointer",
                }}
                onClick={() => setImageFile(null)}
              >
                x
              </span>
            </div>
          ) : (
            <label className="filelabel">
              <i className="fa fa-paperclip"></i>
              <span className="Cairo">تحديث صورتك الشخصية</span>
              <input
                className="FileUpload1"
                name="image"
                id="FileInput"
                type="file"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <PhoneInput
                country={"eg"}
                countryCodeEditable={true}
                disableDropdown={true}
                value={phone}
                onChange={handlePhoneNumberChange}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <DatePicker
                className="form-control"
                dateFormat="dd/MM/yyyy"
                locale="en-GB"
                placeholderText={t("selectDate")}
                value={moment(birthday)}
                onChange={handleBirthdayDateChange}
              />
            </div>
          </div>
          <div className="col-sm-12">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          {/* Images */}
          <div className="col-sm-6">
            {selectedImageBack ? (
              <div>
                <img
                  src={URL.createObjectURL(selectedImageBack)}
                  alt="الهوية الخلفيه"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                  }}
                />
                <span
                  style={{
                    marginTop: "10px",
                    fontSize: "25px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                  onClick={() => setSelectedImageBack(null)}
                >
                  x
                </span>
              </div>
            ) : (
              <SelectImageNational
                national={nationalBack}
                onImageChange={handleImageChangeBack}
                title={"اختيار صورة البطاقه الخلفيه"}
              />
            )}
          </div>
          <div className="col-sm-6">
            {selectedImageFront ? (
              <div>
                <img
                  src={URL.createObjectURL(selectedImageFront)}
                  alt="الهوية الخلفيه"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    marginRight: "10px",
                  }}
                />
                <span
                  style={{
                    marginTop: "10px",
                    fontSize: "25px",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedImageFront(null)}
                >
                  x
                </span>
              </div>
            ) : (
              <SelectImageNational
                national={nationalFront}
                onImageChange={handleImageChangeFront}
                title={"اختيار صورة البطاقه الاماميه"}
              />
            )}
          </div>
        </div>

        <div className="form-group">
          <button
            className="ps-btn cairo mt-5"
            onClick={(e) => updateProfile(e)}
          >
            {t("updateProfile")}
          </button>
        </div>
        {loading ? (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(255, 255, 255, 0.8)",
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
    </form>
  );
};

export default FormChangeUserInformation;

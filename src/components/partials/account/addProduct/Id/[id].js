import React, { useEffect, useState } from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import FooterDefault from "~/components/shared/footers/FooterDefault";
import PageContainer from "~/components/layouts/PageContainer";
import Newletters from "~/components/partials/commons/Newletters";

import { Slider, notification } from "antd";
import dynamic from "next/dynamic";
import MultImages from "~/components/partials/account/MultImages";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllCategories,
  GetSubCategoryFromCategory,
} from "~/store/categories/action";
import { AddNewItem, EditItem, GetByidItem } from "~/store/addItems/action";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
// import MapPicker from 'react-google-map-picker';

const MapPicker = dynamic(() => import("react-google-map-picker"), {
  ssr: false,
});

const DefaultLocation = { lat: 32, lng: 30 };
const DefaultZoom = 3;

const AddProduct = () => {
  // Use Translation
  const [t, i18n] = useTranslation();
  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    setIsRtl(i18n.language === "ar");
  }, [i18n.language]);
  // Data
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [name, setName] = useState("");
  const [itemValue, setItemValue] = useState("");
  const [desc, setDesc] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [rentPerWeek, setRentPerWeek] = useState("");
  const [rentPerMonth, setRentPerMonth] = useState("");
  const [lat, setLat] = useState("");
  const [lang, setLang] = useState("");
  const [insurance, setInsurance] = useState("");
  const [quality, setQuality] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [minRentPeriod, setMinRentPeriod] = useState("");
  const [delivery, setDelivery] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);
  const [changes, setChanges] = useState([]); // State array to store changes
  const [deletedimages, setDeltedImages] = useState([]);

 
  useEffect(() => {
    getProductsById(id);
  }, [dispatch, id]);
  const getProductsById = async (id) => {
    try {
      setLoading(true);

      await dispatch(
        GetByidItem({
          id: id,
          lang: i18n.language,
          lat:location.lat,
          lang:location.lng
        })
      );
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const ItemById = useSelector((state) => state.addItems.getById);
  useEffect(() => {
    if (ItemById && ItemById.data && ItemById.data.item) {
      setName(ItemById.data.item.name);
      setItemValue(ItemById.data.item.item_value);
      setDesc(ItemById.data.item.description);
      setLoading(true);
      setShowMap(true);
      setCategoryId(ItemById.data.item.sub_category.category_id);
      if (subcategory) {
        setSubCategoryId(ItemById.data.item.sub_category_id);
      }
      setRentPerDay(ItemById.data.item.rental_price_per_day);
      setRentPerWeek(ItemById.data.item.rental_price_per_week);
      setRentPerMonth(ItemById.data.item.rental_price_per_month);
      setInsurance(ItemById.data.item.insurance_amount);
      setQuality(ItemById.data.item.quality);
      setAddress(ItemById.data.item.address);
      setQuantity(ItemById.data.item.quantity_available);
      setMinRentPeriod(ItemById.data.item.insurance_amount);
      setDelivery(ItemById.data.item.free_delivery);
      setLocation({
        lat: ItemById.data.item.latitude,
        lng: ItemById.data.item.longitude,
      });

      setImages(ItemById.data.item.images);
      // Se other fields if necessary
    }
  }, [ItemById]); // Only run this effect when ItemById changes

  // For Quality
  const marks = {
    1: "",
    2: "مقبول",
    3: "جيد",
    4: "جيد جدًا",
    5: "جديد",
  };

  const handleFilterChange = (filterSetter) => (value) => {
    filterSetter(value);
  };
  // Bread Crumb
  const breadCrumb = [{ text: "Home", url: "/" }, { text: "Add Product" }];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Select Images
  const handleImageSelect = (imageList) => {
    setSelectedImages(imageList);
  };

  // map (Lat , Lang)
  const [showMap, setShowMap] = useState(true);
  const [location, setLocation] = useState(DefaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
  }

  // Integration

  // 1-Get Category and Sub category
  const fetchMainCategory = async () => {
    try {
      await dispatch(GetAllCategories());
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchMainCategory();
  }, [dispatch]);

  const categories = useSelector((state) => state.categories.Categories);

  // 2- Get Sub Category
  const fetchSubCategory = async (categoryId) => {
    try {
      await dispatch(
        GetSubCategoryFromCategory({
          id: categoryId,
          lang: i18n.language,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (categoryId !== "") {
      fetchSubCategory(categoryId);
    }
  }, [categoryId]);

  const subcategory = useSelector((state) => state.categories.SubCategory);
  // Upload Product To Server
  const addItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    try {
      if (location !== "") {
        const newImages = selectedImages.filter((obj) => !obj.id);
        const sentImages = newImages.map((img, index) => ({
          [`image[${index}]`]: img.file.file,
        }));

        formData.append("name", name);
        formData.append("sub_category_id", subCategoryId);
        formData.append("description", desc);
        formData.append("item_value", itemValue);
        formData.append("rental_price_per_day", rentPerDay);
        formData.append("rental_price_per_week", rentPerWeek);
        formData.append("rental_price_per_month", rentPerMonth);
        formData.append("longitude", location.lng);
        formData.append("latitude", location.lat);
        formData.append("insurance_amount", insurance);
        formData.append("quality", quality);
        formData.append("address", address);
        newImages.map((image, index) =>
          formData.append(`image[${index}]`, image.file)
        );
        formData.append("quantity_available", quantity);
        formData.append("minimum_rental_period", minRentPeriod);
        formData.append("free_delivery", delivery);
        deletedimages.map((image, index) =>
          formData.append(`delete_images[${index}]`, image)
        );
        await dispatch(EditItem(ItemById.data.item.id, formData));

        setLoading(false);
        setCategoryId("");
        setSubCategoryId("");
        setName("");
        setItemValue("");
        setDesc("");
        setRentPerDay("");
        setRentPerWeek("");
        setRentPerMonth("");
        setInsurance("");
        setQuality("");
        setAddress("");
        setQuantity("");
        setMinRentPeriod("");
        setDelivery("");
        setSelectedImages([]);
        setDeltedImages([]);
      } else {
        notification.error({
          message: "Error",
          description: "Select Location",
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const Editeddata = useSelector((state) => state.addItems.EditItem);
  // Style
  const containerStyle = {
    textAlign: isRtl ? "left" : "right",
    padding: "0px 80px",
  };
  return (
    <PageContainer footer={<FooterDefault />} title="Add Product">
      <div className="ps-page--simple">
        <BreadCrumb breacrumb={breadCrumb} />
        <div style={containerStyle}>
          <h2 className="cairo mt-5">{t("UpdateProduct")}</h2>
          <div className="row justify-content-between align-items-start">
            <div className="col-lg-6 col-sm-12 col-md-6">
              <form className="add-product-form" onSubmit={handleSubmit}>
                {/* Name & Description */}
                <div>
                  <div className="w-100">
                    <div className="form-group">
                      <label htmlFor="name">{t("name")}</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    </div>
                  </div>
                  <div className="w-100">
                    <div className="form-group w-100">
                      <div className="form-group">
                        <label htmlFor="description">{t("Description")}</label>
                        <textarea
                          onChange={(e) => setDesc(e.target.value)}
                          value={desc}
                          style={{
                            resize: "none",
                          }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category & Sub Category */}
                <div className="row justify-content-between">
                  <div className="form-group col-lg-6 col-sm-12 col-md-6">
                    <label htmlFor="category">{t("ChooseCategory")}</label>
                    <select
                      className="form-select form-control"
                      aria-label="Default select example"
                      onChange={(e) => setCategoryId(e.target.value)}
                      value={categoryId}
                    >
                      <option hidden>{t("ChooseCategory")}</option>
                      {categories &&
                      categories.data &&
                      categories.data.categories
                        ? categories.data.categories.map((category) => {
                            return (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            );
                          })
                        : null}
                    </select>
                  </div>
                  <div className="form-group col-lg-6 col-sm-12 col-md-6">
                    <label htmlFor="subCategory">
                      {t("ChooseSubCategory")}
                    </label>
                    <select
                      onChange={(e) => setSubCategoryId(e.target.value)}
                      value={subCategoryId}
                      className="form-select form-control"
                      aria-label="Default select example"
                    >
                      <option hidden>{t("ChooseSubCategory")}</option>
                      {subcategory &&
                      subcategory.data &&
                      subcategory.data.sub_categories
                        ? subcategory.data.sub_categories.map((category) => {
                            return (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            );
                          })
                        : null}
                    </select>
                  </div>
                </div>

                {/* Rentals */}
                <div className="row justify-content-between">
                  <div className="col-lg-4 col-sm-12 col-md-3">
                    <div className="form-group">
                      <label htmlFor="rentPerDay">{t("RentPerDay")}</label>
                      <input
                        type="number"
                        id="rentPerDay"
                        name="rentPerDay"
                        required
                        onChange={(e) => {
                          const value = e.target.value;
                          setRentPerDay(value);
                          // Calculate Rent Per Week
                          const rentPerWeekValue = value * 7;
                          setRentPerWeek(rentPerWeekValue);
                          // Calculate Rent Per Month
                          const rentPerMonthValue = value * 30;
                          setRentPerMonth(rentPerMonthValue);
                        }}
                        value={rentPerDay}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-12 col-md-3">
                    <div className="form-group">
                      <label htmlFor="rentPerWeek">{t("RentPerWeek")}</label>
                      <input
                        type="number"
                        id="rentPerWeek"
                        name="rentPerWeek"
                        required
                        onChange={(e) => setRentPerWeek(e.target.value)}
                        value={rentPerWeek}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-12 col-md-3">
                    <div className="form-group">
                      <label htmlFor="rentPerMonth">{t("RentPerMonth")}</label>
                      <input
                        type="number"
                        id="rentPerMonth"
                        name="rentPerMonth"
                        required
                        onChange={(e) => setRentPerMonth(e.target.value)}
                        value={rentPerMonth}
                      />
                    </div>
                  </div>
                </div>

                {/* Insurance and Item Value */}
                <div className="row justify-content-between">
                  <div className="form-group col-lg-6 col-sm-12 col-md-6">
                    <div className="form-group">
                      <label htmlFor="itemValue">{t("ItemValue")}</label>
                      <input
                        type="number"
                        id="itemValue"
                        name="itemValue"
                        required
                        onChange={(e) => setItemValue(e.target.value)}
                        value={itemValue}
                      />
                    </div>
                  </div>
                  <div className="form-group col-lg-6 col-sm-12 col-md-6">
                    <div className="form-group">
                      <label htmlFor="insurance">{t("InsuranceAmount")}</label>
                      <input
                        type="number"
                        id="insurance"
                        name="insurance"
                        required
                        onChange={(e) => setInsurance(e.target.value)}
                        value={insurance}
                      />
                    </div>
                  </div>
                </div>

                {/* Minimum Rental Period and Quantity */}
                <div className="row justify-content-between mt-5">
                  <div className="form-group col-lg-6 col-sm-12 col-md-6">
                    <div className="form-group">
                      <label htmlFor="minRental">{t("MinRentalPeriod")}</label>
                      <input
                        type="number"
                        id="minRental"
                        name="minRental"
                        required
                        onChange={(e) => setMinRentPeriod(e.target.value)}
                        value={minRentPeriod}
                      />
                    </div>
                  </div>
                  <div className="form-group col-lg-6 col-sm-12 col-md-6">
                    <div className="form-group">
                      <label htmlFor="quantity">{t("QuantityAvailable")}</label>
                      <input
                        type="number"
                        min="1"
                        id="quantity"
                        name="quantity"
                        required
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                      />
                    </div>
                  </div>
                </div>

                {/* Quality */}
                <div className="form-group">
                  <label htmlFor="minRental">{t("ProductStatus")}</label>
                  <Slider
                    min={1}
                    max={5}
                    marks={marks}
                    step={1}
                    defaultValue={0}
                    onChange={handleFilterChange(setQuality)}
                    value={quality}
                  />
                </div>

                {/*  Free Delivery */}
                <div className="mt-5">
                  <div className="form-group w-100">
                    <label htmlFor="freeDelivery">{t("FreeDelivery")}</label>
                    <select
                      onChange={(e) => setDelivery(e.target.value)}
                      value={delivery}
                      className="form-select form-control"
                      aria-label="Default select example"
                    >
                      <option hidden>Choose Free Delivery or not</option>
                      <option value="1">Yes</option>
                      <option value="2">No</option>
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div className="form-group">
                  <label htmlFor="address">{t("Address")}</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                </div>

                <button
                  onClick={addItem}
                  className="submit-button mt-3 form-control"
                  style={{ background: "#ffc107" }}
                >
                  {t("UpdateProduct")}
                </button>
              </form>
            </div>

            <div className="col-lg-6 col-sm-12 col-md-6">
              <div className="w-100">
                <div className="form-group">
                  <MultImages
                    images={images}
                    onImageSelect={handleImageSelect}
                    setImages={setImages}
                    deletedimages={deletedimages}
                    setDeltedImages={setDeltedImages}
                  />
                </div>
                <div>
                  <div className="w-100 mt-4">
                    {showMap && (
                      <MapPicker
                        defaultLocation={location}
                        zoom={zoom}
                        mapTypeId="roadmap"
                        style={{
                          height: "300px",
                          width: "100%",
                        }}
                        onChangeLocation={handleChangeLocation}
                        apiKey="AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      <Newletters layout="container" />
    </PageContainer>
  );
};

export default AddProduct;

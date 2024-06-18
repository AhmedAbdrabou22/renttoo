import React, { useEffect, useState } from "react";
import MapPicker from "react-google-map-picker";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { GetByidItem } from "../../../../store/addItems/action";

const ModuleProductDetailDescription = ({ product }) => {
  const [t, i18n] = useTranslation();
  const textAlign = i18n.language === "en" ? "right" : "left";
  const DefaultLocation = { lat: 32, lng: 30 };

  const DefaultZoom = 3;
  const [location, setLocation] = useState(DefaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);
  const [loading, setLoading] = useState(false);

  const handleChangeLocation = (lat, lng) => {
    setLocation({ lat, lng });
    // Here you can do something with the selected latitude and longitude
    console.log("Selected Location:", { lat, lng });
  };
console.log(product)
  const dispatch = useDispatch();
  useEffect(() => {
    if (product?.data?.item?.id) {
      getCurrentLocation();
    }
  }, []);
  const getProductsById = async (id, latitude, longitude) => {
    try {
      setLoading(true);

      await dispatch(
        GetByidItem({
          id: id,
          lang: i18n.language,
          latitude: latitude,
          longitude: longitude,
        })
      );
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  console.log(product?.data?.item?.id);
  const ItemById = useSelector((state) => state.addItems.getById);
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(latitude, longitude);
          getProductsById(product?.data?.item?.id,  latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div style={{ textAlign }}>
      <div className="ps-product__desc mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="cairo"> {t("quantity")}: </span>
            {product?.data?.item?.quantity_available}
          </div>
          <div>
            <span className="cairo">{t("MinRentalPeriod")} : </span>
            {product?.data?.item?.minimum_rental_period}
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="mt-5 mb-5">
            <span className="cairo">{t("address")} : </span>
            {product?.data?.item?.address}
          </div>
          <div className="mt-5 mb-5">
            <span className="cairo">{t("distance")} : </span>
            {ItemById?.data?.item?.distance?.toFixed(2)} {t("km")} 

            {console.log(ItemById , "dissssssssssssssssssss")} 
          </div>
        </div>
      </div>
      <div>
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
      </div>
    </div>
  );
};

export default ModuleProductDetailDescription;

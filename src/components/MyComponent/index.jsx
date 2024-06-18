import React, { useState } from "react";
import MapPicker from "react-google-map-picker";

const DefaultLocation = { lat: 10, lng: 106 };
const DefaultZoom = 10;

const MapComponent = (DefaultLocation, zoom, setZoom) => {
  const [location, setLocation] = useState(DefaultLocation);

  function handleChangeLocation(lat, lng) {
    setLocation({ lat, lng });
  }

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <div>
      <div style={{ height: "300px", width: "100%" }}>
        <MapPicker
          defaultLocation={DefaultLocation}
          zoom={zoom}
          mapTypeId="roadmap"
          onChangeLocation={handleChangeLocation}
          //   apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} // Use environment variable
        />
      </div>
    </div>
  );
};

export default MapComponent;

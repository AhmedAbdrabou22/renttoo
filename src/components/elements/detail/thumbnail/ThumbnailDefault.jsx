import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ThumbnailDefault = ({ product }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (
      product &&
      product.data &&
      product.data.item &&
      product.data.item.images
    ) {
      const formattedImages = product.data.item.images.map((item) => ({
        original: item.image,
        thumbnail: item.image, // Optionally add a thumbnail if different from the original
      }));
      setImages(formattedImages);
    }
  }, [product]);

  return (
    <div className="thumbnail-container">
      <ImageGallery
        items={images}
        showThumbnails={true}
        additionalClass="custom-gallery" // Add custom class to the gallery
      />
    </div>
  );
};

export default ThumbnailDefault;

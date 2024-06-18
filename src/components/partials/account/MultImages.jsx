import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import { MdCancel, MdEdit } from 'react-icons/md';
import Upload from "../../../static/download.png"
const MultImages = ({
    onImageSelect,
    images,
    setImages,
    deletedimages,
    setDeltedImages,
}) => {
    const handleImageChange = (imageList) => {
        setImages(imageList);
        onImageSelect(imageList);
    };

    const handleDeleteImage = (imageId) => {
        // Delete the image here using its ID

        // Push the ID of the deleted image into the deletedImages array
        setDeltedImages((prevDeletedImages) => [...prevDeletedImages, imageId]);
    };
    return (
        <div className="boxImages mt-5 filelabel">
            <ImageUploading
                multiple
                value={images}
                onChange={handleImageChange}
                maxNumber={8}
                dataURLKey="data_url">
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    <div className="upload__image-wrapper">
                        <img
                            src={Upload}
                            onClick={onImageUpload}
                            {...dragProps}
                        />
                        &nbsp;
                        <div className="row justify-content-between align-items-center">
                            {imageList.map((image, index) => (
                                <div
                                    key={index}
                                    className="image-item col-lg-3">
                                    <img
                                        src={image['data_url'] || image.image}
                                        alt="image"
                                        width="90"
                                        style={{
                                            cursor: 'pointer',
                                            maxWidth: '100px',
                                            marginBottom: '20px',
                                        }}
                                    />
                                    <div className="image-item__btn-wrapper">
                                        <span
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                            onClick={() =>
                                                onImageUpdate(index)
                                            }>
                                            <MdEdit />
                                        </span>
                                        <span
                                            onClick={() => {
                                                handleDeleteImage(image.id);
                                                onImageRemove(index);
                                            }}
                                            style={{
                                                cursor: 'pointer',
                                            }}>
                                            <MdCancel />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </ImageUploading>
        </div>
    );
};

export default MultImages;

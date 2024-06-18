import React, { useState } from 'react';

const SelectImageNational = ({ onImageChange, title, national }) => {
    const [imageFile, setImageFile] = useState(national);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            onImageChange(file); // Call the onImageChange function with the selected file
        }
    };


    return (
        <div>
            <div className="form-group">
                <label className="filelabel">
                    <i className="fa fa-paperclip"></i>
                    <span className="Cairo">{title}</span>
                    <input
                        className="FileUpload1"
                        name="image"
                        id="FileInput"
                        type="file"
                        onChange={handleImageChange}
                    />
                </label>
            </div>
        </div>
    );
};

export default SelectImageNational;

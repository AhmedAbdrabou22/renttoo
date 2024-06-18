import React, { useState } from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

const SelectImages = ({ onImageChange  , title}) => {
    const [t, i18n] = useTranslation();
    const [imageFile, setImageFile] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            onImageChange(file); // Pass selected image file to parent component
        }
    };

    return (
        <div style={{ margin: 'auto', textAlign: 'center' }}>
            <Form>
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
            </Form>
        </div>
    );
};

export default SelectImages;

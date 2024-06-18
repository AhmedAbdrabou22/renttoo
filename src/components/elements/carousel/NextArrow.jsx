import React from 'react';

const NextArrow = (props) => {
    const { className, onClick, icon } = props;
    const handleOnClick = () => {
        console.log("Next arrow clicked");
    };

    return (
        <a className={`slick-arrow slick-next ${className}`} onClick={handleOnClick}>
            {icon ? (
                <i className={icon}></i>
            ) : (
                <i className="icon-chevron-right"></i>
            )}
        </a>
    );
};

export default NextArrow;

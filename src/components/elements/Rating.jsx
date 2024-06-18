import React from 'react';

const Rating = ({ rating }) => {
    // Convert the rating string to a number
    const numericRating = parseFloat(rating);

    // Create an array of 5 stars
    const stars = Array.from({ length: 5 }, (_, index) => {
        // Determine if the current star should be filled or empty
        const isFilled = index + 1 <= numericRating;
        return (
            <i key={index} className={`fa fa-star${isFilled ? '' : '-o'}`}></i>
        );
    });

    return <span className="ps-rating">{stars}</span>;
};

export default Rating;

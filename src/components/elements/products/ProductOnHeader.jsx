import React from 'react';
import { connect } from 'react-redux';
import useProduct from '../../../hooks/useProduct';
import useEcomerce from '../../../hooks/useEcomerce';
import { Link } from 'react-router-dom';

const ProductOnHeader = ({ ecomerce, product }) => {
    const { thumbnailImage, price, title } = useProduct();
    const { addItem } = useEcomerce();
    function handleAddItemToCart(e) {
        e.preventDefault();
        addItem({ id: product.id, quantity: 1 }, ecomerce.cartItems, 'cart');
    }

    return (
        <div className="ps-product--header-sticky">
            <div className="ps-product__thumbnail">
                <Link href={`/product/${product.id}`}>
                    <a>{thumbnailImage(product)}</a>
                </Link>
            </div>
            {product && product.data && product.data.item ? (
                <div className="ps-product__wrapper">
                    <div className="ps-product__content cairo">
                        {product.data.item.name}
                    </div>
                    <div className="ps-product__shopping">
                        <span className="cairo">
                            {product.data.item.rental_price_per_day} LE Per Day
                        </span>
                        ---
                        <span className="cairo">{product.data.item.rental_price_per_month} LE Per Month</span>
                        ---
                        <span className="cairo">{product.data.item.rental_price_per_week} LE Per Week</span>
                        <a
                            className="ps-btn"
                            href="#"
                            onClick={(e) => handleAddItemToCart(e)}>
                            Add to Cart
                        </a>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default connect((state) => state)(ProductOnHeader);

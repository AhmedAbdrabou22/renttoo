import React, { useState } from 'react';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useDispatch } from 'react-redux';
import {
    GetMyFavouriteItems,
    PostNewFavourite,
} from '../../../store/favourite/action';
import useProduct from '../../../hooks/useProduct';
import Rating from '../../../components/elements/Rating';
import { Link } from 'react-router-dom';

const ProductFav = ({ product }) => {
    const [isFavorite, setIsFavorite] = useState(product.i_love_it === 1);
    const { thumbnailImage, price, badge, title } = useProduct();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const postNewFavorite = async (e, id) => {
        e.preventDefault();
        setLoading(true);
        e.stopPropagation(); // Prevent event from propagating to parent Link
        try {
            dispatch(PostNewFavourite({ id }));
        } catch (e) {
            console.error(e);
            // setIsFavorite(!isFavorite);
        } finally {
            setLoading(false);
            dispatch(GetMyFavouriteItems());
        }
    };
    return (
        <div>
            <Link href="/product/[id]" as={`/product/${product.id}`}>
                <Link>
                    <div
                        className="product-card card p-2"
                        style={{
                            width: '25rem',
                            height: '40vh',
                            position: 'relative',
                        }}>
                        <div className="product-image">
                            {/* <img
                                src={imageSrc}
                                alt={'Fav Item'}
                                style={{
                                    height: '150px',
                                    width: '100%',
                                    objectFit: 'cover',
                                }}
                            /> */}
                            <div
                                onClick={postNewFavorite}
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '5px',
                                    cursor: 'pointer',
                                    zIndex: 10,
                                }}>
                                <input
                                    value="favorite-button"
                                    name="favorite-checkbox"
                                    id="favorite"
                                    checked={isFavorite} // Set the checked state dynamically
                                    type="checkbox"
                                />
                                <label
                                    class="Favcontainer action"
                                    for="favorite">
                                    <svg
                                        class="feather feather-heart"
                                        stroke-linejoin="round"
                                        stroke-linecap="round"
                                        stroke-width="2"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        height="20"
                                        width="20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                </label>
                            </div>
                        </div>
                        <Link to="/product/[id]" as={`/product/${product.id}`}>
                            <a>{thumbnailImage(product)}</a>
                        </Link>
                        {badge(product)}
                    </div>
                    <div className="ps-product__container">
                        <Link href="/shop">
                            <a className="ps-product__vendor">{product.name}</a>
                        </Link>
                        <div>
                            {title(product)}
                            <div className="ps-product__rating">
                                <Rating />
                                <span>{product.rate_count}</span>
                            </div>
                            {price(product)}
                        </div>
                    </div>
                </Link>
            </Link>
        </div>
    );
};

export default ProductFav;

import React from 'react';
import Link from 'next/link';

const CategoriesBoxClothings = () => (
    <div className="ps-block--categories-box">
        <div className="ps-block__header">
            <h3>Clothing & Apparel</h3>
            <ul>
                <li>
                    <Link href="/shop">
                        <a>New Arrivals</a>
                    </Link>
                </li>
                <li>
                    <Link href="/shop">
                        <a>Best Seller</a>
                    </Link>
                </li>
            </ul>
        </div>
        <div className="ps-block__content">
            <div className="ps-block__banner">
                <img
                    src="/static/img/categories/clothing/large.jpg"
                    alt="Renttoo"
                />
            </div>
            <div className="ps-block__item">
                <a className="ps-block__overlay"></a>
                <img
                    src="/static/img/categories/clothing/1.jpg"
                    alt="Renttoo"
                />
                <p>Womens</p>
                <span>2 Items</span>
            </div>
            <div className="ps-block__item">
                <a className="ps-block__overlay"></a>
                <img
                    src="/static/img/categories/clothing/2.jpg"
                    alt="Renttoo"
                />
                <p>Mens</p>
                <span>2 Items</span>
            </div>
            <div className="ps-block__item">
                <a className="ps-block__overlay"></a>
                <img
                    src="/static/img/categories/clothing/3.jpg"
                    alt="Renttoo"
                />
                <p>Shoes</p>
                <span>4 Items</span>
            </div>
            <div className="ps-block__item">
                <a className="ps-block__overlay"></a>
                <img
                    src="/static/img/categories/clothing/4.jpg"
                    alt="Renttoo"
                />
                <p>Bags</p>
                <span>5 Items</span>
            </div>
            <div className="ps-block__item">
                <a className="ps-block__overlay"></a>
                <img
                    src="/static/img/categories/clothing/5.jpg"
                    alt="Renttoo"
                />
                <p>Sunglasses</p>
                <span>10 Items</span>
            </div>
            <div className="ps-block__item">
                <a className="ps-block__overlay"></a>
                <img
                    src="/static/img/categories/clothing/6.jpg"
                    alt="Renttoo"
                />
                <p>Accessories</p>
                <span>2 Items</span>
            </div>
            <div className="ps-block__item">
                <a className="ps-block__overlay"></a>
                <img
                    src="/static/img/categories/clothing/7.jpg"
                    alt="Renttoo"
                />
                <p>Kid's Fashion</p>
                <span>3 Items</span>
            </div>
        </div>
    </div>
);

export default CategoriesBoxClothings;
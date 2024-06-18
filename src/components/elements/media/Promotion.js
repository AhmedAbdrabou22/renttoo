import React from 'react';
import { Link } from 'react-router-dom';
// import { baseUrl } from '~/repositories/Repository';

const Promotion = ({ link, image }) => {
    if (true) {
        return (
            <Link href={link}>
                <a className="ps-collection bg-dark">
                    <img
                        src="/static/img/slider/home-8/1.jpg"
                        style={{ width: '100%', height: '20vh' }}
                        alt="Renttoo"
                    />
                </a>
            </Link>
        );
    } else {
        return (
            <Link href={link ? link : '/shop'}>
                <a className="ps-collection">
                    <img src="/static/img/not-found.jpg" alt="Renttoo" />
                </a>
            </Link>
        );
    }
};

export default Promotion;

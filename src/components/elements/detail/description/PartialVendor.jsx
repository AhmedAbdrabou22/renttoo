import React from 'react';

const PartialVendor = ({ product }) => (
    <section>
        {product && product.data && product.data.item ? (
            <div>
                <h4>{product.data.item.owner_name}</h4>
                <h4>{product.data.item.owner_phone}</h4>
                <h4>{product.data.item.owner_email}</h4>
            </div>
        ) : null}
    </section>
);

export default PartialVendor;

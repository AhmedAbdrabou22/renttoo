import React from 'react';
import { useTranslation } from 'react-i18next';

const Comments = ({ product }) => {
    const [t , i18n] = useTranslation();
    const s = i18n.language === 'ar' ? 'left' : 'right';
    const styleDisplay = {
        textAlign:s
    }
    return (
        <div style={{s}}>
            {product && product.data && product.data.item ? (
                product.data.item.comments.length > 0 ? (
                    product.data.item.comments.map((comment) => {
                        return (
                            <div
                                key={comment.id}
                                className="shadow mt-3"
                                style={{
                                    background: 'white',
                                    borderRadius: '10px',
                                    padding: '10px',
                                }}>
                                <div>
                                    {comment.user ? (
                                        <div className='d-flex justify-content-start align-items-center'>
                                            <div>
                                                <img
                                                    style={{
                                                        width:"50px;",
                                                        height:"50px",
                                                        borderRadius:"50%"
                                                    }}
                                                    src={comment.user.photo}
                                                    alt="data"
                                                />
                                            </div>
                                            <div className='mx-3'>
                                                {comment.user.f_name} {comment.user.l_name}
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                                <p className='mx-4 mt-5'> {comment.comment}</p>
                            </div>
                        );
                    })
                ) : (
                    <p className="cairo" style={styleDisplay} >{t("commentsfound")}</p>
                )
            ) : null}
        </div>
    );
};

export default Comments;

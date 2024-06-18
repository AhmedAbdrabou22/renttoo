import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/auth/action';
import { Form, Input, notification } from 'antd';
import Link from 'next/link';
import PhoneInput from 'react-phone-input-2';

const PasswordChange = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/');
        }
    }, [isLoggedIn, router]);

    const handleLoginSubmit = (values) => {
        dispatch(login());
        router.push('/');
    };

    const handleFeatureWillUpdate = (e) => {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    };

    return (
        <div className="ps-my-account">
            <div className="">
                <Form className="ps-form--account" onFinish={handleLoginSubmit}>
                    <div className="ps-tab active" id="sign-in">
                        <div className="ps-form__content">
                            <div>
                                <ul className="ps-tab-list">
                                    <li className="">
                                        <Link href="/account/login">
                                            <a>Login</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/account/register">
                                            <a>Register</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="cairo text-right">
                                <p className="cairo"> نسيت كلمة السر؟؟</p>
                                <span className="cairo">لو سمحت دخل الايميل الخاص بك</span>
                            </div>
                            <div className="form-group form-forgot">
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your password!',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="email"
                                        placeholder="ادخل الايميل الخاص بك"
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group submit">
                                <button
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default PasswordChange;

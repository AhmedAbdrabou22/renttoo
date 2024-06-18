import React, { useState } from 'react';

import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Arabic from "../../../../static/img/flag/arabic.png"
import En from "../../../../static/img/flag/en.png"
const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [visible, setVisible] = useState(false);
    const lang = i18n.language;

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('lang', lang);

        setVisible(false);
    };

    const menu = (
        <Menu>
            <Menu.Item key="ar" onClick={() => handleLanguageChange('en')}>
                <img
                    src={Arabic}
                    style={{
                        width: '25px',
                        marginRight: lang === 'ar' ? '10px' : '10px',
                        marginLeft: lang === 'ar' ? '10px' : '10px',
                    }}
                    alt="Arabic"
                />
                عربي
            </Menu.Item>
            <Menu.Item key="en" onClick={() => handleLanguageChange('ar')}>
                <img
                    src={En}
                    style={{
                        width: '25px',
                        marginRight: lang === 'ar' ? '10px' : '10px',
                        marginLeft: lang === 'ar' ? '10px' : '10px',
                    }}
                    alt="English"
                />
                English
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
            overlay={menu}
            trigger={['click']}
            visible={visible}
            onVisibleChange={(flag) => setVisible(flag)}>
            <Button
                className="ps-dropdown language"
                onClick={(e) => e.preventDefault()}
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: 0,
                }}>
                {i18n.language === 'en' ? (
                    <>
                        <img
                            src={Arabic}
                            style={{
                                width: '25px',
                                marginLeft: lang === 'ar' ? '0' : '10px',
                            }}
                            alt="Arabic"
                        />
                        عربي
                    </>
                ) : (
                    <>
                        <img
                            src={En}
                            style={{
                                width: '25px',
                            }}
                            alt="English"
                        />
                        English
                    </>
                )}
                <DownOutlined
                    style={{ marginRight: lang === 'en' ? '10px' : '0' }}
                />
            </Button>
        </Dropdown>
    );
};

export default LanguageSwitcher;

import React from 'react';
import { MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    key: 'sub1',
    label: 'Menu',
    icon: <MailOutlined />,
    children: [
      {
        key: '1',
        label: 'Home',
        slug: "/",
      },
      {
        key: '2',
        label: 'Terms & Conditions',
        slug: "/page/blank",
      },
      {
        key: '3',
        label: "FAQs",
        slug: "/page/about-us",
      },
    ],
  },
];

const App = () => {
//   const navigate = useNavigate();

  const onClick = (e) => {
    // Find the clicked item by key and navigate to its slug
    const clickedItem = items[0].children.find(child => child.key === e.key);
    if (clickedItem) {
      window.location.href=clickedItem.slug;
    }
  };

  return (
    <Menu
      onClick={onClick}
      style={{
        width: '100%',
      }}
      mode="inline"
      items={items}
    />
  );
};

export default App;

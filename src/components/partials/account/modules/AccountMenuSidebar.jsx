import React from "react";
import { Link } from "react-router-dom";
import Img from "../../../../static/img/users/3.jpg";

const AccountMenuSidebar = ({ data }) => (
  <aside className="ps-widget--account-dashboard">
    <div className="ps-widget__header">
      <img src={Img} />
      <figure>
        <figcaption>Hello</figcaption>
        <p>username@gmail.com</p>
      </figure>
    </div>
    <div className="ps-widget__content">
      <ul>
        {data.map((link) => (
          <li key={link.text} className={link.active ? "active" : ""}>
            <Link to={link.url}>
              <i className={link.icon}></i>
              {link.text}
            </Link>
          </li>
        ))}
        <li>
          <Link to="/account/my-account">Logout</Link>
        </li>
      </ul>
    </div>
  </aside>
);

export default AccountMenuSidebar;

import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import headerStyles from "../Header/header.module.css";
import titleIcon1 from "../../images/title-icon1.svg";
import titleIcon2 from "../../images/title-icon2.svg";
export default function Header() {
  const { user } = useContext(AppContext);
  return (
    <div className={headerStyles.container}>
      <div className={headerStyles.container2}>
        <Link to="/profile">
          {" "}
          <img
            className={headerStyles.img}
            style={{
              border: `.3rem solid ${user.color}`,
            }}
            src={user.photo}
            alt="profile"
          />
        </Link>
        <div>
          <img src={titleIcon1} alt="title" />{" "}
          <img src={titleIcon2} alt="title" />{" "}
        </div>
      </div>
    </div>
  );
}

import React, { useContext } from "react";
import { Logout } from "../../services/logout";
import { Link, useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import navbarProfile from "../NavbarProfile/navbarProfile.module.css";

export default function NavbarProfile() {
  const { user, setUser } = useContext(AppContext);

  const history = useHistory();

  const handleLogout = async () => {
    await Logout();
    history.push("/");
    setUser({});
  };
  return (
    <nav className={navbarProfile.navbar}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2 className={navbarProfile.title}>
          <span>{" < "}</span>
          {user.username}
        </h2>
      </Link>
      <div>
        <button
          onClick={handleLogout}
          className={navbarProfile.buttonOut}
          style={{
            backgroundColor: ` ${user.color}`,
          }}
        >
          LOGOUT
        </button>
      </div>
    </nav>
  );
}

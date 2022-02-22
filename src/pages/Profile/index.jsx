import React, { useContext, useState } from "react";
import NavbarProfile from "../../components/NavbarProfile";
import { AppContext } from "../../context/AppContext";
import OwnPosts from "../OwnPosts";
import FavoritePosts from "../FavoritesPosts";
import profileStyles from "../Profile/profile.module.css";

export default function Profile() {
  const [section, setSection] = useState("posts");
  const { user} = useContext(AppContext);

  const handleColor = (state) => {
    if (section === state) {
      return { backgroundColor: '#60263B' }
    } else {
      return
    }
  }

  return (
    <>
      <NavbarProfile />
      <div className={profileStyles.container}>
        <div className={profileStyles.nameContainer}>
          <img
            className={profileStyles.image}
            alt={user.name}
            src={user.photo}
            style={{
              border: `.5rem solid ${user.color}`,
            }}
          ></img>
          <h4 style={{ backgroundColor: `${user.color}` }}>{user.name}</h4>
        </div>
        <nav className={profileStyles.nav}>
          <ul>
            <li style = {handleColor('posts')}
              onClick={() => {
                setSection("posts");
              }}
            >
              POSTS
            </li>
            <li style = {handleColor('favs')}
              onClick={() => {
                setSection("favs");
              }}
            >
              FAVORITES
            </li>
          </ul>
        </nav>
        <div>
          {(section === 'posts') ? <OwnPosts/> :  <FavoritePosts/>}
        </div>

      </div>
    </>
  );
}

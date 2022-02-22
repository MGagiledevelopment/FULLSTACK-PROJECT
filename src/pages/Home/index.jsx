import React from "react";
import { Route} from "react-router-dom";
import Feed from "../Feed";
import Profile from "../Profile/index";
import homeStyles from "../Home/home.module.css"

export default function Home() {
  return (
    <div className={homeStyles.container}>
      <Route component={Feed} path="/" exact />
      <Route component={Profile} path="/profile" exact />
    </div>
  );
}



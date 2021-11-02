import React, { useContext } from "react";
import Feed from "../Feed";
import AuthGoogle from "../../components/authGoogle/index.jsx";
import { AppContext } from "../../context/AppContext";

export default function Auth() {
  const { user } = useContext(AppContext);

  return <div>{!user ? <AuthGoogle /> : <Feed/>}</div>;
}

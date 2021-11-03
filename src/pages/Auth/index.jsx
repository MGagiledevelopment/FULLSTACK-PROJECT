import React, { useContext } from "react";
import Feed from "../Feed";
import AuthGoogle from "../../components/AuthGoogle/index"
import { AppContext } from "../../context/AppContext";

export default function Auth() {
  const { customizer } = useContext(AppContext);

  return <div>{!customizer ? <AuthGoogle /> : <Feed/>}</div>;
}

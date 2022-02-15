import React, { useContext } from "react";
import Feed from "../Feed";
import Home from "../Home/index"
import AuthGoogle from "../../components/AuthGoogle/index";
import CustomUser from "../../components/CustomUser";
import { AppContext } from "../../context/AppContext";

export default function Auth() {
  const { user } = useContext(AppContext);

  return (
  
    <div>
      {!user.uid ? (
        <AuthGoogle />
      ) : !user.color || !user.username ? (
        <CustomUser />
      ) : (
        <Home/>
      )}
    </div>
    
  );
}

import React from "react";
import { Routes, Route} from "react-router-dom";
import Auth from "../../pages/Auth/index";
import Profile from "../../pages/Profile";

export default function Main() {
  return (<>
      <Auth/>
      {/* <Routes>
      <Route path="/" component = {Auth}></Route>
      <Route path="/profile" component = {Profile}></Route>
      </Routes> */}
      
      </>
    
  );
}

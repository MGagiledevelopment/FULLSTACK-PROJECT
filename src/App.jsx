import React, { useContext } from "react";
import Home from "./pages/Home";
import AuthGoogle from "./components/authGoogle/index.jsx";
import CustomUser from "../src/components/CustomUser/index";
import { AppContext } from "../src/context/AppContext";

function App() {
  const { user } = useContext(AppContext);

  return (
    <div className="App">

<div>
      {!user.uid ? (
        <AuthGoogle />
      ) : !user.color || !user.username ? (
        <CustomUser />
      ) : (
        <Home />
      )}
    </div>
    </div>
  );
}

export default App;

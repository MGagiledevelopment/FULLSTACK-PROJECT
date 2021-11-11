import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import logo from "../../images/logo-big.svg";
import customStyles from "../CustomUser/custom.module.css";
export default function CustomUser() {
  const { customizer, setCustomizer } = useContext(AppContext);
  const { input, setInput } = useContext(AppContext);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleButton = () => {
    setCustomizer(input);
  };

  return (
    <div className={customStyles.container}>
      <img src={logo} alt="logo" width="200px" />
      <form>
        <input
          type="text"
          onChange={handleInput}
          placeholder="Type your username"
        />
        <div >Select your favorite color</div>
        <button onClick={handleButton}>CONTINUE</button>
      </form>
    </div>
  );
}

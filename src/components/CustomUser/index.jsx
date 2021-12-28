import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
  getDoc,
} from "@firebase/firestore";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import logo from "../../images/logo-big.svg";
import { firestore } from "../../services/firebase";
import { colors } from "../../utils/colors";
import customStyles from "../CustomUser/custom.module.css";
export default function CustomUser() {
  const {
    user,
    setUser,
    usernames,
    setUsernames,
    setColor,
    color,
  } = useContext(AppContext);
  console.log(color);
  console.log(usernames)
  const handleInput = (e) => {
    setUsernames(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const document = doc(firestore, "users", user.id);
    console.log(document);
    await updateDoc(document, {
      username: usernames,
      color: color,

    });
    const snapshot = await getDoc(document)
    setUser({ id: snapshot.id, ...snapshot.data() })
    
  };

  const colorOptions = colors.map((colorOp) => {
    const colorHandler = (e) => {
      setColor(e.target.value);
    };

    return (
      <div>
        <label  name="col" htmlFor={colorOp.name}>
          <div 
            className={customStyles.label}
            style={{
              backgroundColor: `${colorOp.cod}`,
              outline: `${color === colorOp.cod ? ".3rem solid #fff" : "none"}`,
            }}
          ></div>
        </label>
        <input
          onClick={colorHandler}
          id={colorOp.name}
          className={customStyles.input}
          type="radio"
          value={colorOp.cod}
          name="col"
        />
      </div>
    );
  });

  return (
    <div className={customStyles.container}>
      <img src={logo} alt="logo" width="200px" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleInput}
          placeholder="Type your username"
        />
        <div>Select your favorite color</div>
        <div className={customStyles.colors}>{colorOptions}</div>
        {!usernames || !color  ? <button onClick={handleSubmit} style={{background:"rgba(99, 215, 128, 0.650)"}} disabled>CONTINUE</button> : <button>CONTINUE</button> }
      </form>
    </div>
  );
}

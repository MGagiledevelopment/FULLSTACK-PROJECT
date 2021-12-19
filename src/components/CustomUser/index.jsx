import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
  getDoc
} from "@firebase/firestore";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import logo from "../../images/logo-big.svg";
import { firestore } from "../../services/firebase";
import { colors } from "../../utils/colors";
import customStyles from "../CustomUser/custom.module.css";
export default function CustomUser() {
  const { input, setInput, user, setUser ,usernames, setUsernames, setColor,color} = useContext(AppContext);
console.log(color)
  const handleInput = (e) => {
    setUsernames(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const document = doc(firestore,"users", user.id)
    console.log(document)
    await updateDoc(document, {
      username: usernames,
      color: "aqui va el color"
    })
  };

  const colorOptions = colors.map(colorOp => {
    
    const colorHandler = (e) => {
      setColor(e.target.value)
    }

    return (
      <div>
      <label htmlFor="colorOp.name" name="colors"></label>
      <input onClick={colorHandler} type="radio" value ={colorOp.cod} name="colors" />
      </div>
    )
  })

  // console.log(colorOptions)
  
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
        <input type="radio" />
       <div>{colorOptions}</div>
        <button>CONTINUE</button>
      </form>
    </div>
  );
}

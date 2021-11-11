import React,{useContext} from 'react';
import { AppContext } from "../../context/AppContext";
import headerStyles from "../Header/header.module.css"
import titleIcon1 from "../../images/title-icon1.svg"
import titleIcon2 from "../../images/title-icon2.svg"
export default function Header (){
const {user} =useContext(AppContext)
console.log(user)
    return(
<div className={headerStyles.container}>
        <img src={user.photoURL} alt="profile"/>
        <div><img src={titleIcon1}/>  <img src={titleIcon2}/> </div>
</div>
    )

}
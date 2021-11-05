import React,{useContext} from 'react';
import authGoogleStyles  from "../AuthGoogle/authGoogle.module.css";
import image from "../../images/google.png";
import logo from "../../images/logo-big.svg";
import CustomUser from "../CustomUser/index"
import { AppContext } from "../../context/AppContext";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
  } from "@firebase/auth";
 


export default function AuthGoogle (){
  const { user, setUser } = useContext(AppContext);
  const {customUser, setCustomUser} = useContext(AppContext);


    const auth = getAuth();
  const provider = new GoogleAuthProvider();


    const logIn = () => {
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
    
            const user = result.user;
            // necesitamos setear user para que mande los datos y poder usarlo
            setUser(result.user);
            console.log("el usuario se logeo", user);
            // ...
          })
    
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
      };

    return(
<>
{/* le digo aca que si USER esta vacio (es decir antes de hacer la utenticacion,
  que me rederice la opcion de poder hacerlo, y una vesz que me autentico Y MANDO LOS
  DATOS A SETUSER, bueno..que me mande a customUser y alli voy a setear customizer para pasar a FEED) */}
{!user ? (<div className={authGoogleStyles.container}>
            <img src={logo} alt="logo" width="200px"/>
      <div className={authGoogleStyles.button}>
      <div className={authGoogleStyles.img}> <img src={image} alt="logo"/> </div>
      <button  onClick={()=>{
          logIn()
      }}>Sign in with Google</button> </div>
        </div>) : <CustomUser/>}
        
</>
    )

}
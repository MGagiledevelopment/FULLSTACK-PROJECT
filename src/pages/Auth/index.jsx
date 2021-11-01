import React, { useContext } from "react";
import Feed from "../Feed";
import { firestore } from "../../services/firebase";
import { AppContext } from "../../context/AppContext";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "@firebase/auth";



export default function Auth() {
  const { user, setUser } = useContext(AppContext);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();


  console.log(user)
  
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

  return (
    <div>
    {!user ? 
      <button onClick={()=>{
          logIn()
      }}>HACER LOGIN CON GOOGLE</button> : <Feed/>  }
      
    </div>
  );
}

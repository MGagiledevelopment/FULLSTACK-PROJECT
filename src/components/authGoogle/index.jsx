import React, { useContext, useEffect, useState } from "react";
import authGoogleStyles from "../authGoogle/authGoogle.module.css";
import image from "../../images/google.png";
import logo from "../../images/logo-big.svg";
import ClipLoader from "react-spinners/ClipLoader";
import { getUsers } from "../../services/users";
import { AppContext } from "../../context/AppContext";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from "@firebase/auth";
import { addDoc, collection } from "@firebase/firestore";
import { firestore } from "../../services/firebase";

export default function AuthGoogle() {
  const { data, setData, setUser, loading, setLoading } =
    useContext(AppContext);
  const auth = getAuth();
  let [color] = useState("#ffffff");

  const handlePersist = async () => {
    setLoading(true);
    await setPersistence(auth, browserSessionPersistence);
    const users = await getUsers();
    setData(users);
    if (auth.currentUser) {
      const exist = users.find(({ uid }) => auth.currentUser.uid);
      if (exist) {
        setUser({ id: exist.id, ...exist });
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePersist();
  }, []);

  const logIn = async () => {
    const provider = new GoogleAuthProvider();
    const results = await signInWithPopup(auth, provider);
    const credentials = results.user;

    if (!credentials) return;
    const find = data.find(({ uid }) => uid === credentials.uid);
    if (find) {
      setUser(find);
    } else {
      const newUser = {
        username: "",
        color: "",
        name: credentials.displayName,
        photo: credentials.photoURL,
        uid: credentials.uid,
      };
      const usersCollection = await collection(firestore, "users");
      const userAdd = await addDoc(usersCollection, newUser);
      setUser({ id: userAdd, ...newUser });
    }
  };

  return (
    <>
      {loading ? (
        <div className={authGoogleStyles.loader}>
          <ClipLoader color={color} />
        </div>
      ) : (
        <div className={authGoogleStyles.container}>
          <section className={authGoogleStyles.section1}>
            <img src={logo} alt="logo" width="200px" />
          </section>

          <section className={authGoogleStyles.section2}>
            <h1>WELCOME!</h1>
            <h6>Sign in and be part of this great social network!</h6>
            <div className={authGoogleStyles.button}>
              <div className={authGoogleStyles.img}>
                {" "}
                <img src={image} alt="logo" />{" "}
              </div>
              <button
                onClick={() => {
                  logIn();
                }}
              >
                Sign in with Google
              </button>{" "}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

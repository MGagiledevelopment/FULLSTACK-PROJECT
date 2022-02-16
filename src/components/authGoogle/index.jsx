import React, { useContext, useEffect } from "react";
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
import { addDoc, collection, getDocs, onSnapshot } from "@firebase/firestore";
import { firestore } from "../../services/firebase";

export default function AuthGoogle() {
  const { data, setData, setUser, loading, setLoading } =
    useContext(AppContext);
  console.log(loading);
  const auth = getAuth();

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
        <ClipLoader />
      ) : (
        <div className={authGoogleStyles.container}>
          <img src={logo} alt="logo" width="200px" />
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
        </div>
      )}
    </>
  );
}

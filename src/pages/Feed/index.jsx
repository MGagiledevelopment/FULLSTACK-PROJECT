import React, { useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import feedStyles from "../Feed/feed.module.css";
import { firestore } from "../../services/firebase";
import { collection, getDocs, addDoc } from "@firebase/firestore";

export default function Feed() {
  const { text, setText } = useContext(AppContext);
console.log(text)
  const fetchData = () => {
    const tweets = collection(firestore, "social-network");
    getDocs(tweets).then((tweets) => {
      tweets.forEach((tweet) => {
        // eliminar este console //
        console.log(tweet.data());
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // handle para enviar el tweet //
  const handleSubmit = (e) => {
    const tweetsCollection = collection(firestore, "social-network");
    e.preventDefault();
    addDoc(tweetsCollection, {
      text: text,
    });
  };

  return (
    <div className={feedStyles.feed}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What's happening?"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button>POST!</button>
      </form>
    </div>
  );
}

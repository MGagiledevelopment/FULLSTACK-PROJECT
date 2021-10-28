import React, { useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import feedStyles from "../Feed/feed.module.css";
import { firestore } from "../../services/firebase";
import { collection, getDocs, addDoc } from "@firebase/firestore";

export default function Feed() {
  const { text, setText } = useContext(AppContext);
  const { tweets, setTweets } = useContext(AppContext);


  const fetchData = () => {
    const tweetsCollection = collection(firestore, "social-network");
    const arrayTweets = [];

    getDocs(tweetsCollection).then((tweets) => {
      tweets.forEach((tweet) => {
        arrayTweets.push({ ...tweet.data(), id: tweet.id });
      });
    });
    setTweets(arrayTweets);
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
    setText("");
   
  };

  return (
    <div className={feedStyles.feed}>

      <form onSubmit={handleSubmit} className={feedStyles.form}>
        <textarea
          type="text"
          placeholder="What's happening?"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
        <button>POST!</button>
      </form>

<div>
      {tweets.map((tweet) => {
         console.log(tweet.text)
          return (
            <div key={tweet.id}>
             <div>{tweet.text}</div>
            </div>
          );
        })}


      </div>



    </div>
  );
}

import React, { useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import feedStyles from "../Feed/feed.module.css";
import { timeStamp } from "../../utils/index"

import { firestore } from "../../services/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "@firebase/firestore";

export default function Feed() {
  const { text, setText } = useContext(AppContext);
  const { tweets, setTweets } = useContext(AppContext);

  console.log(tweets)

  const fetchData = () => {
    // const tweetsCollection = collection(firestore, "social-network");
    // const arrayTweets = [];

    // getDocs(tweetsCollection).then((tweets) => {
    //   tweets.forEach((tweet) => {
    //     arrayTweets.push({ ...tweet.data(), id: tweet.id });
    //   });
    //   setTweets(arrayTweets);
    // });

     onSnapshot(
      collection(firestore, "social-network"),
      (tweets) => {
        const arrayTweets = [];
        tweets.forEach((tweet) => {
          arrayTweets.push({ ...tweet.data(), id: tweet.id, date: new Date()});
        });
        setTweets(arrayTweets);
      }
    );
  };

  useEffect(() => {
    fetchData();
    return fetchData();
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

  // handle para eliminar el tweet //
  const handleDelete = (tweet) => {
    deleteDoc(doc(firestore, "social-network", tweet.id));
  };

  return (
    <div className={feedStyles.feed}>
      <form onSubmit={handleSubmit} className={feedStyles.form}>
        <textarea
          className={feedStyles.textarea}
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
          console.log(tweet.text);
          return (
            <div className={feedStyles.containerTweet} key={tweet.id}>


              <div className={feedStyles.image}>IMAGEN PERFIL</div>

              <div className={feedStyles.contentTweet}>
                <div className={feedStyles.dataTweet}>
                  {" "}
                  <div>USERNAME - {timeStamp(tweet.date)}.</div>{" "}
                  <button
                    onClick={() => {
                      handleDelete(tweet);
                    }}
                  >
                    {" "}
                    <i className="fas fa-trash-alt"></i>{" "}
                  </button>
                </div>
                <div className={feedStyles.textTweet}>{tweet.text}</div>
                
                <div>LIKES</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { firestore } from "../services/firebase";
import { collection, getDocs } from "@firebase/firestore";

export default function Feed() {
  useEffect(() => {
    const tweets = collection(firestore, "social-network");
    getDocs(tweets).then((tweets) => {
      tweets.forEach((tweet) => {
        console.log(tweet.data());
      });
    });
  }, []);

  return <div></div>;
}

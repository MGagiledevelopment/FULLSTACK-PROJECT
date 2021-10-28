import React, { useEffect } from "react";
import feedStyles from "../Feed/feed.module.css"
import {firestore} from "../../services/firebase"
import { collection, getDocs } from "@firebase/firestore";


export default function Feed() {

  const fetchData = () => {
    const tweets = collection(firestore, "social-network");
    getDocs(tweets).then((tweets) => {
      tweets.forEach((tweet) => {
        console.log(tweet.data());
      });
    });
  };

  useEffect(() => {
    fetchData()
  }, []);

  
  return (<div className={feedStyles.feed}>
  <form>
    <input type="text"/>
    <button>POST!</button>
     </form>


  </div>);
}

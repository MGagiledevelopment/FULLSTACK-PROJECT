import React, { useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import feedStyles from "../Feed/feed.module.css";
import NewPost from "../../components/NewPost";
import Post from "../../components/Post/index";
import Header from "../../containers/Header/index";
import { firestore } from "../../services/firebase";
import { collection, onSnapshot } from "@firebase/firestore";
import { Routes, Route } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";

export default function Feed() {
  const { setTweets } = useContext(AppContext);

  const fetchData = () => {
    onSnapshot(collection(firestore, "social-network"), (tweets) => {
      const arrayTweets = [];
      tweets.forEach((tweet) => {
        arrayTweets.push({ ...tweet.data(), id: tweet.id });
      });
      setTweets(arrayTweets);
    });
  };

  useEffect(() => {
    fetchData();
    return fetchData();
  }, []);

  return (
    <div className={feedStyles.feed}>
      <Header />
      <NewPost />
      <Post />
    </div>
  );
}

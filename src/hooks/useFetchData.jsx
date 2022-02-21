import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const useFetchData = (dataBase, name) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    onSnapshot(collection(dataBase, name), (tweets) => {
      const arrayTweets = [];
      tweets.forEach((tweet) => {
        arrayTweets.push({ ...tweet.data(), id: tweet.id });
      });
      setData(arrayTweets);
    });
  }, [dataBase, name]);

  return [data];
};

export default useFetchData;

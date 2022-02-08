import React, { useContext } from "react";
import feedStyles from "../../pages/Feed/feed.module.css";
import Likesbtn from "../Likes/Likesbtn";
import { timeStamp } from "../../utils/index";
import { AppContext } from "../../context/AppContext";
import { firestore } from "../../services/firebase";
import { deleteDoc, doc } from "@firebase/firestore";

export default function Post() {
  const { likes, user, tweets } = useContext(AppContext);

  const handleDelete = (tweet) => {
    deleteDoc(doc(firestore, "social-network", tweet.id));
  };

  const isLiked = () => likes.includes(user.uid);

  return (
    <>
      {tweets.map((tweet) => {
        return (
          <div className={feedStyles.containerTweet} key={tweet.id}>
            <div>
              <img
                className={feedStyles.image}
                style={{
                  border: `.5rem solid ${tweet.color}`,
                }}
                src={tweet.photo}
                alt="profile"
                width="50rem"
              />
            </div>
            <div className={feedStyles.contentTweet}>
              <div className={feedStyles.dataTweet}>
                {" "}
                <div className={feedStyles.username}>
                  <h6>{tweet.author}</h6> - {timeStamp(tweet.date.seconds)}{" "}
                </div>{" "}
                {/* renderizado condicional del boton delete */}
                {user.uid === tweet.uid ? (
                  <button
                    onClick={() => {
                      handleDelete(tweet);
                    }}
                  >
                    {" "}
                    <i className="fas fa-trash-alt"></i>{" "}
                  </button>
                ) : (
                  <></>
                )}
              </div>
              <div className={feedStyles.textTweet}>{tweet.text}</div>
              <div className={feedStyles.likes}>
                <Likesbtn tweet={tweet} isLiked={isLiked} />
                <p>{tweet.likes.length}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

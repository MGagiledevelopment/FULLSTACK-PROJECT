import React, { useContext } from "react";
import feedStyles from "../../pages/Feed/feed.module.css";
import Likesbtn from "../Likes/Likesbtn";
import { timeStamp } from "../../utils/index";
import { AppContext } from "../../context/AppContext";
import { firestore } from "../../services/firebase";
import { deleteDoc, doc } from "@firebase/firestore";
import Swal from "sweetalert2";

export default function Post() {
  const { user, tweets } = useContext(AppContext);
  // const handleDelete = (tweet) => {
  //   deleteDoc(doc(firestore, "social-network", tweet.id));
  // };
  const handleDelete = (tweet) => {
    Swal.fire({
      title: "Are you sure to delete this tweet?",
      text: "will no longer be available!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#308500",
      cancelButtonColor: "#E53100",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(doc(firestore, "social-network", tweet.id));
        Swal.fire("has been deleted!");
      }
    });
  };

  return (
    <div className={feedStyles.containerTweets}>
      {tweets.map((tweet) => {
        const isLiked = () => tweet.likes.includes(user.uid);
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
                  <h6 style={{ backgroundColor: `${tweet.color}` }}>
                    {tweet.author}
                  </h6>{" "}
                  - {timeStamp(tweet.date.seconds)}{" "}
                </div>{" "}
                {/* renderizado condicional del boton delete */}
                {user.uid === tweet.uid ? (
                  <button
                    className={feedStyles.buttonDelete}
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
                <Likesbtn tweet={tweet} isLiked={isLiked} id={tweet.id} />
                <p>{tweet.likes.length}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

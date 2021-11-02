import React,{useContext} from 'react';
import { timeStamp } from "../../utils/index"
import { AppContext } from "../../context/AppContext";
import feedStyles from "../../pages/Feed/feed.module.css"
import { firestore } from "../../services/firebase";
import {
    deleteDoc,
    doc,
  } from "@firebase/firestore";

export default function Post (){
    const { tweets, setTweets } = useContext(AppContext);
    const {user} = useContext(AppContext)

     // handle para eliminar el tweet //
  const handleDelete = (tweet) => {
    deleteDoc(doc(firestore, "social-network", tweet.id));
  };

    return(
<>
{tweets.map((tweet) => {
          return (
            <div className={feedStyles.containerTweet} key={tweet.id}>


              <img className={feedStyles.image} src={user.photoURL} alt="profile" />

              <div className={feedStyles.contentTweet}>
                <div className={feedStyles.dataTweet}>
                  {" "}
                  <div>USERNAME - {timeStamp(tweet.date.seconds)} </div>{" "}
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
</>

    )

}
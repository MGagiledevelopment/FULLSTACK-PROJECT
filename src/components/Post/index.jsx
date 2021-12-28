import React, { useContext } from "react";
import feedStyles from "../../pages/Feed/feed.module.css";
import { timeStamp } from "../../utils/index";
import { AppContext } from "../../context/AppContext";
import { firestore } from "../../services/firebase";
import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Post() {
  const { tweets } = useContext(AppContext);
  const { user } = useContext(AppContext);
  const {like, setLike}= useContext(AppContext);
  const handleDelete = (tweet) => {
    deleteDoc(doc(firestore, "social-network", tweet.id));
  };

const handleFavorite = (tweet) =>{
updateDoc(doc(firestore, "social-network", tweet.id),{
  counter: typeof tweet.counter === "number" ? tweet.counter + 1 : 1,
  state: true
})
}

const handleDesfavorite = (tweet) =>{
  updateDoc(doc(firestore, "social-network", tweet.id),{
    counter: typeof tweet.counter === "number" ? tweet.counter - 1 : <></>,
    state:false
  })
  }

//  const auth = getAuth()
//  const uid = auth.currentUser.uid
//  console.log(uid)

  return (
    <>
      {tweets.map((tweet) => {
        
        return (
          <div className={feedStyles.containerTweet} key={tweet.id}>
            <div>
              <img
                className={feedStyles.image}
                style={{ 
                  //  border: `${ uid === user.uid ? `.5rem solid ${user.color}` : "none"}` 
                  border: `.5rem solid ${user.color}`
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

                 {tweet.state === true ?  <button onClick={()=>{handleDesfavorite(tweet)}}>DESFAVORITO</button> : <button onClick={()=>{handleFavorite(tweet)}}>FAVORITO</button>
}
             
              <p>{tweet.counter}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

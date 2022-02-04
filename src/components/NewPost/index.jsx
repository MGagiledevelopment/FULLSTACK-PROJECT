import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import feedStyles from "../../pages/Feed/feed.module.css";
import post from "../../images/POST.svg";
import { firestore } from "../../services/firebase";
import { collection, addDoc } from "@firebase/firestore";

export default function NewPost() {
  const { text, setText, widthCounter, setWidthCounter, user, customizer } = useContext(AppContext);

 console.log(customizer)

  // handle para enviar el tweet //
  const handleSubmit = (e) => {
    const tweetsCollection = collection(firestore, "social-network");
    e.preventDefault();
    addDoc(tweetsCollection, {
      author: user.username,
      text: text,
      uid:user.uid,
      photo:user.photo,
      color:user.color,
      likes:[],
      date: new Date(),

    });
    setText("");
    setWidthCounter(0);
  };

  // handle para manejar barra width
  const handleWidth = (e) => {
    setText(e.target.value);
    setWidthCounter(e.target.value.length);
  };

  
  return (
    <div>
      <form onSubmit={handleSubmit} className={feedStyles.form}>
        <div className={feedStyles.textarea}>
          <textarea
            className={feedStyles.inputTextarea}
            type="text"
            placeholder="What's happening?"
            value={text}
            onChange={handleWidth}  
            maxLength="200"
          ></textarea>

          <div
            className={feedStyles.bar}
            style={{ width: widthCounter / 2 + "%" }}
          ></div>
        </div>

        <div className={feedStyles.counters}>
          {" "}
          <div>
            {" "}
            {widthCounter === 200 ? (
              <div className={feedStyles.max}>200 max.</div>
            ) : (
              <div>{widthCounter}</div>
            )}
          </div>
        </div>

        <div className={feedStyles.button}>
          {" "}
          <button>
            <img src={post} />
          </button>
        </div>
      </form>
    </div>
  );
}

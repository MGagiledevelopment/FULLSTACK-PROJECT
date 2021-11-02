import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import feedStyles from "../../pages/Feed/feed.module.css";
import { firestore } from "../../services/firebase";
import { collection, addDoc } from "@firebase/firestore";

export default function NewPost() {
  const { text, setText } = useContext(AppContext);

  // handle para enviar el tweet //
  const handleSubmit = (e) => {
    const tweetsCollection = collection(firestore, "social-network");
    e.preventDefault();
    addDoc(tweetsCollection, {
      text: text,
      date: new Date()
    });
    setText("");
  };

  return (
    <div>
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
    </div>
  );
}

import { arrayUnion, updateDoc, doc, arrayRemove } from "@firebase/firestore";
import { useContext, useState, React } from "react";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { AppContext } from "../../context/AppContext";
import { firestore } from "../../services/firebase";
import feedStyles from "../../pages/Feed/feed.module.css";

export default function Likesbtn({ isLiked, tweet }) {
  const { user } = useContext(AppContext);
  const [like, setLike] = useState(isLiked);
  const handleLikes = () => {
  const postRef = doc(firestore, "social-network", tweet.id);

    if (!like) {
      updateDoc(postRef, {
        likes: arrayUnion(user.uid),
      });
      setLike(true);
    } else {
      updateDoc(postRef, {
        likes: arrayRemove(user.uid),
      });
      setLike(false);
    }
  };

  return (
    <button className={feedStyles.buttonLike} onClick={handleLikes}>
      {like ? <FcLike /> : <FcLikePlaceholder />}
    </button>
  );
}

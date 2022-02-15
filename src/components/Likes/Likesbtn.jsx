import {
  arrayUnion,
  updateDoc,
  doc,
  arrayRemove,
  setDoc,
  collection,
} from "@firebase/firestore";
import { useContext, useState, React } from "react";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { AppContext } from "../../context/AppContext";
import { firestore } from "../../services/firebase";

export default function Likesbtn({ isLiked, tweet}) {
  const { user } = useContext(AppContext);
  const [like, setLike] = useState(isLiked);
  console.log(tweet.id)
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
    <button onClick={handleLikes}>
      {like ? <FcLike /> : <FcLikePlaceholder />}
    </button>
  );
}

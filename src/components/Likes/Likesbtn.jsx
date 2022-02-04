import { arrayUnion,updateDoc, doc,arrayRemove,setDoc } from '@firebase/firestore'
import { useContext, useState } from 'react';
import  { FcLike } from 'react-icons/fc';
import  { FcLikePlaceholder } from 'react-icons/fc';
import { AppContext } from '../../context/AppContext';
import { firestore } from "../../services/firebase";




export default function Likesbtn({isLiked, id}) {
 
    const { user } = useContext(AppContext);
    const [like, setLike] = useState(isLiked)
    
    console.log(like)


    const handleLikes = (post) => {

        const postRef = doc(firestore, "social-network", user.id)


        if (!like) {
        //  updateDoc(postRef, { 
        //     likes:"esto se deberia actualizar"
        //   })
          setLike(true)


        } else {
          // updateDoc(postRef, {
          //   likes:  arrayRemove(user.id),
          // })
          console.log("se deslikeo")

          setLike(false)
        }
      }

return (

<button  onClick={handleLikes}>
 {like ? < FcLike /> : <FcLikePlaceholder/>}
</button>

)
}


import { collection, getDocs } from "@firebase/firestore";
import { firestore } from "./firebase";

export const getUsers = async () => {
  const users = []
  const usersCollection = collection(firestore, "users")
  const snapshot = await getDocs(usersCollection);
snapshot.forEach((user) => {
    users.push({ ...user.data(), id: user.id });
});
return users;
};
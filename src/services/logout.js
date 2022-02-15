import {signOut, getAuth} from "@firebase/auth";

const auth = getAuth();

export const Logout = async () => {
	await signOut(auth);
};
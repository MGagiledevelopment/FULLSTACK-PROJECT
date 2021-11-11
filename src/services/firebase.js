
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCF_XpcV6vSAYOGTTr20C8ibcyv3kLqGlk",
  authDomain: "fullstack-project-4b8b7.firebaseapp.com",
  projectId: "fullstack-project-4b8b7",
  storageBucket: "fullstack-project-4b8b7.appspot.com",
  messagingSenderId: "264082482540",
  appId: "1:264082482540:web:ee431e7acd19f25342ff49"
};

const app = initializeApp(firebaseConfig);




// entre medio de estas dos lineas van las lineas de AUTENTICACION


export const firestore = getFirestore(app)
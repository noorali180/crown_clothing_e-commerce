import { initializeApp } from "firebase/app";
import {
  getAuth,
  // signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbSardoNMjzpvoJi_a00js_duo2Ll5Sjw",
  authDomain: "crown-clothing-db-52c34.firebaseapp.com",
  projectId: "crown-clothing-db-52c34",
  storageBucket: "crown-clothing-db-52c34.appspot.com",
  messagingSenderId: "369544403079",
  appId: "1:369544403079:web:586ca65ca1c22af9da0022",
};

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  // we have to see if there is an existing document refrence, //Note: Reference is a special type of object provided by google to firebase

  // doc(database, collection_name, unique identifire: which will distinguish between diff users.)...
  const userDocRef = doc(db, "users", userAuth.uid);

  // get data of the particular document(user), who's document reference is available.
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("An error occured.", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {

  if(!email || !password) {
    alert('please insert a valid email, and password');
    return;
  };

  return createUserWithEmailAndPassword(auth, email, password);
};

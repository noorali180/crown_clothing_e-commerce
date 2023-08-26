import { initializeApp } from "firebase/app";
import {
  getAuth,
  // signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

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

export const createCollectionAndDocuments = async (
  collectionName,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionName);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());

    // it will call the set for each object to add in database...
    batch.set(docRef, object);
  });

  // it will start firing all the { batch statements }, at once to instantiate the transcactional manner...
  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const categoriesMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;

    return acc;
  }, {})

  return categoriesMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
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
  if (!email || !password) {
    alert("please insert a valid email, and password");
    return;
  }

  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    alert("please insert a valid email, and password");
    return;
  }

  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// This method listen to event whenever user auth changes, which means if an user signIn or signOut from the app it will listen to it, and calls the callback function passed through it.
// main function of it is keeping track of user auth.
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};

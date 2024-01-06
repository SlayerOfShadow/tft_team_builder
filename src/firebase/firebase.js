// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDocs, query, where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQOlSGD3Kn7wkiXTLX0-RjCRecQLp5c8o",
  authDomain: "tft-team-builder-2a6d9.firebaseapp.com",
  projectId: "tft-team-builder-2a6d9",
  storageBucket: "tft-team-builder-2a6d9.appspot.com",
  messagingSenderId: "953336153693",
  appId: "1:953336153693:web:6531f7856a4be0d70e6fb4",
  measurementId: "G-VMJVJLVNHH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const db = getFirestore(app);

const createUserDocument = async (obj) => {
    const usersRef = collection(db, "users");
    await setDoc(doc(usersRef, obj.user.uid), {
        id : obj.user.uid,
        email: obj.user.email
    });
}

const saveComposition = async (userId, name, compositionData) => {
  const compositionsRef = collection(db, "compositions");
    await setDoc(doc(compositionsRef), {
      userId: userId,
      name: name,
      compositionData: compositionData
    });
};

const getCompositions = async (userId) => {
  try {
    const compositionsRef = collection(db, "compositions");
    const q = query(compositionsRef, where("userId", "==", userId));

    const compositions = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      compositions.push({ id: doc.id, ...doc.data() });
    });

    return compositions;
  } catch (error) {
    console.error("Error getting compositions:", error);
    throw error;
  }
};

export { auth, createUserDocument, saveComposition, getCompositions };
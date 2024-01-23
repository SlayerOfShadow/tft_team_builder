import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDocs, deleteDoc, query, where } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const firebaseConfig = {
  apiKey: "AIzaSyAQOlSGD3Kn7wkiXTLX0-RjCRecQLp5c8o",
  authDomain: "tft-team-builder-2a6d9.firebaseapp.com",
  projectId: "tft-team-builder-2a6d9",
  storageBucket: "tft-team-builder-2a6d9.appspot.com",
  messagingSenderId: "953336153693",
  appId: "1:953336153693:web:6531f7856a4be0d70e6fb4",
  measurementId: "G-VMJVJLVNHH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const createUserDocument = async (obj) => {
  const usersRef = collection(db, "users");
  await setDoc(doc(usersRef, obj.user.uid), {
    id: obj.user.uid,
    email: obj.user.email
  });
}

const saveComposition = async (userId, name, compositionData) => {
  try {
    const compositionsRef = collection(db, "compositions");
    const newDocRef = doc(compositionsRef);
    const docId = newDocRef.id;

    await setDoc(newDocRef, {
      userId: userId,
      name: name,
      compositionData: compositionData,
      compositionId: docId
    });
    console.log("Document successfully created!");
    toast.success("Your composition has been saved!", {
      position: "top-center"
    });
  } catch (error) {
    console.error("Error creating document: ", error);
    toast.error("There was an error saving your composition!", {
      position: "top-center"
    });
  }
};

const deleteComposition = async (compositionId) => {
  const compositionsRef = doc(db, "compositions", compositionId);

  try {
    await deleteDoc(compositionsRef);
    toast.success("Your composition has been deleted!");
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
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

export { auth, createUserDocument, saveComposition, getCompositions, deleteComposition };
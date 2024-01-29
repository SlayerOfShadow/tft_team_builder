import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, deleteDoc, updateDoc, query, where, orderBy, serverTimestamp } from "firebase/firestore";
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
    email: obj.user.email,
    compositionsCount: 0
  });
}

const saveComposition = async (userId, name, compositionData) => {
  try {
    const userRef = doc(collection(db, "users"), userId);
    const userDoc = await getDoc(userRef);
    const currentCompositionsCount = userDoc.data().compositionsCount;

    if (currentCompositionsCount < 20) {
      const compositionsRef = collection(db, "compositions");
      const newDocRef = doc(compositionsRef);
      const docId = newDocRef.id;

      await setDoc(newDocRef, {
        userId: userId,
        name: name,
        compositionData: compositionData,
        compositionId: docId,
        date: serverTimestamp()
      });
      toast.success("Composition saved !", {
        position: "top-center"
      });

      await updateDoc(userRef, {
        compositionsCount: currentCompositionsCount + 1
      });
    } else {
      toast.error("You can't have more than 20 compositions", {
        position: "top-center"
      });
    }

  } catch (error) {
    console.error("Error creating document: ", error);
    toast.error("There was an error saving your composition!", {
      position: "top-center"
    });
  }
};

const deleteComposition = async (userId, compositionId) => {
  try {
    const compositionsRef = doc(db, "compositions", compositionId);
    await deleteDoc(compositionsRef);
    toast.success("Composition deleted !", {
      position: "top-center"
    });

    const userRef = doc(collection(db, "users"), userId);
    const userDoc = await getDoc(userRef);
    const currentCompositionsCount = userDoc.data().compositionsCount;

    await updateDoc(userRef, {
      compositionsCount: currentCompositionsCount - 1
    });
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

const getCompositions = async (userId) => {
  try {
    const compositionsRef = collection(db, "compositions");
    const q = query(
      compositionsRef,
      where("userId", "==", userId),
      orderBy("date", "desc")
    );

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

const fetchCompositionData = async (compositionId) => {
  try {
    const compositionRef = doc(db, "compositions", compositionId);
    const compositionDoc = await getDoc(compositionRef);
    if (compositionDoc.exists) 
    {
      const compositionData = compositionDoc.data().compositionData;
      return compositionData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching composition data');
  }
}

export { auth, createUserDocument, saveComposition, getCompositions, deleteComposition, fetchCompositionData };
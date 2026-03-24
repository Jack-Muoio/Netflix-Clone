import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "netflix-clone-1ba60.firebaseapp.com",
  projectId: "netflix-clone-1ba60",
  storageBucket: "netflix-clone-1ba60.firebasestorage.app",
  messagingSenderId: "12936986255",
  appId: "1:12936986255:web:2cded8448b54ba2428bafa",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    const cleanMessage = error.code.split("/")[1].split("-").join(" ");
    const capitalizedMessage =
      cleanMessage.charAt(0).toUpperCase() + cleanMessage.slice(1)

    toast.error(capitalizedMessage);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    const cleanMessage = error.code.split('/')[1].split('-').join(" ") + "s"
    const capitalizedMessage =
      cleanMessage.charAt(0).toUpperCase() + cleanMessage.slice(1)

    toast.error(capitalizedMessage);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };

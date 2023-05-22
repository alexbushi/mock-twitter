import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGp8r2ke9Kumjm-0AXzEfP6J64GvVJ0f0",
  authDomain: "mock-twitter-4b2f7.firebaseapp.com",
  projectId: "mock-twitter-4b2f7",
  storageBucket: "mock-twitter-4b2f7.appspot.com",
  messagingSenderId: "2276441421",
  appId: "1:2276441421:web:d6424148998f78b4d58b04",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      const username = user.displayName + user.uid.slice(0,6)
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        username: username,
        authProvider: "google",
        email: user.email,
        followers: [],
        following: []
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const username = user.displayName + user.uid.slice(0,6)
    await addDoc(collection(db, "users"), {
      // TODO: consolidate this logic into one function
      uid: user.uid,
      name: user.displayName,
      username: username,
      authProvider: "local",
      email,
      followers: [],
      following: []
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};

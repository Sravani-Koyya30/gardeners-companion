import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc 
} from "firebase/firestore";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "firebase/storage"; // 

const firebaseConfig = {
  apiKey: "AIzaSyALip2XNzY2DkQOp7Xg_As3xxLh30YLpgk",
  authDomain: "gardening-k.firebaseapp.com",
  projectId: "gardening-k",
  storageBucket: "gardening-k.firebasestorage.app",
  messagingSenderId: "924942612690",
  appId: "1:924942612690:web:88ba3e189d2d970152550b",
  measurementId: "G-8814G62HYC"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // 
const googleProvider = new GoogleAuthProvider();

export { 
  auth, 
  db, 
  storage,  // 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  doc, 
  getDoc, 
  setDoc, 
  ref,  // 
  uploadBytes,  // 
  getDownloadURL  // 
};
// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJjNE6U3Kfr3zug6IxU-66udYgPXzEmIY",
  authDomain: "social-media-376d9.firebaseapp.com",
  projectId: "social-media-376d9",
  storageBucket: "social-media-376d9.firebasestorage.app",
  messagingSenderId: "213264965318",
  appId: "1:213264965318:web:fe063bc5bb15e99518c1c7",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {
  auth,
  db,
  storage,
  onAuthStateChanged,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  updateProfile,
};

import React, { createContext, useState, useEffect, useReducer } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db, onAuthStateChanged } from "../firebase/firebase";
import {
  query,
  where,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { PostsReducer, postActions, postsStates } from "./postsReducer";

export const AuthContext = createContext();

const AppContext = ({ children }) => {
  const collectionUsersRef = collection(db, "users");
  const provider = new GoogleAuthProvider();

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const popup = await signInWithPopup(auth, provider);
      const user = popup.user;
      const q = query(collectionUsersRef, where("uid", "==", user.uid));
      const docs = await getDocs(q);

      if (docs.empty) {
        await addDoc(collectionUsersRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          authProvider: popup.providerId,
        });
      }
    } catch (err) {
      alert("Error signing in with Google: " + err.message);
    }
  };

  const loginWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert("Error logging in: " + err.message);
    }
  };

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collectionUsersRef, {
        uid: user.uid,
        name,
        providerId: "email/password",
        email: user.email,
      });
    } catch (err) {
      alert("Error registering: " + err.message);
    }
  };

  const sendPasswordToUser = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent.");
    } catch (err) {
      alert("Error sending password reset email: " + err.message);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      alert("Error signing out: " + err.message);
    }
  };

  const updateName = async (uid, name) => {
    try {
      const q = query(collectionUsersRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No such user exists!");
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userDocRef = doc(db, "users", userDoc.id);
      await updateDoc(userDocRef, { name });
      console.log("User name updated successfully!");

      const updatedUserData = { ...userData, name };
      setUserData(updatedUserData);

      await updateProfile(auth.currentUser, { displayName: name });

      setUser((prevUser) => ({ ...prevUser, displayName: name }));
    } catch (err) {
      alert("Error updating name: " + err.message);
    }
  };

  const updateBio = async (uid, bio) => {
    try {
      const q = query(collectionUsersRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No such user exists!");
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userDocRef = doc(db, "users", userDoc.id);

      await updateDoc(userDocRef, { bio });
      console.log("User bio updated successfully!");

      // Update the userData (local state) to reflect the change
      const updatedUserData = { ...userData, bio };
      setUserData(updatedUserData);

      // Update user in context to propagate the changes throughout the app
      setUser((prevUser) => ({
        ...prevUser,
        bio,
      }));
    } catch (err) {
      console.error("Error updating bio: ", err);
      alert("Error updating bio: " + err.message);
    }
  };

  const updateProfileImage = async (uid, photoURL) => {
    try {
      const q = query(collectionUsersRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No such user exists!");
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userDocRef = doc(db, "users", userDoc.id);
      await updateDoc(userDocRef, { image: photoURL });
      console.log("Profile image updated successfully!");
    } catch (err) {
      alert("Error updating profile image: " + err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const q = query(
          collectionUsersRef,
          where("uid", "==", currentUser.uid)
        );
        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const userDoc = snapshot.docs[0]?.data();
          setUserData(userDoc);
        });
        setUser(currentUser);

        if (window.location.pathname === "/") {
          navigate("/feed");
        }

        return () => unsubscribeSnapshot();
      } else {
        setUser(null);
        setUserData(null);

        if (window.location.pathname !== "/") {
          navigate("/");
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const contextValue = {
    signInWithGoogle,
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordToUser,
    signOutUser,
    updateName,
    updateProfileImage,
    updateBio,
    user,
    userData,
    posts: state.posts,
    error: state.error,
    submitPost: (posts) => dispatch({ type: postActions.SUBMIT_POST, posts }),
    addLikeToPost: (postId) =>
      dispatch({ type: postActions.ADD_LIKE_TO_POST, postId }),
    handleError: () => dispatch({ type: postActions.HANDLE_ERROR }),
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AppContext;

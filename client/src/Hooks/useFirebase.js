import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";

const auth = getAuth(app);

const useFireBase = () => {
  const [user, setUser] = useState(null);
  const [isLogIn, setIsLogIn] = useState(false);
  const [checkLogIn, setCheckLogIn] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [verifiedId, setVerifiedId] = useState(false);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  };

  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  }

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  }

// setting observer
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("inside auth state change", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    }
  }, [])

  // 

  return {
    loading,
    setLoading,
    user,
    setUser,
    createUser,
    logInUser,
    logOutUser,
    isLogIn,
    setIsLogIn,
    checkLogIn,
    setCheckLogIn,
    updateUserProfile,
  };
};

export default useFireBase;

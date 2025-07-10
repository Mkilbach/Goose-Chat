import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

import styles from "./styles.module.scss";

import { auth } from "../../firebase";
import { Loader } from "../Loader";

function SignIn() {
  const [initialAuthCheckFinished, setInitialAuthCheckFinished] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) setDisplayName(user?.displayName || null);
      else setDisplayName(null);
      setInitialAuthCheckFinished(true);
    });
  }, []);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signOutFromGoogle = () => signOut(auth).then(() => setDisplayName(null));

  if (!initialAuthCheckFinished) return <Loader height={30} />;
  if (displayName)
    return (
      <p>
        <span className={styles.userNameDisplay}>Signed as {displayName} </span>
        <button onClick={signOutFromGoogle}>Sign out</button>
      </p>
    );
  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

export default SignIn;

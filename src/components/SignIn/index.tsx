import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import styles from "./styles.module.scss";

import { auth } from "../../firebase";
import { Loader } from "../Loader";
import { useAuth } from "../../context/AuthContext";

function SignIn() {
  const { user, initialAuthCheckFinished } = useAuth();
  const displayName = user?.displayName ?? null;

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    signInWithPopup(auth, provider);
  };

  const signOutFromGoogle = () => signOut(auth);

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

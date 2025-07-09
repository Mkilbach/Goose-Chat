import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from '../../firebase';

function SignIn() {
  const [displayName, setdisplayName] = useState<string | null>(null);

  useEffect(() => {
    const currentAuth = getAuth();
    console.log(currentAuth.currentUser?.displayName);
    setdisplayName(currentAuth.currentUser?.displayName || null);
  }, []);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  if (displayName) return <p>Hello, {displayName}!</p>;
  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

export default SignIn;

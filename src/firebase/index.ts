import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "-",
  authDomain: "goose-chat-app.firebaseapp.com",
  projectId: "goose-chat-app",
  storageBucket: "goose-chat-app.firebasestorage.app",
  messagingSenderId: "847662549308",
  appId: "1:847662549308:web:e3d1af70c5b5816f9a7639",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

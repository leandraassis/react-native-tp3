import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB6b4Xj0uIxNN_Zf-cPkYc7zpca-j7Vo5M",
    authDomain: "atreact-1.firebaseapp.com",
    projectId: "atreact-1",
    storageBucket: "atreact-1.appspot.com",
    messagingSenderId: "1008784527534",
    appId: "1:1008784527534:web:eda64fa5aa47b7215f5d3f"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export default app;
  export const db = getFirestore(app);
  



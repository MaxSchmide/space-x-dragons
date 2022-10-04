import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const app = initializeApp({
  apiKey: "AIzaSyBcdQfl1Prs2fsMD0zTc3smJyUuTML5pVk",
  authDomain: "dragons-space-x.firebaseapp.com",
  projectId: "dragons-space-x",
  storageBucket: "dragons-space-x.appspot.com",
  messagingSenderId: "7202041748",
  appId: "1:7202041748:web:6142e81dce2950070aa981",
});
export const auth = getAuth(app);
export default app;

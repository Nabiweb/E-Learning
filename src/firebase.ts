// firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCAt-OeAoD5_yhkb9VMv_q4s1Mktg2McA0",
  authDomain: "ai-interview-4f972.firebaseapp.com",
  databaseURL: "https://ai-interview-4f972-default-rtdb.firebaseio.com",
  projectId: "ai-interview-4f972",
  storageBucket: "ai-interview-4f972.firebasestorage.app",
  messagingSenderId: "1022231007487",
  appId: "1:1022231007487:web:ee8bb7aa08ff0b53f33cca",
  measurementId: "G-G9J0FWSKHC"
};

// ✅ Use existing app if initialized, otherwise initialize
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };


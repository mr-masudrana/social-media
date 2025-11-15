import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfzGDMW6sHxx2QbWCFOvWAgG0PC8zugZQ",
  authDomain: "xapp-a2c69.firebaseapp.com",
  databaseURL: "https://xapp-a2c69-default-rtdb.firebaseio.com",
  projectId: "xapp-a2c69",
  storageBucket: "xapp-a2c69.firebasestorage.app",
  messagingSenderId: "420823317272",
  appId: "1:420823317272:web:9be2ee317a1a9f54783c6d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

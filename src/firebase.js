import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAijYkCPEDmSSrOLbRJjA3jg9F3UgKgdCM",
  authDomain: "chat-house-ff939.firebaseapp.com",
  projectId: "chat-house-ff939",
  storageBucket: "chat-house-ff939.appspot.com",
  messagingSenderId: "1006738333464",
  appId: "1:1006738333464:web:6e2240f91eb1b8f060886d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzWkfWo--0vQlpeUUAmhSES7HleTw0dCc",
  authDomain: "skinstore-80aa8.firebaseapp.com",
  databaseURL: "https://skinstore-80aa8-default-rtdb.firebaseio.com",
  projectId: "skinstore-80aa8",
  storageBucket: "skinstore-80aa8.appspot.com",
  messagingSenderId: "859645291837",
  appId: "1:859645291837:web:a586122e138ff7ac94e954",
  measurementId: "G-LSVW120JCX"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBHFPco9Mctq00t7dE1LEUrjbCZ-gTyiUQ",
  authDomain: "react-native-app-61912.firebaseapp.com",
  projectId: "react-native-app-61912",
  storageBucket: "react-native-app-61912.firebasestorage.app",
  messagingSenderId: "783432306839",
  appId: "1:783432306839:web:dd72ad2791e76bccfe59d2"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig): getApp();
const fireStore = getFirestore(app);

export { app, fireStore};
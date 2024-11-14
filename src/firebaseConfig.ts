import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAJy_ognmuLPEmgmP0_Ll9P7zqMuHRlOnM",
  authDomain: "app-reactnative-image.firebaseapp.com",
  projectId: "app-reactnative-image",
  storageBucket: "app-reactnative-image.firebasestorage.app",
  messagingSenderId: "449684628811",
  appId: "1:449684628811:web:3ed40dfe07aa01351174ce"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig): getApp();
const fireStore = getFirestore(app);

export { app, fireStore};
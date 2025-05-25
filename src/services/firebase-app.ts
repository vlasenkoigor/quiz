import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDpLupL8z7bzBGUNaveSufeM8V8kFJ6dys',
  authDomain: 'quiz-9d7e8.firebaseapp.com',
  projectId: 'quiz-9d7e8',
  storageBucket: 'quiz-9d7e8.appspot.com',
  messagingSenderId: '818073775018',
  appId: '1:818073775018:web:d55ccf2a3e81bf38a0d9d3',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage();

export const auth = getAuth();

console.log('auth.currentUser', auth.currentUser);

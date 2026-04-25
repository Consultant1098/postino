import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            "AIzaSyCkalJ0Bry9Jwp1hYToxnZY7fPopIWfC8M",
  authDomain:        "postino-86e15.firebaseapp.com",
  projectId:         "postino-86e15",
  storageBucket:     "postino-86e15.firebasestorage.app",
  messagingSenderId: "724354649200",
  appId:             "1:724354649200:web:8a27fbd5c2af538617f8b5",
}

const app = initializeApp(firebaseConfig)

export const auth          = getAuth(app)
export const db            = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
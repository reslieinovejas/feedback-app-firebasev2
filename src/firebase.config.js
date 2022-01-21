import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtYFIHUzEA-PoV672Ixjtt30WMgGdKkdU",
  authDomain: "feedback-app-79d3c.firebaseapp.com",
  projectId: "feedback-app-79d3c",
  storageBucket: "feedback-app-79d3c.appspot.com",
  messagingSenderId: "279549757437",
  appId: "1:279549757437:web:625cae94b3f44ee18c7b94"
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCNYkW29l5mQiCv1uoezalqF5QnszBb3wA",
    authDomain: "r-lamsal-books-backend.firebaseapp.com",
    projectId: "r-lamsal-books-backend",
    storageBucket: "r-lamsal-books-backend.firebasestorage.app",
    messagingSenderId: "596752075476",
    appId: "1:596752075476:web:e978cdaf8837dfb92ac941",
    measurementId: "G-ZVR4EL7F7Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, collection, addDoc, getDocs, deleteDoc, doc, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged };
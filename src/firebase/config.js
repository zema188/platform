import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage, } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDHVm4_wl2OyrXes6S2O33RturQ1boQDLI",
    authDomain: "platform-89f1c.firebaseapp.com",
    projectId: "platform-89f1c",
    storageBucket: "platform-89f1c.appspot.com",
    messagingSenderId: "234494138620",
    appId: "1:234494138620:web:08d831994e1d9770dfdf79",
};

const firebaseApp = initializeApp(firebaseConfig)
const storage = getStorage();

// const db = getDatabase();

const db = getFirestore()
export { storage, firebaseApp, db}
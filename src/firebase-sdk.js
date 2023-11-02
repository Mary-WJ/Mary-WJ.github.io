// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGYKxUd3tZlY2YjjQOM3DUU3ifcLQjTGE",
  authDomain: "webportfolio-project.firebaseapp.com",
  projectId: "webportfolio-project",
  storageBucket: "webportfolio-project.appspot.com",
  messagingSenderId: "401120673449",
  appId: "1:401120673449:web:3538ca9616734fb6f0b3b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


export{
  db,
  app
}


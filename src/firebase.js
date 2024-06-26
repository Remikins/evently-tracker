// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';




const firebaseConfig = {
  apiKey: "AIzaSyC0c9l04L0Il_D9sQjrjnWmwP3umjXl8cE",
  authDomain: "evently-8948f.firebaseapp.com",
  projectId: "evently-8948f",
  storageBucket: "evently-8948f.appspot.com",
  messagingSenderId: "465386853190",
  appId: "1:465386853190:web:4b181b391d9cfb2c814b47",
  measurementId: "G-TBT5C062G7"
};

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// export const storage = firebase.storage();
// export const auth = firebase.auth();

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

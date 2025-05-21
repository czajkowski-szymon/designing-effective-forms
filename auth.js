// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBS34QNklunPTA9BudGYkqgIpuPpsPMr_A",
  authDomain: "tpf-lab04-c0bde.firebaseapp.com",
  projectId: "tpf-lab04-c0bde",
  storageBucket: "tpf-lab04-c0bde.firebasestorage.app",
  messagingSenderId: "577086452939",
  appId: "1:577086452939:web:7361f8662864c5b3ac174e",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

const userSignIn = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      fillInputs(user);
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const userSignOut = async () => {
  signOut(auth)
    .then(() => {
      alert("You have been signed out!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    alert("You are authenticated with Google");
    console.log(user);
  }
});

const fillInputs = (user) => {
    const firstNameInput = document.querySelector('#firstName');
    const lastNameInput = document.querySelector('#lastName');
    const emailInput = document.querySelector('#exampleInputEmail1');

    firstNameInput.value = user.displayName.split(' ')[0].trim();
    lastNameInput.value = user.displayName.split(' ')[1].trim();
    emailInput.value = user.email
}

signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);

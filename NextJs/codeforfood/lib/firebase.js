// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzWdIqsJjOj78_c6z0jdC83slvOsd0QxQ",
  authDomain: "code-for-foodies.firebaseapp.com",
  projectId: "code-for-foodies",
  storageBucket: "code-for-foodies.appspot.com",
  messagingSenderId: "843184335446",
  appId: "1:843184335446:web:daf6da1ec5894323e329f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };

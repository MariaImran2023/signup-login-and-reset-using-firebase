// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrg7b2ruRIawz0DrConMgXuGrp_Pf7RGE",
  authDomain: "task-2-react-internship.firebaseapp.com",
  projectId: "task-2-react-internship",
  storageBucket: "task-2-react-internship.appspot.com",
  messagingSenderId: "359392193628",
  appId: "1:359392193628:web:445c0763e3593bb2208a99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };


  
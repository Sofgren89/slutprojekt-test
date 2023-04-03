// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, deleteUser as firebaseDeleteUser } from 'firebase/auth';
import { getDatabase, ref, set, get, push, update,child } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-M0R-iKq9Zwn5N2cG6UYU680ZbzBcIuc",
  authDomain: "slutprojekt-js2-e3d5d.firebaseapp.com",
  databaseURL: "https://slutprojekt-js2-e3d5d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "slutprojekt-js2-e3d5d",
  storageBucket: "slutprojekt-js2-e3d5d.appspot.com",
  messagingSenderId: "452431962068",
  appId: "1:452431962068:web:9599aea08b068ded174041",
  measurementId: "G-VS1CBGR1BB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth();

// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { getDatabase, push, ref, set } from "firebase/database";


export const createAccount = async (
  email: string,
  password: string,
  username: string,
  profilePicture: string
) => {
  try {
    console.log('Logging in...');
    // Create user with email and password
    const auth = getAuth(app);
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    // Add user data to database
    const db = getDatabase(app);
    const usersRef = ref(db, "users");
    const userRef = push(usersRef);
    await set(userRef, {
      
      username,
      profilePicture,
    });

    // Return user object
    return user;
  } catch (error) {
    throw error;
  }
};
//inloggnings funktionen
export const login = (email: string, password: string): Promise<void> => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
    });
  };

export {createUserWithEmailAndPassword}
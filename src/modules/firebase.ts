// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, deleteUser as firebaseDeleteUser } from 'firebase/auth';
import { getDatabase, ref, set, get, push, update,child, remove } from 'firebase/database';




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

const database = getDatabase(app);
console.log(database)
const auth = getAuth();






export const createAccount = async (
  email: string,
  password: string,
  username: string,
  profilePicture: string
) => {
  try {
    // console.log('Logga in...');
    // Create user with email and password
    const auth = getAuth(app);
    const  userCredential  = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Add user data to database
    const db = getDatabase(app);
    const userRef = ref(db, `users/${user.uid}`);
  
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


//radera konto
export const deleteUser = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User not logged in');
  }

  // Delete user data from the Realtime Database
  const db = getDatabase();
  const userRef = ref(db, `users/${user.uid}`);
  await remove(userRef);

  // Delete the user's account
  try {
    await firebaseDeleteUser(user);
  } catch (error) {
    throw error;
  }
};



  // logga ut
  export const signOut = async () => {
    const auth = getAuth();
  
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      throw error;
    }
  };


export {createUserWithEmailAndPassword}
export {firebaseConfig}



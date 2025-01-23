// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {addDoc, collection, getFirestore} from 'firebase/firestore'
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfQ1kGbIUTK2HsPJZs_JYx6q6fJQNdJTs",
  authDomain: "netflix-clone-dd087.firebaseapp.com",
  projectId: "netflix-clone-dd087",
  storageBucket: "netflix-clone-dd087.appspot.com",
  messagingSenderId: "793676831844",
  appId: "1:793676831844:web:c783b76c9d2f88f2a35371"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name,email,password)=>{
    try{
      const res = await createUserWithEmailAndPassword(auth,email,password)
      const user = res.user
      await addDoc(collection(db,'user'),{
        uid:user.uid,
        name,
        email,
        authProvider:'local'
      })
    }
    catch(err){
      
      toast.error(err.code.split('/')[1].split('-').join(' '))
      
    }
}

const login = async (email,password)=>{
  try {
    await signInWithEmailAndPassword(auth,email,password)
  } catch (error) {
    console.log('hello',error.code);
    
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
}
const logout= ()=>{
  signOut(auth)
}

export {auth,db,signup,login,logout};
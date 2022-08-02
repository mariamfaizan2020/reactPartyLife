import React, { useEffect,useState } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import {getAuth,onAuthStateChanged} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyDXluxPzhyP-PzlISLUlElfE7UbfCyIPy0",
  authDomain: "rntest-4f44d.firebaseapp.com",
  projectId: "rntest-4f44d",
  storageBucket: "rntest-4f44d.appspot.com",
  messagingSenderId: "120788929170",
  appId: "1:120788929170:web:7d309326dff77dce71f44b"
};

const firebase=initializeApp(firebaseConfig)
// const db =getFirestore(firebase)
const auth=getAuth()

// export function signIn(email,password){
//     return signInWithEmailAndPassword(auth,email,password)
// }
//custom Hook
export function useAuth(){
  const [currentUser,setCurrentUser]=useState()
useEffect(()=>{
  const unsub=onAuthStateChanged(auth,user=>setCurrentUser(user))
  return unsub;
}
,[])
  return currentUser;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

export default firebase;
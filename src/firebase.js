import firebase from "firebase"
const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyDBiZL5t2etb5ZX8j1DujbuTCTEnvYlBw8",
    authDomain: "instagram-9618b.firebaseapp.com",
    projectId: "instagram-9618b",
    storageBucket: "instagram-9618b.appspot.com",
    messagingSenderId: "489546648946",
    appId: "1:489546648946:web:ff986d5515ef9d963d21eb",
    measurementId: "G-870ZD6ZP4Z"

})
const db=firebaseApp.firestore();

const auth=firebase.auth();
const storage=firebase.storage();
export{db,auth,storage}



  
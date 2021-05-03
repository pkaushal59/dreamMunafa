import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCs9RzbNVb61CL4kxx0J0L2Y4X94LJ1IA0",
    authDomain: "clone-8b84b.firebaseapp.com",
    projectId: "clone-8b84b",
    storageBucket: "clone-8b84b.appspot.com",
    messagingSenderId: "492885265530",
    appId: "1:492885265530:web:beeac07a76da76a326ffc3",
    measurementId: "G-LMBLMLVG79"
};

const fireBaseApp = firebase.initializeApp(firebaseConfig);

const db = fireBaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
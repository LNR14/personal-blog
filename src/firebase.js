import * as firebase from "firebase/app";
import "firebase/auth"
import "firebase/database"


const firebaseConfig = {
    apiKey: "AIzaSyA22VYJ-sBF37vj2bUB5LND5HdduxCL_C4",
    authDomain: "react-blog-demo-6d8e1.firebaseapp.com",
    databaseURL: "https://react-blog-demo-6d8e1.firebaseio.com",
    projectId: "react-blog-demo-6d8e1",
    storageBucket: "react-blog-demo-6d8e1.appspot.com",
    messagingSenderId: "481564152607",
    appId: "1:481564152607:web:96822927c235c27bedd62a",
    measurementId: "G-9EQ6GM2VKB"
  };

firebase.initializeApp(firebaseConfig)

export default firebase
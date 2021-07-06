import firebase from "firebase"
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyCAfy_6tVkGat9sBRKMLBgOqyP5rIFZVpU",
    authDomain: "niii-fba77.firebaseapp.com",
    projectId: "niii-fba77",
    storageBucket: "niii-fba77.appspot.com",
    messagingSenderId: "143969709978",
    appId: "1:143969709978:web:57ae8d66bbe389dfe59423",
    measurementId: "G-XC2WEP2ELW"
};
// Initialize Firebase

export default firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();

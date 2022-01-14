import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore-lite.js';
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDGyliCvD8UjUOAphjguLLuH55E-Y4r9Uo",
    authDomain: "turnkey-agility-338113.firebaseapp.com",
    databaseURL: "https://turnkey-agility-338113-default-rtdb.firebaseio.com",
    projectId: "turnkey-agility-338113",
    storageBucket: "turnkey-agility-338113.appspot.com",
    messagingSenderId: "796393754460",
    appId: "1:796393754460:web:ab34cf0f23a5bda3acbb99",
    measurementId: "G-R75G7P7N72"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}
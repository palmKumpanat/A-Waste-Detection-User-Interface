import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqHfCSV3SBQ2pN9UE4Gjk719xl45yc7y8",
  authDomain: "waste-detection-61420.firebaseapp.com",
  projectId: "waste-detection-61420",
  storageBucket: "waste-detection-61420.appspot.com",
  messagingSenderId: "1051945399334",
  appId: "1:1051945399334:web:3433b7a7beb7be9285e2e7",
  measurementId: "G-M1LDL7PT49",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

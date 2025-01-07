// Initialize Firestore through Firebase
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyAk-E1Asdy3cKqYvKGQJq2BapaYuZ1sZnk',
  authDomain: '',
  projectId: 'okra-menu'
});

const db = getFirestore();


import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCz7pmgJbzLpNgkmTVfYg3GVop5J6qyGTA',
  authDomain: 'iit-b-assignment.firebaseapp.com',
  projectId: 'iit-b-assignment',
  storageBucket: 'iit-b-assignment.appspot.com',
  messagingSenderId: '340635105888',
  appId: '1:340635105888:web:7acc9839c60fdd21f32105',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const storage = getStorage();

export { auth, googleProvider, githubProvider, storage };
export default db;

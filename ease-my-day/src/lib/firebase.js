
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBmDsOTLHuyye1RYaMe-29MvlnGrYgysAU",
  authDomain: "ease-my-job.firebaseapp.com",
  projectId: "ease-my-job",
  storageBucket: "ease-my-job.firebasestorage.app",
  messagingSenderId: "970694059617",
  appId: "1:970694059617:web:f00aefe3b6e55515e5ec20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
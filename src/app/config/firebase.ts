import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider, signInWithPopup} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyvDdp7czRzWe2pPRoS-1KcA5S0dQxgB4",
  authDomain: "jobee-e1745.firebaseapp.com",
  projectId: "jobee-e1745",
  storageBucket: "jobee-e1745.appspot.com",
  messagingSenderId: "1038559977891",
  appId: "1:1038559977891:web:29444364c5a7a85d1eba16",
  measurementId: "G-9KRS9RQV5H"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


const provider= new GoogleAuthProvider()

export const signInnWithGooogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const data = {
      username: result.user.displayName,
      email: result.user.email,
      password: "signin with google"
    };
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

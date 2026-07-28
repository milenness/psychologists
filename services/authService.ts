import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

interface LoginData {
  email: string;
  password: string;
}

export async function registerUser({ email, password, name }: RegisterData) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName: name });
  }

  return userCredential.user;
}

export async function loginUser({ email, password }: LoginData) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );

  return userCredential.user;
}

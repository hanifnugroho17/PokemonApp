import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

export const login = (email, pass) => auth().signInWithEmailAndPassword(email, pass);

export const register = (email, pass) => auth().createUserWithEmailAndPassword(email, pass);

export const forgetPassword = (email) => auth().sendPasswordResetEmail(email);

export const signInSocialMedia = (credential) => auth().signInWithCredential(credential);

export const signOut = () => auth().signOut();

export const databaseRef = () => firebase
  .app()
  .database('https://pokemonapp-4e8f3-default-rtdb.asia-southeast1.firebasedatabase.app/');
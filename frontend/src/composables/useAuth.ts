import router from '@/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useProfile } from './useProfile';
import type { IProfile } from '../interfaces/IProfile';

export function useAuth() {
  // sign in user
  const login = (
    email: string,
    password: string,
    setErrorMessage?: (message: string) => void,
  ) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        router.push('home');
      })
      .catch((error) => {
        setErrorMessage && setErrorMessage(error.message);
      });
  };

  // register new user in firebase
  const register = (
    email: string,
    password: string,
    profileData: IProfile,
    onError?: (message: string) => void,
  ) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        // when account is created save the profile data with its coordinates
        useProfile().saveProfileWithGeocoding(
          profileData,
          () => {
            router.push('home');
          },
          res.user!.uid,
        );
      })
      .catch((error) => {
        onError && onError(error.message);
      });
  };

  // sign out user
  const logout = () => {
    firebase.auth().signOut();
  };

  // returns a promise of currently authenticated user
  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  };

  return { login, register, logout, getCurrentUser };
}

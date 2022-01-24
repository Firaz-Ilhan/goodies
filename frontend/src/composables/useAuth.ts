import router from '@/router';
import { auth } from '@/main';
import { useProfile } from './useProfile';
import type { IProfile } from '../interfaces/IProfile';

export function useAuth() {
  // sign in user
  const login = (
    email: string,
    password: string,
    onError?: (message: Error) => void,
  ) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        router.push('home');
      })
      .catch((error) => {
        onError && onError(error);
      });
  };

  // register new user in firebase
  const register = (
    email: string,
    password: string,
    profileData: IProfile,
    onError?: (message: Error) => void,
  ) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        // when account is created save the profile data with its coordinates
        useProfile()
          .saveProfileWithGeocoding(profileData, res.user!.uid)
          .then(() => {
            router.push('home');
          });
      })
      .catch((error) => {
        onError && onError(error);
      });
  };

  // sign out user
  const logout = () => {
    auth.signOut();
  };

  // returns a promise of currently authenticated user
  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  };

  return { login, register, logout, getCurrentUser };
}

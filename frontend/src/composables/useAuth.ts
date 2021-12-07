import router from '@/router';
import firebase from 'firebase';

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
    setErrorMessage?: (message: string) => void,
  ) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        router.push('home');
      })
      .catch((error) => {
        setErrorMessage && setErrorMessage(error.message);
      });
  };

  // sign out user
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .catch((error: Error) => {
        console.log(error.message);
      });
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

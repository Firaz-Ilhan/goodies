import router from '@/router';
import firebase from 'firebase';

export function useAuth() {
  // TODO use the error and display it when calling the function
  // sign in user
  const login = (email: string, password: string) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        router.push('home');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // register new user in firebase
  const register = (email: string, password: string) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        router.push('home');
      })
      .catch((error) => {
        console.log(error.message);
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

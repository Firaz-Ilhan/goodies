import { IProfile } from '@/interfaces/IProfile';
import { db } from '@/main';
import firebase from 'firebase';

export function useProfile() {
  // save/update profile
  const saveProfile = (
    profileData: IProfile,
    onSuccessToast: () => boolean,
  ) => {
    const currentUser = firebase.auth().currentUser!;
    db.collection('profiles')
      .doc(currentUser.uid)
      // maybe check if it exist and use update instead
      .set({ ...profileData })
      .then(() => {
        onSuccessToast();
      });
  };

  // try to fetch profile data of current user
  const getProfileData = (setterFunction: (profileData: IProfile) => void) => {
    const currentUser = firebase.auth().currentUser!;

    db.collection('profiles')
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setterFunction(doc.data() as IProfile);
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  };

  return { saveProfile, getProfileData };
}

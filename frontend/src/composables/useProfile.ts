import { IProfile } from '../interfaces/IProfile';
import { db } from '@/main';
import firebase from 'firebase';

export function useProfile() {
  const currentUser = firebase.auth().currentUser!;
  const profileCollection = db.collection('/profiles');

  // save/update profile
  const saveProfile = async (profileData: IProfile, onSuccess?: () => void) => {
    console.log(profileData);
    profileCollection
      .doc(currentUser.uid)
      .set({ ...profileData }, { merge: true })
      .then(() => {
        onSuccess && onSuccess();
      });
  };

  // try to fetch profile data of current user
  const resolveProfileId = (
    profileId: string,
    onSuccess: (profileData: IProfile) => void,
    onError?: (error: Error) => void,
  ) => {
    profileCollection
      .doc(profileId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          onSuccess(doc.data() as IProfile);
        }
      })
      .catch((error) => {
        onError && onError(error);
      });
  };

  // //
  // const updateCurrentLocation = (
  //   position: ILocation,
  //   onSuccess: () => void,
  // ) => {
  //   const currentUser = firebase.auth().currentUser!;
  //   db.collection('profiles')
  //     .doc(currentUser.uid)
  //     .set({ currentPosition: position }, { merge: true })
  //     .then(() => {
  //       console.log(position);
  //       onSuccess();
  //     });
  // };

  return { saveProfile, resolveProfileId };
}

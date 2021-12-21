import { IProfile } from '@/interfaces/IProfile';
import { db } from '@/main';
import firebase from 'firebase';

export function useProfile() {
  // save/update profile
  const saveProfile = async (profileData: IProfile, onSuccess: () => void) => {
    const currentUser = firebase.auth().currentUser!;
    db.collection('profiles')
      .doc(currentUser.uid)
      .set({ ...profileData }, { merge: true })
      .then(() => {
        console.log(profileData);
        onSuccess();
      });
  };

  // try to fetch profile data of current user
  const resolveProfileId = (
    profileId: string,
    onSuccess: (profileData: IProfile) => void,
  ) => {
    db.collection('profiles')
      .doc(profileId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          onSuccess(doc.data() as IProfile);
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  };

  return { saveProfile, resolveProfileId };
}

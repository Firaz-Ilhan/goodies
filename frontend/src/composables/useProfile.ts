import firebase from 'firebase/app';
import 'firebase/auth';
import { db } from '@/main';
import { useGeolocation } from './useGeolocation';
import type { IProfile } from '../interfaces/IProfile';
import type { ILocation } from '../interfaces/ILocation';

export function useProfile() {
  const currentUser = firebase.auth().currentUser!;
  const profileCollection = db.collection('/profiles');

  // save/update profile
  const saveProfile = async (
    profileData: IProfile,
    onSuccess?: () => void,
    profileId?: string,
  ) => {
    profileCollection
      .doc(profileId || currentUser.uid)
      .set({ ...profileData }, { merge: true })
      .then(() => {
        onSuccess && onSuccess();
      });
  };

  // geocode address first and save profile with geocoordinates
  const saveProfileWithGeocoding = (
    profileData: IProfile,
    onSuccess?: () => void,
    profileId?: string,
  ) => {
    const { street, city, postalcode } = profileData;
    const formattedAddress = `${street}, ${city}, ${postalcode}`;

    useGeolocation()
      .geoCodeAdress(formattedAddress)
      .then((geocoordinates) => {
        profileData.geocoords = geocoordinates as ILocation;

        saveProfile(profileData, onSuccess, profileId);
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

  const watchProfileChanges = (
    profileId: string,
    setterFunction: (profileData: IProfile) => void,
  ) => {
    profileCollection.doc(profileId).onSnapshot((doc) => {
      setterFunction(doc.data() as IProfile);
    });
  };

  return {
    saveProfile,
    saveProfileWithGeocoding,
    resolveProfileId,
    watchProfileChanges,
  };
}

import { auth, db } from '@/main';
import { useGeolocation } from './useGeolocation';
import type { IProfile } from '../interfaces/IProfile';
import type { ILocation } from '../interfaces/ILocation';

export function useProfile() {
  const currentUser = auth.currentUser!;
  const profileCollection = db.collection('/profiles');

  // save/update profile
  const saveProfile = (profileData: IProfile, profileId?: string) => {
    return new Promise((resolve) => {
      profileCollection
        .doc(profileId || currentUser.uid)
        .set({ ...profileData }, { merge: true })
        .then((res) => resolve(res));
    });
  };

  // geocode address first and save profile with geocoordinates
  const saveProfileWithGeocoding = (
    profileData: IProfile,
    profileId?: string,
  ) => {
    const { street, city, postalcode } = profileData;
    const formattedAddress = `${street}, ${city}, ${postalcode}`;

    return new Promise((resolve) => {
      useGeolocation()
        .geoCodeAdress(formattedAddress)
        .then((geocoordinates) => {
          profileData.geocoords = geocoordinates as ILocation;

          saveProfile(profileData, profileId).then(() => resolve(profileId));
        });
    });
  };

  // try to fetch profile data of current user
  const resolveProfileId = (profileId: string): Promise<IProfile> => {
    return new Promise((resolve, reject) => {
      profileCollection
        .doc(profileId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            resolve(doc.data() as IProfile);
          }
        })
        .catch((error) => {
          reject(error);
        });
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

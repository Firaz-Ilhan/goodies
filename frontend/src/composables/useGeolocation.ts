import { db, loader } from '@/main';
import { Geolocation, Position } from '@capacitor/geolocation';
import geodata from '@/assets/mocking/geodata';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as geofire from 'geofire-common';
import { useProfile } from './useProfile';
import type { ILocation } from '@/interfaces/ILocation';
import type { IProfile } from '@/interfaces/IProfile';

let watchId: string | null = null;

export function useGeolocation() {
  const user = firebase.auth().currentUser!;

  // start watching geolocation changes of a user
  const startWatch = async () => {
    // reassure that only one watch at a time is running
    if (!watchId) {
      const watcher = await Geolocation.watchPosition(
        {},
        (position: Position | null) => {
          console.log('pos', position);
          console.log('watchId', watchId);
          if (position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const geohash = geofire.geohashForLocation([lat, lng]);

            const lastPosition: ILocation = { lat, lng, geohash };
            useProfile().saveProfile({ ...({} as IProfile), lastPosition });
            if (watcher) watchId = watcher;
          }
        },
      ).catch((e: Error) => {
        console.log(e.message);
      });
    }
  };

  // use if user got no more orders in the inLieferung state
  // stop the watch subscription
  const stopWatch = async () => {
    if (watchId) {
      const countQueriedOrder = await db
        .collection('orders')
        .where('supplier', '==', user.uid)
        .where('orderState', '==', 'in Lieferung')
        .get();

      if (countQueriedOrder.docs.length > 1) {
        await Geolocation.clearWatch({ id: watchId });
      }

      console.log(`Watch with id ${watchId} is cleared`);
      watchId = null;
    }
  };

  // get object of current geolocation coordinates
  const getCurrentCoordinates = async () => {
    const geoposition = await Geolocation.getCurrentPosition();
    return {
      lat: Number(geoposition.coords.latitude.toFixed(4)),
      lng: Number(geoposition.coords.longitude.toFixed(4)),
    };
  };

  // simulates a movement by emitting a new position every 5 seconds
  const getMockedLocation = async (
    setterFunction: (locationState: ILocation) => void,
  ) => {
    // get data points
    const coordinates = geodata.features[0].geometry.coordinates;
    const timer = (seconds: number) =>
      new Promise((res) => setTimeout(res, seconds * 1000));

    for (let i = 0; i < coordinates.length; i += 5) {
      const [lng, lat] = coordinates[i] as number[];
      setterFunction({ lat, lng });
      // wait 5seconds
      await timer(5);
    }
  };

  // translates an address into a coordinates with a firestore geohash
  const geoCodeAdress = (address: string) => {
    return new Promise((resolve) => {
      loader.load().then((google) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address }, (res: any) => {
          const resPosition = {
            lat: res[0].geometry.location.lat(),
            lng: res[0].geometry.location.lng(),
          };
          const geohash = geofire.geohashForLocation([
            resPosition.lat,
            resPosition.lng,
          ]);

          resolve({ ...resPosition, geohash });
        });
      });
    });
  };

  return {
    startWatch,
    stopWatch,
    getCurrentCoordinates,
    geoCodeAdress,
    getMockedLocation,
  };
}

import { ref } from 'vue';
import { auth, db, loader } from '@/main';
import { Geolocation, Position } from '@capacitor/geolocation';
import { geohashForLocation } from 'geofire-common';

import { useProfile } from './useProfile';
import type { ILocation } from '@/interfaces/ILocation';
import type { IProfile } from '@/interfaces/IProfile';
import geodata from '@/assets/mocking/geodata';

const watchId = ref<string | null>(null);

export function useGeolocation() {
  const user = auth.currentUser!;

  // start watching geolocation changes of a user
  const startWatch = async () => {
    // reassure that only one watch at a time is running
    if (!watchId.value) {
      const watcher = await Geolocation.watchPosition(
        {},
        (position: Position | null) => {
          if (position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const geohash = geohashForLocation([lat, lng]);

            const lastPosition: ILocation = { lat, lng, geohash };
            useProfile().saveProfile({ lastPosition } as IProfile);
          }
        },
      );
      if (watcher) watchId.value = watcher;
    }
  };

  // clear watch if no other orders should be watched
  const stopWatch = async () => {
    // only if a watch is currently active
    if (watchId.value) {
      const countQueriedOrder = await db
        .collection('orders')
        .where('supplier', '==', user.uid)
        .where('orderState', '==', 'in Lieferung')
        .get();

      // only clear if there are no other orders in delivery state
      if (countQueriedOrder.docs.length <= 1) {
        await Geolocation.clearWatch({ id: watchId.value });
        watchId.value = null;
      }
    }
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
      // wait 5 seconds
      await timer(5);
    }
  };

  // translates an address into a coordinates with a geohash
  const geoCodeAdress = (address: string) => {
    return new Promise((resolve) => {
      loader.load().then((google) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address }, (res: any) => {
          const resPosition = {
            lat: res[0].geometry.location.lat(),
            lng: res[0].geometry.location.lng(),
          };
          const geohash = geohashForLocation([
            resPosition.lat,
            resPosition.lng,
          ]);
          resolve({ ...resPosition, geohash });
        });
      });
    });
  };

  return {
    watchId,
    startWatch,
    stopWatch,
    geoCodeAdress,
    getMockedLocation,
  };
}

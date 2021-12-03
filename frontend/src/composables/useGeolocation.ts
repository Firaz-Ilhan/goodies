import { Geolocation, Position } from '@capacitor/geolocation';

let watchId: string | void;

export function useGeolocation() {
  // start watching geolocation changes of a user
  const startWatch = async () => {
    const coordinates = await Geolocation.watchPosition(
      {},
      (position: Position | null) => {
        console.log('pos', position);
        // TODO save to firebase ? too much data ?
        return position;
      },
    ).catch((e: Error) => {
      console.log(e.message);
    });
    console.log('coord', coordinates);
    watchId = coordinates;
  };

  // stop the watch
  const stopWatch = () => {
    if (watchId) {
      Geolocation.clearWatch({ id: watchId });
      console.log(`Watch with id ${watchId} is cleared`);
    }
  };

  const getCurrentPosition = async () => {
    return await Geolocation.getCurrentPosition();
  };

  return { startWatch, stopWatch, getCurrentPosition };
}

import { loader } from '@/main';
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
    watchId = coordinates;
  };

  // stop the watch subscription
  const stopWatch = () => {
    if (watchId) {
      Geolocation.clearWatch({ id: watchId });
      console.log(`Watch with id ${watchId} is cleared`);
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

  // translates an address into a coordinates
  const geoCodeAdress = async (address: string) => {
    loader.load().then((google) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(address, (res: any) => {
        const resPosition = {
          lat: res[0].geometry.location.lat(),
          lng: res[0].geometry.location.lng(),
        };
        console.log(res[0].formatted_address);
        console.log(resPosition);
        return resPosition;
      });
    });
  };

  return { startWatch, stopWatch, getCurrentCoordinates, geoCodeAdress };
}

import { loader } from '@/main';
import { Geolocation, Position } from '@capacitor/geolocation';
import geodata from '@/assets/mocking/geodata';
import { ILocation } from '@/interfaces/ILocation';

let watchId: string | void;

export function useGeolocation() {
  // start watching geolocation changes of a user
  const startWatch = async () => {
    const coordinates = await Geolocation.watchPosition(
      {},
      (position: Position | null) => {
        console.log('pos', position);
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

  return {
    startWatch,
    stopWatch,
    getCurrentCoordinates,
    geoCodeAdress,
    getMockedLocation,
  };
}

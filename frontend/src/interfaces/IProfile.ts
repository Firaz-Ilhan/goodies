import { ILocation } from './ILocation';

export interface IProfile {
  firstname: string;
  lastname: string;
  street: string;
  city: string;
  postalcode: string;
  telephone: string;
  payment: 'barzahlung' | 'paypal';
  geocoords: ILocation;
  lastPosition?: ILocation;
}

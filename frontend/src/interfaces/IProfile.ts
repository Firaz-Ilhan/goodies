
export interface IProfile {
  firstname: string;
  lastname: string;
  street: string;
  location: string;
  postalcode: string;
  telephone: string;
  payment: 'barzahlung' | 'paypal';
};
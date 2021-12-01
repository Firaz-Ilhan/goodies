import { IListEntry } from './IListEntry';

export interface IOrder {
  id: string;
  name: string;
  list: IListEntry[];
  orderState: 'open' | 'accepted' | 'inDelivery' | 'completed';
  createdBy: string;
  supplier?: string;
}

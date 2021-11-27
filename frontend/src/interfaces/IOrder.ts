import { IListEntry } from './IListEntry';

export interface IOrder {
  id: string;
  name: string;
  list: IListEntry[];
  createdBy: string;
}

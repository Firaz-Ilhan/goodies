import { IListEntry } from './IListEntry';

export interface IOrder {
  id: string;
  name: string;
  list: IListEntry[];
  orderState: 'offen' | 'angenommen' | 'in Lieferung' | 'abgeschlossen';
  createdBy: string;
  createdAt: number;
  supplier: string | null;
}

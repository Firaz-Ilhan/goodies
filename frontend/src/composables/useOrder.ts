import { IListEntry } from '@/interfaces/IListEntry';
import { IOrder } from '@/interfaces/IOrder';

export function useOrder() {
  // calculates total amount of all items in an order list
  const calculateTotalArticleAmount = (list: IOrder['list']) => {
    let sum = 0;
    list.map((entry: IListEntry) => {
      sum += Number(entry.amount);
    });
    return sum;
  };

  return { calculateTotalArticleAmount };
}

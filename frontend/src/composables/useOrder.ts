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

  // returns matching color for each order state
  const getOrderStateColor = (orderState: IOrder['orderState']) => {
    switch (orderState) {
      case 'offen':
        return 'success';
      case 'abgeschlossen':
        return 'danger';
      default:
        return 'primary';
    }
  };

  return { calculateTotalArticleAmount, getOrderStateColor };
}

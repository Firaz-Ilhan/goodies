import { IListEntry } from '@/interfaces/IListEntry';
import { IOrder } from '@/interfaces/IOrder';
import { db } from '@/main';
import firebase from 'firebase';

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

  // updates the
  const setOrderState = (docId: string, state: IOrder['orderState']) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection('orders').doc(docId).update({ orderState: state });
      }
    });
  };

  return { calculateTotalArticleAmount, getOrderStateColor, setOrderState };
}

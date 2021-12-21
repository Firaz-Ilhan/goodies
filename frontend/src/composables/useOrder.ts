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

  // updates the order state of a certain order
  const setOrderState = (docId: string, state: IOrder['orderState']) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection('orders').doc(docId).update({ orderState: state });
      }
    });
  };

  // fetches all orders of a user and update a reactive array
  // optionally set isPersonal to false to get all orders that were not created by yourself (delivery-mode)
  const populateOrders = (orders: IOrder[], isPersonal = true) => {
    const user = firebase.auth().currentUser!;
    const operator = isPersonal ? '==' : '!=';

    db.collection('orders')
      .where('createdBy', operator, user.uid)
      .onSnapshot((docData: firebase.firestore.DocumentData) => {
        const changes = docData.docChanges();
        changes.forEach((change: firebase.firestore.DocumentChange) => {
          if (change.type === 'added') {
            orders.push({
              ...(change.doc.data() as IOrder),
              id: change.doc.id,
            });
            // sort by latest
            orders.sort((a: IOrder, b: IOrder) => {
              return b.createdAt - a.createdAt;
            });
          } else if (change.type === 'modified') {
            const index = orders.findIndex(
              (order: IOrder) => order.id === change.doc.id,
            );
            orders[index] = {
              ...(change.doc.data() as IOrder),
              id: change.doc.id,
            };
          } else {
            // remove deleted document from orders
            orders = orders.filter(
              (order: IOrder) => order.id !== change.doc.id,
            );
          }
        });
      });
  };

  return {
    calculateTotalArticleAmount,
    getOrderStateColor,
    setOrderState,
    populateOrders,
  };
}

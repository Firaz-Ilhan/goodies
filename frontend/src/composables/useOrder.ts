import { IListEntry } from '@/interfaces/IListEntry';
import { IOrder } from '@/interfaces/IOrder';
import { IProfile } from '@/interfaces/IProfile';
import { db } from '@/main';
import firebase from 'firebase';
import { useProfile } from './useProfile';

export function useOrder() {
  const user = firebase.auth().currentUser!;
  const ordersCollection = db.collection('orders');

  // create a new order
  const createOrder = (
    name: string,
    list: IListEntry[],
    onSuccess?: () => void,
  ) => {
    const order: Omit<IOrder, 'id'> = {
      name: name,
      list: list,
      orderState: 'offen',
      createdBy: firebase.auth().currentUser!.uid,
      createdAt: new Date().getTime(),
      supplier: null,
    };

    // create document in fb collection
    ordersCollection.add(order).then(() => {
      onSuccess && onSuccess();
    });
  };

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
    ordersCollection.doc(docId).update({ orderState: state });
  };

  // fetches all orders of a user and update a reactive array
  // optionally set isPersonal to false to get all orders that were not created by yourself (delivery-mode)
  const populateOrders = (orders: IOrder[], isPersonal = true) => {
    const operator = isPersonal ? '==' : '!=';

    ordersCollection
      .where('createdBy', operator, user.uid)
      .onSnapshot((docData: firebase.firestore.DocumentData) => {
        const changes = docData.docChanges();
        changes.forEach((change: firebase.firestore.DocumentChange) => {
          // get index of changed order
          const index = orders.findIndex(
            (order: IOrder) => order.id === change.doc.id,
          );

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
            orders[index] = {
              ...(change.doc.data() as IOrder),
              id: change.doc.id,
            };
          } else {
            // remove deleted document from orders
            orders.splice(index, 1);
          }
        });
      });
  };

  // fetch and set details of a certain order and it's supplier or creator
  const getOrderDetails = (
    orderId: string,
    setOrderDetails: (orderDetails: IOrder) => void,
    setProfileDetails: (profileDetails: IProfile) => void,
  ) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        ordersCollection
          .doc(orderId)
          .onSnapshot((doc: firebase.firestore.DocumentData) => {
            setOrderDetails({
              ...(doc.data() as IOrder),
              id: doc.id,
            });

            // check if user is the supplier or creator
            let idToResolve: string;
            if (user.uid === doc.data().supplier) {
              idToResolve = doc.data().createdBy;
            } else {
              idToResolve = doc.data().supplier;
            }

            idToResolve &&
              useProfile().resolveProfileId(idToResolve, setProfileDetails);
          });
      }
    });
  };

  return {
    createOrder,
    calculateTotalArticleAmount,
    getOrderStateColor,
    setOrderState,
    populateOrders,
    getOrderDetails,
  };
}

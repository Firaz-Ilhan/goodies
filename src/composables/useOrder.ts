import { auth, db } from '@/main';
import firebase from 'firebase/app';
import * as geofire from 'geofire-common';
import { useProfile } from './useProfile';
import type { IListEntry } from '../interfaces/IListEntry';
import type { IOrder } from '../interfaces/IOrder';
import type { IProfile } from '../interfaces/IProfile';

export function useOrder() {
  const user = auth.currentUser!;
  const ordersCollection = db.collection('orders');

  // create a new order
  const createOrder = (name: string, list: IListEntry[]) => {
    const order: Omit<IOrder, 'id'> = {
      name: name,
      list: list,
      orderState: 'offen',
      createdBy: user.uid,
      createdAt: new Date().getTime(),
      supplier: null,
    };

    // create document in fb collection
    return new Promise((resolve) => {
      resolve(ordersCollection.add(order));
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

  // updates the supplier of a certain order
  const setSupplier = (docId: string) => {
    ordersCollection.doc(docId).update({ supplier: user.uid });
  };

  //deletes a certain order of a user
  const deleteOrder = (docId: string) => {
    ordersCollection
      .doc(docId)
      .delete()
      .then(() => {
        console.log('Document deleted');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
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

  // get the distance between creator and suppliers geocoordinates
  const getOrderDistance = (order: IOrder): Promise<number> => {
    return new Promise((resolve) => {
      const creatorId = order.createdBy;
      // get supplier or potential supplier for open orders
      const supplierId = order.supplier || user.uid;

      db.collection('profiles')
        .where(firebase.firestore.FieldPath.documentId(), 'in', [
          supplierId,
          creatorId,
        ])
        .get()
        .then((res) => {
          const to: number[] = [];
          const from: number[] = [];

          // expect two docs
          res.docs.length === 2 &&
            res.docs.map((doc) => {
              // creator location
              if (doc.id === creatorId) {
                const { lat, lng } = (doc.data() as IProfile).geocoords;
                from.push(lat, lng);
              }

              // supplier location
              if (doc.id === supplierId) {
                const { lat, lng } = (doc.data() as IProfile).geocoords;
                to.push(lat, lng);
              }
            });

          // expect array to contain latitude and longitude
          if ((to.length, from.length === 2)) {
            const distanceInKm = geofire.distanceBetween(to, from);
            resolve(distanceInKm);
          }
        });
    });
  };

  const formatDistance = (distance: number) => {
    return (distance < 1 ? distance.toFixed(1) : distance.toFixed()) + 'km';
  };

  // fetch and set details of a certain order and it's supplier or creator
  const getOrderDetails = (
    orderId: string,
    setOrderDetails: (orderDetails: IOrder) => void,
    setProfileDetails?: (profileDetails: IProfile) => void,
  ) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        ordersCollection
          .doc(orderId)
          .onSnapshot((doc: firebase.firestore.DocumentData) => {
            setOrderDetails({
              ...(doc.data() as IOrder),
              id: doc.id,
            });

            if (setProfileDetails) {
              // check if user is the supplier or creator
              let idToResolve: string;

              if (user.uid === doc.data().createdBy) {
                idToResolve = doc.data().supplier;
              } else {
                idToResolve = doc.data().createdBy;
              }

              if (idToResolve) {
                useProfile()
                  .resolveProfileId(idToResolve)
                  .then((profileData) => setProfileDetails(profileData));
              }
            }
          });
      }
    });
  };

  return {
    createOrder,
    calculateTotalArticleAmount,
    getOrderStateColor,
    setOrderState,
    setSupplier,
    deleteOrder,
    populateOrders,
    getOrderDistance,
    formatDistance,
    getOrderDetails,
  };
}

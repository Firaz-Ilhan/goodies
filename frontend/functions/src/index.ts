import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const subscribeToTopic = functions.https.onCall(
  async (data, context) => {
    await admin.messaging().subscribeToTopic(data.token, data.topic);
    return `subscribed to ${data.topic}`;
  },
);

export const unsubscribe = functions.https.onCall(async (data, context) => {
  await admin.messaging().unsubscribeFromTopic(data.token, data.topic);
  return `unsubscribed to ${data.topic}`;
});

export const sendToTopic = functions.https.onCall(
  async (
    message: { notification: { title: string; body: string }; topic: string },
    context,
  ) => {
    await admin.messaging().send(message);
    return `sent message`;
  },
);

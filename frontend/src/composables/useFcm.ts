import firebase from 'firebase';

export function useFcm() {
  let token: string;
  const messaging = firebase.messaging();

  const getToken = () => {
    messaging
      .getToken({
        vapidKey: process.env.VUE_APP_FB_FCM_KEY,
      })
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          token = currentToken;
        } else {
          console.log(
            'No registration token available. Request permission to generate one.',
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  };

  const sub = (topic: string) => {
    firebase
      .functions()
      .httpsCallable('subscribeToTopic')({ topic, token })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unsub = (topic: string) => {
    firebase
      .functions()
      .httpsCallable('unsubscribe')({ topic, token })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendToTopic = (message: {
    notification: { title: string; body: string };
    topic: string;
  }) => {
    firebase.functions().httpsCallable('sendToTopic')(message);
  };

  return { getToken, sub, unsub, sendToTopic };
}

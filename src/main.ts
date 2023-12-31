import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'pwacompat';
import { IonContent, IonicVue, IonPage } from '@ionic/vue';

// Add service worker
import './registerServiceWorker';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.scss';
import './theme/fonts.scss';
import './theme/global.scss';
import { Loader } from '@googlemaps/js-api-loader';
import VueGoogleMaps from '@fawmi/vue-google-maps';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(VueGoogleMaps, {
    load: {
      key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    },
  });

router.isReady().then(() => {
  app.mount('#app');
});

// global component registration
app.component('ion-content', IonContent);
app.component('ion-page', IonPage);

// Your web app's Firebase configuration
const firebaseConfig = {
  databaseUrl: `https://${process.env.VUE_APP_FB_PROJECT_ID}.firebaseio.com`,
  apiKey: process.env.VUE_APP_FB_API_KEY,
  authDomain: process.env.VUE_APP_FB_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FB_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FB_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();

// if production enable offline caching
const isProduction = !['localhost', '127.0.0.1', ''].includes(
  window.location.hostname,
);
isProduction && db.enablePersistence();

// initialize google maps loader
export const loader = new Loader({
  apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
});

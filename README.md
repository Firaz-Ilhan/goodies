# Goodies

Mobile Webanwendung im Rahmen der Veranstaltung 119645A Spezielle Themen der mobilen Anwendungsentwicklung im Kontext Connected Cars.

## Getting started 🚀

1. **Prerequisites**

   Install the Ionic CLI globally

   ```shell
   $ npm install -g @ionic/cli
   ```

   Install packages with

   ```shell
   $ npm install
   ```

   You need to copy the _.env.local.sample_ file and rename it to _.env.local_ and configure it with your environment variables and your API keys.

2. **Development**

   Start the development server

   ```shell
   $ npm run dev
   ```

   Now you can open your favourite browser at http://localhost:8100/ and start devloping.

3. **Deployment**

   Build an optimized version of the app by running

   ```shell
   $ npm run build
   ```

   Deploy the app by running

   ```shell
   $ firebase deploy
   ```

   via the firebase cli which should be installed gloabally. In addition you need to sign in first to your google account.

   ```shell
   $ npm install -g firebase-tools
   $ firebase login
   ```

   Alternatively a push to the main branch will trigger a pipeline to deploy the app to firebase hosting.

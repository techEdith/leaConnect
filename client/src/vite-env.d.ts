
/// <reference types="vite/client" />

// In client/src/vite-env.d.ts
interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: "AIzaSyC5G-r0Rrq2V-DWwn5rjVGc4fefHgN0dC8"
  readonly VITE_FIREBASE_AUTH_DOMAIN: "leaconnectdb.firebaseapp.com"
  readonly VITE_FIREBASE_PROJECT_ID: "leaconnectdb"
  readonly VITE_FIREBASE_STORAGE_BUCKET: "leaconnectdb.firebasestorage.app"
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: "1004261904619"
  readonly VITE_FIREBASE_MEASUREMENT_ID: "G-6557XR2YPQ"
  readonly VITE_FIREBASE_APP_ID: "1:1004261904619:web:efded380fcc912fa53eeae"
  readonly VITE_FIREBASE_DATABASE_URL: "https://leaconnectdb-default-rtdb.firebaseio.com"
// more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
import admin from "firebase-admin";
// Config
import { config } from "../../config";
const { FIREBASE_KEY } = config;
admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_KEY),
});

export default admin;

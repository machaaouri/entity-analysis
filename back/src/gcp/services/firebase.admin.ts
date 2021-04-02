import admin from "firebase-admin";

const key = process.env.FIREBASE_KEY || "";
admin.initializeApp({
  credential: admin.credential.cert(key),
});

export default admin;

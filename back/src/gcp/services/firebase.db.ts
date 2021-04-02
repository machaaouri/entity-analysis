import debug from "debug";
import { Analysis, CustomError } from "../types";
import admin from "./firebase.admin";

const db = admin.firestore();
const log: debug.IDebugger = debug("app:in-memory-service");

export class Firebase {
  private static instance: Firebase;

  constructor() {
    log("Create new firebase instance");
  }

  static getInstance(): Firebase {
    if (!Firebase.instance) {
      Firebase.instance = new Firebase();
    }
    return Firebase.instance;
  }

  async set(
    uid: string,
    email: string,
    analysis: Analysis,
    count: number,
    text: string
  ) {
    try {
      const docRef = db.collection("users").doc(uid);
      await docRef.set({ uid, email, analysis, count, text });
    } catch (err) {
      console.error(err.message);
      throw new CustomError("Firestore", "Failed to set up user session");
    }
  }

  async get(uid: any) {
    try {
      const docRef = db.collection("users").doc(uid);
      const doc = await docRef.get();
      return doc.data();
    } catch (err) {
      console.error(err.message);
      throw new CustomError("Firestore", "Failed to set up user session");
    }
  }

  async getAll() {
    try {
      const usersRef = db.collection("users");
      const users = await usersRef.get();
      return users;
    } catch (err) {
      console.error(err.message);
      throw new CustomError("Firestore", "Failed to get users");
    }
  }

  async getAnalysis(uid: any) {
    try {
      const docRef = db.collection("users").doc(uid);
      const analysis = await docRef.get();
      return analysis.data();
    } catch (err) {
      console.error(err.message);
      throw new CustomError("Firestore", "Failed to get data");
    }
  }
}

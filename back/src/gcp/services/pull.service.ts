import debug from "debug";

import { PubSub } from "@google-cloud/pubsub";
import { CustomError } from "../types";
import { Memory } from "./memory.service";
import { Firebase } from "./firebase.db";
import { config } from "../../config";
const {
  GOOGLE_PROJECT_ID,
  PUBSUB_TOPIC_NAME_OUTPUT,
  PUBSUB_SUBSCRIPTION_NAME,
} = config;

const log: debug.IDebugger = debug("app:pubsub-service");

export class PullClient {
  private static instance: PullClient;
  private pubsub: PubSub;
  projectId = GOOGLE_PROJECT_ID;
  topicName = PUBSUB_TOPIC_NAME_OUTPUT;
  subscriptionName = PUBSUB_SUBSCRIPTION_NAME;

  constructor() {
    this.pubsub = new PubSub({ projectId: this.projectId });
    log("Instantiates pubsub client");
    this.listenForMessages();
    log(`Start listening for topic ${this.topicName}`);
  }

  static getInstance() {
    if (!PullClient.instance) {
      PullClient.instance = new PullClient();
    }
    return PullClient.instance;
  }

  listenForMessages() {
    const subscription = this.pubsub.subscription(this.subscriptionName);

    const messageHandler = async (message: any) => {
      const { uid, email } = message.attributes;
      try {
        // console.log(`Received message ${message.id}:`);
        // console.log(`\tData: ${message.data}`);
        // console.log(`\tAttributes: ${JSON.stringify(message.attributes)}`);
        message.ack();

        const result = JSON.parse(Buffer.from(message.data).toString());
        const analysis = result.data.message;

        Memory.getInstance().cache(uid, "CloudFunction").end("Completed");
        Memory.getInstance().cache(uid, "Firestore").update("Progress");
        const count = Memory.getInstance().get(uid).count;
        const text = Memory.getInstance().get(uid).text;

        Firebase.getInstance()
          .set(uid, email, analysis, count, text)
          .then(() => {
            Memory.getInstance().cache(uid, "Firestore").end("Completed");
          })
          .catch((err) => {
            console.error(err.message);
            Memory.getInstance()
              .cache(uid, "Firestore")
              .end("CompletedWithErrors");
          });
      } catch (err) {
        console.error(err.message);
        Memory.getInstance()
          .cache(uid, "CloudFunction")
          .end("CompletedWithErrors");
      }
    };
    subscription.on("message", messageHandler);
  }
}

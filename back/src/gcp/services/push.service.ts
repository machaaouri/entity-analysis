import debug from "debug";

import {
  CreateTopicResponse,
  PubSub,
  Topic,
  TopicMetadata,
} from "@google-cloud/pubsub";
import { CustomError } from "../types";
import { config } from "dotenv";
import { Memory } from "./memory.service";
config();
const log: debug.IDebugger = debug("app:pubsub-service");

export class PushClient {
  private static instance: PushClient;
  private pubsub: PubSub;
  projectId = process.env.GOOGLE_PROJECT_ID;
  topicName = process.env.PUBSUB_TOPIC_NAME_INPUT || "analyzer_input";

  constructor() {
    this.pubsub = new PubSub({ projectId: this.projectId });
    log("Instantiates pubsub client");
  }

  static getInstance() {
    if (!PushClient.instance) {
      PushClient.instance = new PushClient();
    }
    return PushClient.instance;
  }
  // Send a message to the topic
  async publishMessage(text: string, uid: string, email: string) {
    const customAttributes = {
      uid,
      email,
    };
    try {
      Memory.getInstance().cache(uid, "PubSub_input").update("Progress");
      await this.pubsub
        .topic(this.topicName)
        .publish(Buffer.from(text), customAttributes);
    } catch (err) {
      console.error(err.message);
      throw new CustomError("PubSub_input", "Failed to push the message");
    }
  }
}

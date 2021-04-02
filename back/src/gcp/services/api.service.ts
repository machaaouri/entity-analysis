import {
  AdminResponse,
  Analysis,
  CustomError,
  CustomRequest,
  GoogleTextAnalyser,
  User,
} from "../types";
import { Memory } from "./memory.service";
import { PushClient } from "./push.service";
import debug from "debug";
import { PullClient } from "./pull.service";
import { Firebase } from "./firebase.db";
const log: debug.IDebugger = debug("app:api-service");

export class GcpService {
  private static instance: GcpService;

  constructor() {
    this.startTopicListener();
  }

  static getInstance(): GcpService {
    if (!this.instance) {
      this.instance = new GcpService();
    }
    return this.instance;
  }

  startTopicListener() {
    PullClient.getInstance();
  }

  async analyze(req: CustomRequest) {
    const uid = req.user.uid;
    const email = req.user.email;
    const text = req.body.text;
    const start_time = Number(req.body.start_time);

    Firebase.getInstance()
      .get(uid)
      .then((data) => {
        let count = 0;
        if (data?.count) {
          count = Number(data.count);
        }
        Memory.getInstance()
          .cache(uid, "Compute")
          .start(start_time, ++count, text);
        Memory.getInstance().cache(uid, "Compute").end("Completed");
      })
      .then(() => {
        PushClient.getInstance()
          .publishMessage(text, uid, email)
          .then(() => {
            Memory.getInstance().cache(uid, "PubSub_input").end("Completed");
            Memory.getInstance().cache(uid, "CloudFunction").update("Progress");
          });
      })
      .catch((err: CustomError) => {
        Memory.getInstance().cache(uid, err.service).end("CompletedWithErrors");
      });

    //aknowledge text analyze request
    return Memory.getInstance().get(uid);
  }

  async progress(req: CustomRequest): Promise<GoogleTextAnalyser> {
    const uid = req.user.uid;
    if (Memory.getInstance().isReady(uid)) {
      const data = await Firebase.getInstance().getAnalysis(uid);
      const r = { ...Memory.getInstance().get(uid) };
      const response: GoogleTextAnalyser = {
        services: r.services,
        analysis: { entities: data?.analysis },
      };
      // clean cache
      Memory.getInstance().clean(uid);
      return response;
    } else {
      const r = Memory.getInstance().get(uid);
      return {
        services: r.services,
        analysis: r.analysis,
      };
    }
  }

  async admin(): Promise<AdminResponse> {
    const admin: AdminResponse = { users: [] };
    const usersRef = await Firebase.getInstance().getAll();

    usersRef.forEach((user) => {
      const { uid, email, count, text } = user.data();
      admin.users.push({ uid, email, count, text });
    });

    return admin;
  }

  me(req: CustomRequest) {
    const email = req.user.email;
    const isAdmin = email === "hmachaao@gmail.com";
    return { isAdmin };
  }
}

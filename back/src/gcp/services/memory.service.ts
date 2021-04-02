import debug from "debug";
import {
  Analysis,
  Dictinary,
  GoogleTextAnalyser,
  initGoogleTextAnalyser,
  ServiceStatus,
  ServiceType,
} from "../types";

const log: debug.IDebugger = debug("app:in-memory-service");

export class Memory {
  private static instance: Memory;
  analyzer: Dictinary<
    GoogleTextAnalyser & { count: number; text: string }
  > = {};

  constructor() {
    log("Create new instance of Memory");
  }

  static getInstance(): Memory {
    if (!Memory.instance) {
      Memory.instance = new Memory();
    }
    return Memory.instance;
  }

  cache(uid: string, service: ServiceType) {
    return {
      start: (start_time: number, count: number, text: string) => {
        let initAnalysis = { ...initGoogleTextAnalyser() };
        initAnalysis.services[service].status = "Progress";
        initAnalysis.services[service].start_time = start_time;
        initAnalysis.services[service].end_time = undefined;
        this.analyzer[uid] = { ...initAnalysis, count, text };
      },
      update: (
        status: Exclude<
          ServiceStatus,
          "Completed" | "CompletedWithErrors" | "Not started"
        >,
        start_time?: number
      ) => {
        this.analyzer[uid].services[service].status = status;
        this.analyzer[uid].services[service].start_time =
          start_time || Date.now();
        this.analyzer[uid].services[service].end_time = undefined;
      },
      end: (
        status: Exclude<ServiceStatus, "Progress" | "Not started">,
        analysis: Analysis = { entities: [] }
      ) => {
        this.analyzer[uid].services[service].status = status;
        this.analyzer[uid].analysis = analysis;
        this.analyzer[uid].services[service].end_time = Date.now();
      },
    };
  }

  get(uid: string) {
    return { ...this.analyzer[uid] };
  }

  isReady(uid: string) {
    return this.analyzer[uid].services["Firestore"].status == "Completed";
  }

  clean(uid: string) {
    delete this.analyzer[uid];
  }
}

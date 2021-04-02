import express from "express";

export type ServiceStatus =
  | "Not started"
  | "Progress"
  | "Completed"
  | "CompletedWithErrors";

export type Service = {
  start_time?: number;
  end_time?: number;
  status: ServiceStatus;
  error?: string;
};
export type ServiceType =
  | "Compute"
  | "CloudFunction"
  | "PubSub_input"
  // | "PubSub_output"
  | "Firestore";

export type Services<T> = { [key in ServiceType]: T };

export type Type =
  | "UNKNOWN"
  | "PERSON"
  | "LOCATION"
  | "ORGANIZATION"
  | "EVENT"
  | "WORK_OF_ART"
  | "CONSUMER_GOOD"
  | "OTHER"
  | "PHONE_NUMBER"
  | "ADDRESS"
  | "NUMBER"
  | "PRICE";

export type Mention = {
  sentiment: string | null;
  type: string;
  text: Dictinary<string | number | undefined>;
};

export type Entity = {
  sentiment: string | null;
  metadata: Dictinary<string | number>;
  type: Type;
  name: string;
  mentions: Mention[];
  salience: number;
};
export type Analysis = { entities: Entity[] };

export type GoogleTextAnalyser = {
  services: Services<Service>;
  analysis: Analysis;
};

export const initGoogleTextAnalyser = (): GoogleTextAnalyser => {
  return {
    services: {
      Compute: { status: "Not started" },
      CloudFunction: { status: "Not started" },
      PubSub_input: { status: "Not started" },
      // PubSub_output: { status: "Not started" },
      Firestore: { status: "Not started" },
    },
    analysis: { entities: [] },
  };
};

export interface CustomRequest extends express.Request {
  user?: any;
}

export class CustomError extends Error {
  service: ServiceType;
  constructor(service: ServiceType, message: string) {
    super();
    this.service = service;
    this.message = message;
  }
}

export type User = {
  uid: string;
  email: string;
  count: number;
  text: string;
};
export type AdminResponse = {
  users: User[];
};

export type Dictinary<T> = { [key: string]: T };

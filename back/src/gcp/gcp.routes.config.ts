import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import { GcpController } from "./controllers/gcp.controller";
import { isAdmin, validateFirebaseIdToken } from "./middlewares/auth";

export class GcpRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "GCP");
  }

  configureRoutes(): express.Application {
    this.app
      .route("/api/analyze")
      .post(validateFirebaseIdToken, GcpController.getInstance().analyze);

    this.app
      .route("/api/progress")
      .get(validateFirebaseIdToken, GcpController.getInstance().progress);

    this.app
      .route("/api/me")
      .get(validateFirebaseIdToken, GcpController.getInstance().me);

    this.app
      .route("/api/admin")
      .get(validateFirebaseIdToken, isAdmin, GcpController.getInstance().admin);

    this.app.route("/api/ping").get(GcpController.getInstance().ping);

    return this.app;
  }
}

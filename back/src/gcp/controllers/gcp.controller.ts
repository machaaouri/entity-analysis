// we use debug with a custom context
import debug from "debug";
import express from "express";
import { GcpService } from "../services/api.service";
import { CustomRequest } from "../types";
const log: debug.IDebugger = debug("app:users-controller");

export class GcpController {
  private static instance: GcpController;

  static getInstance() {
    if (!this.instance) {
      this.instance = new GcpController();
    }
    return this.instance;
  }

  async analyze(req: CustomRequest, res: express.Response) {
    try {
      const response = await GcpService.getInstance().analyze(req);
      res.status(200).json(response);
    } catch (err) {
      log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async progress(req: CustomRequest, res: express.Response) {
    try {
      const response = await GcpService.getInstance().progress(req);
      res.status(200).json(response);
    } catch (err) {
      log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async admin(req: CustomRequest, res: express.Response) {
    try {
      const response = await GcpService.getInstance().admin();
      res.status(200).json(response);
    } catch (err) {
      log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  me(req: CustomRequest, res: express.Response) {
    try {
      const me = GcpService.getInstance().me(req);
      res.status(200).json(me);
    } catch (err) {
      log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  ping(req: CustomRequest, res: express.Response) {
    res.status(200).json({ status: "running" });
  }
}

import express, { Router } from "express";
import * as http from "http";
import * as bodyparser from "body-parser";

import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import { CommonRoutesConfig } from "./common/common.routes.config";
import { GcpRoutes } from "./gcp/gcp.routes.config";
import debug from "debug";

import { config } from "dotenv";
config();

// declaring the variables
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

const headers1 = "Origin, X-Requested-With, Content-Type, Accept";
const headers2 =
  "Authorization, Access-Control-Allow-Credentials, x-access-token, Access-Control-Max-Age";
const whitelist = [process.env.CLIENT_URL];

const corsOptionsDelegate = (req: any, callback: any) => {
  let corsOptions;
  if (whitelist.includes(req.header("Origin"))) {
    corsOptions = { origin: true };
  } else if (process.env.NODE_ENV === "production") {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

// adding middleware to parse all incoming requests aj JSON
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// adding middleware to allow cross-origin requests
const clientHeaderOrigin = process.env.CLIENT_URL;
app.use(cors(corsOptionsDelegate));

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!whitelist.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    res.header("Access-Control-Allow-Origin", clientHeaderOrigin);
  }

  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PATCH, OPTIONS, PUT"
  );
  res.header("Access-Control-Allow-Headers", `${headers1},${headers2}`);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Max-Age", "3600");

  next();
});

// adding Dashroutes to Routes array
// pass in the express application
routes.push(new GcpRoutes(app));

// configure expressWinston error-logging middleware to log errors
app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

// this is a simple route to make sure everything is working properly
app.get("/api", (req: express.Request, res: express.Response) => {
  res.status(200).send(`Server up and running!`);
});

server.listen(port, () => {
  debugLog(`Server running at http://localhost:${port}`);
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
});

import express from "express";
import admin from "../services/firebase.admin";
import { CustomRequest } from "../types";

export const validateFirebaseIdToken = (
  req: CustomRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    res.status(401).json({
      error: {
        message:
          "You are not authorised to perform this action. SignUp/Login to continue",
      },
    });
    return;
  }
  const idToken = req.headers.authorization.split("Bearer ")[1];
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedIdToken) => {
      //console.log('ID Token correctly decoded', decodedIdToken);
      admin
        .auth()
        .getUser(decodedIdToken.uid)
        .then((userRecord) => {
          req.user = userRecord;
          next();
        })
        .catch((error) => {
          console.error("Error while getting Firebase User record:", error);
          res.status(403).json({ error: "Unauthorized" });
        });
    })
    .catch((error) => {
      console.error("Error while verifying Firebase ID token:", error);
      res.status(403).json({ error: "Unauthorized" });
    });
};

export const isAdmin = (
  req: CustomRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const email = req.user.email;
  if (email !== "hmachaao@gmail.com") {
    res.status(401).json({
      error: {
        message: "You are not authorised to perform this action",
      },
    });
    return;
  } else next();
};

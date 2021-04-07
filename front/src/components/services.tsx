import React from "react";
import functions from "../svg/cloud-functions.svg";
import compute from "../svg/compute-engine.svg";
import pubsub from "../svg/pub-sub.svg";
import firestore from "../svg/firestore.svg";
import { Service, Services, ServiceType } from "../types/types";
import {
  Chip,
  createStyles,
  LinearProgress,
  makeStyles,
  Theme,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      color: "#0275d8",
      display: "flex",
      alignItems: "center",
    },
    icon: {
      width: "25px",
      float: "left",
      marginRight: "5px",
    },
    progressRoot: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    colorPrimary: {
      backgroundColor: "#4385f3",
    },
    barColorPrimary: {
      backgroundColor: "#afcbfa",
    },
    service: {
      display: "flex",
      flexDirection: "column",
      flexBasis: "20%",
      border: "1px solid #eceff1",
      boxShadow:
        "0 1px 1px 0px rgba(60,64,69,.3),0 1px 3px 1px rgba(60,64,67,.15)",
      borderRadius: "5px",
      padding: theme.spacing(3),
      "& > hr": {
        width: "100%",
        margin: theme.spacing(1, 0),
      },
      "& > div p": {
        margin: 0,
      },
      "& > div small": {
        fontSize: "13px",
        color: "#676767",
        wordWrap: "break-word",
      },
    },
    chip: {
      backgroundColor: "#f2f2f2",
      marginLeft: "auto",
    },
  })
);

const src: { [key in ServiceType]: string } = {
  Compute: compute,
  PubSub_input: pubsub,
  CloudFunction: functions,
  //   PubSub_output: pubsub,
  Firestore: firestore,
};

const header: { [key in ServiceType]: string } = {
  Compute: "Compute Engine",
  PubSub_input: "Cloud Pub/Sub",
  CloudFunction: "Cloud Functions",
  //   PubSub_output: "Cloud Pub/Sub",
  Firestore: "Cloud Firestore",
};

const steps: { [key in ServiceType]: string[] } = {
  Compute: [
    "Create session",
    "Insert a cache entry",
    "Embed custom attributes as metadata and push message to PubSub",
  ],
  PubSub_input: [
    "Trigger Cloud Function",
    "Deliver results to subscribers once cloud function has finished processing",
  ],
  CloudFunction: [
    "Use entity analysis (Natural Language API) to find and label fields within the text",
    "Push results to PubSub",
  ],
  //   PubSub_output: ["Deliver data back to Server"],
  Firestore: ["Set results within the user collection", "Delete cache entry"],
};

type ServiceProps = {
  type: ServiceType;
  services: Services<Service>;
  title: string;
};

export const ServiceComponent = (p: ServiceProps) => {
  const classes = useStyles();
  const { status, start_time, end_time } = p.services[p.type];
  const duration = end_time && start_time ? end_time - start_time : undefined;
  return (
    <div className={classes.service}>
      <div className={classes.header}>
        <img className={classes.icon} src={src[p.type]} alt="" />
        {header[p.type]}
        {duration && (
          <Chip
            className={classes.chip}
            label={`${duration} ms`}
            size="small"
            deleteIcon={<DoneIcon style={{ color: "#5cb85c" }} />}
            onDelete={() => {}}
          />
        )}
      </div>
      {status === "Progress" ? (
        <LinearProgress
          classes={{
            root: classes.progressRoot,
            colorPrimary: classes.colorPrimary,
            barColorPrimary: classes.barColorPrimary,
          }}
        />
      ) : (
        <hr />
      )}
      <div>
        <p>{p.title}</p>
        {steps[p.type].map((step, key) => (
          <span key={key}>
            <small>{step}</small>
            <br />
          </span>
        ))}
      </div>
    </div>
  );
};

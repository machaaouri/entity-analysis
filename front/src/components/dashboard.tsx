import { useAuth } from "../contexts/authContext";
import { InputField } from "./inputField";
import { NavBar } from "./navbar";
import { api } from "../api";
import { ServiceComponent, ServiceContainer } from "./services";
import {
  GoogleTextAnalyser,
  initGoogleTextAnalyser,
  ServiceType,
} from "../types/types";
import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { AnalysisRenderer } from "./analysis";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#f8f9fa",
    height: "100vh",
    "& > .alert": {
      margin: 0,
      padding: "",
    },
  },
  container: {
    padding: "10px 50px 10px 50px",
    display: "flex",
    flexDirection: "column",
  },
  services: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [state, setState] = useState<GoogleTextAnalyser>(
    initGoogleTextAnalyser()
  );
  const [error, setError] = useState<string>();
  const [warning, setWarning] = useState<string>();
  const classes = useStyles();
  const remote = api(currentUser);
  const onGoing = useRef(false);

  useEffect(() => {
    remote
      .isAdmin<{ isAdmin: boolean }>()
      .then((v) => setIsAdmin(v.isAdmin))
      .catch((err) => setError(err.message));
  }, [currentUser?.email]);

  async function analyze(text: string) {
    if (onGoing.current) {
      setTimeout(() => {
        setWarning(undefined);
      }, 1500);
      setWarning("A request is already in progress");
    } else {
      try {
        setError("");
        const start_time = Date.now();
        onGoing.current = true;
        setState(initGoogleTextAnalyser({ start_time, status: "Progress" }));

        await remote.analyze<GoogleTextAnalyser>(text, start_time);
        await remote.polling<GoogleTextAnalyser>(
          (r) => validate(r),
          (r) => hasErrors(r),
          1000,
          50,
          (r) => setState(r)
        );
      } catch (err) {
        onGoing.current = false;
        setError("An error has occurred !");
      }
    }
  }

  function validate(r: GoogleTextAnalyser) {
    const valid =
      r.analysis.entities.length !== 0 ||
      Object.keys(r.services).filter(
        (key) => r.services[key as ServiceType].status === "CompletedWithErrors"
      ).length !== 0;
    if (valid) onGoing.current = false;
    return valid;
  }

  function hasErrors(r: GoogleTextAnalyser) {
    const error =
      Object.keys(r.services).filter(
        (key) => r.services[key as ServiceType].status === "CompletedWithErrors"
      ).length !== 0;
    if (error) onGoing.current = false;
    return error;
  }

  const getProgress = () => {
    let progress = 0;
    for (let s in state.services) {
      const status = state.services[s as ServiceType].status;
      progress += status === "Completed" ? 1 : 0;
    }
    return progress * (100 / 4);
  };

  return (
    <div className={classes.root}>
      <NavBar isAdmin={isAdmin} />
      {error && <div className="alert alert-danger text-center">{error}</div>}
      {warning && (
        <div className="alert alert-warning text-center">{warning}</div>
      )}
      <div className={classes.container}>
        <InputField
          progress={getProgress()}
          analyze={(text) => analyze(text)}
        />
        <div className={classes.services}>
          <ServiceContainer
            service={
              <ServiceComponent
                services={state.services}
                type="Compute"
                title="VM"
              />
            }
          />
          <ServiceContainer
            service={
              <ServiceComponent
                services={state.services}
                type="PubSub_input"
                title="Serverless"
              />
            }
          />
          <ServiceContainer
            service={
              <ServiceComponent
                services={state.services}
                type="CloudFunction"
                title="Serverless"
              />
            }
          />
          <ServiceContainer
            service={
              <ServiceComponent
                services={state.services}
                type="Firestore"
                title="NoSQL"
              />
            }
          />
        </div>
        <AnalysisRenderer analysis={state.analysis} />
      </div>
    </div>
  );
};

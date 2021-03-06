import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Analysis, Entity, Type } from "../types/types";
import { entities } from "./test";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(1),
      display: "flex",
      justifyContent: "center",
      gap: theme.spacing(1),
      flexWrap: "wrap",
      [theme.breakpoints.down(600)]: {
        flexDirection: "column",
        margin: 0,
      },
    },
    entity: {
      minHeight: "60px",
      border: "1px solid #eceff1",
      boxShadow: "0 1px 1px 0px rgba(60,64,69,.3)",
      background: "#fff",
      display: "flex",
      flexBasis: "20%",
      flexGrow: 1,
    },
    analysis: {
      flexGrow: 1,
      padding: "5px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    info: {
      display: "flex",
      alignItems: "center",
      "& > span": { fontSize: "small", color: "#969696" },
      "& > p": { margin: "0 0 0 3px", fontSize: "15px" },
    },
    type: {
      padding: "5px",
      display: "flex",
      height: "fit-content",
      alignItems: "start",
      color: "#fff",
    },
  })
);

const colors: { [key in Type]: string } = {
  WORK_OF_ART: "#fcb900",
  ADDRESS: "#f47373",
  CONSUMER_GOOD: "#ffc107",
  EVENT: "#e91e63",
  LOCATION: "#cddc39",
  NUMBER: "#0288d1",
  ORGANIZATION: "#37d67a",
  OTHER: "#abb8c3",
  PERSON: "#4caf50",
  PHONE_NUMBER: "#4caf50",
  PRICE: "#00bcd4",
  UNKNOWN: "#d9d9d9",
};

export const AnalysisRenderer = (p: { analysis: Analysis }) => {
  const cls = useStyles();
  ///if (p.analysis.entities.length === 0) return null;

  const EntityRenderer = (key: number, entity: Entity) => {
    return (
      <div className={cls.entity} key={key}>
        <div className={cls.analysis}>
          <div className={cls.info}>
            <span>{key}.</span>
            <p>{entity.name}</p>
          </div>
          {entity.metadata["wikipedia_url"] && (
            <a href={entity.metadata["wikipedia_url"] + ""}>
              Wikipedia Article
            </a>
          )}
          {entity.salience !== 0 && (
            <div className={cls.info}>
              <span>Salience</span>
              <p>{entity.salience.toPrecision(2)}</p>
            </div>
          )}
        </div>
        <div
          className={cls.type}
          style={{ backgroundColor: colors[entity.type] }}
        >
          {entity.type}
        </div>
      </div>
    );
  };

  return (
    <div className={cls.container}>
      {p.analysis.entities.map((entity, key) => EntityRenderer(key, entity))}
    </div>
  );
};

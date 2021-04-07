import {
  Button,
  makeStyles,
  TextareaAutosize,
  Theme,
  createStyles,
  createMuiTheme,
} from "@material-ui/core";
import React, { useRef } from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
      display: "flex",
      justifyContent: "center",
      gap: theme.spacing(1),
      [theme.breakpoints.down(440)]: {
        flexDirection: "column",
        margin: 0,
      },
    },
    textArea: {
      resize: "none",
      backgroundColor: "#fff",
      border: "1px solid #e0e0e0",
      borderRadius: "5px",
      outline: "none",
      overflow: "auto",
      padding: "10px",
      flexGrow: 1,
      maxWidth: "50%",
      fontFamily: "Arial",
      [theme.breakpoints.down(650)]: {
        maxWidth: "100%",
      },
    },
    button: {
      height: "fit-content",
    },
    side: {
      display: "flex",
      flexDirection: "column",
      "& .MuiCircularProgress-colorPrimary": {
        color: "#4385f3",
      },
      [theme.breakpoints.down(440)]: {
        flexGrow: 1,
      },
    },
    progress: {
      // marginTop: "10px",
      // alignSelf: "center",
    },
  })
);

export const InputField = (p: {
  analyze: (text: string) => void;
  progress: number;
}) => {
  const classes = useStyles();
  const textRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className={classes.root}>
      <TextareaAutosize
        className={classes.textArea}
        ref={textRef}
        rows={6}
        placeholder="Enter text to be analyzed, up to 1000 words"
      />
      <div className={classes.side}>
        <Button
          color="primary"
          className={classes.button}
          variant="contained"
          onClick={() => p.analyze(textRef.current?.value || "")}
        >
          ANALYZE
        </Button>
      </div>
    </div>
  );
};

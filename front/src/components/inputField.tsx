import { Box, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React, { useRef } from "react";
import styled from "styled-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  container: {
    width: "100%",
    display: "flex",
    alignItems: "start",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: "5px",
    },
  },
  textArea: {
    maxWidth: "600px",
    resize: "none",
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "5px",
    outline: "none",
    overflow: "auto",
    padding: "10px",
    flexGrow: 1,
  },
  button: {
    color: "#fff",
    backgroundColor: "#4385f3",
    "&:hover": {
      backgroundColor: "#4385f3",
    },
    height: "fit-content",
  },
  side: {
    display: "flex",
    flexDirection: "column",
    "& .MuiCircularProgress-colorPrimary": {
      color: "#4385f3",
    },
  },
  progress: {
    marginTop: "10px",
    alignSelf: "center",
  },
});

const TextArea = styled.textarea`
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  :focus {
    box-shadow: 0 0 3px #b2b2b2;
    border: 1px solid #e0e0e0;
  }
`;

const CircularProgressWithLabel = (
  props: CircularProgressProps & { value: number }
) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        {...props}
        color="primary"
        size={55}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export const InputField = (p: {
  analyze: (text: string) => void;
  progress: number;
}) => {
  const classes = useStyles();
  const textRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <TextArea
          className={classes.textArea}
          ref={textRef}
          rows={5}
          placeholder="Enter text to be analyzed, up to 1000 words"
        />
        <div className={classes.side}>
          <Button
            className={classes.button}
            variant="contained"
            onClick={() => p.analyze(textRef.current?.value || "")}
          >
            ANALYZE
          </Button>
          <div className={classes.progress}>
            {p.progress !== 0 && (
              <CircularProgressWithLabel value={p.progress} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

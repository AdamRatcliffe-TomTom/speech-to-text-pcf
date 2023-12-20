import React, { useState } from "react";
import { makeStyles, DefaultButton } from "@fluentui/react";
import { Mic24Regular } from "@fluentui/react-icons";
import Header from "./Header";
import Footer from "./Footer";
import useSpeech from "../hooks/useSpeech";

const useStyles = ({ width, height, isRecording }) =>
  makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: "#152C39",
      borderRadius: 10
    },
    primaryButton: {
      padding: `${theme.spacing.l1} ${theme.spacing.m}`,
      backgroundColor: "#0089C9",
      borderRadius: 40,
      border: "none",
      ":hover, :active": {
        color: "white",
        backgroundColor: "#0074aa"
      },
      "& .ms-Button-label": {
        color: "white",
        fontFamily: "Noto Sans",
        fontWeight: 400
      }
    },
    secondaryButton: {
      padding: `${theme.spacing.l1} ${theme.spacing.m}`,
      backgroundColor: "transparent",
      borderRadius: 40,
      border: "1px solid #B9E7FE",
      ":hover, :active": {
        color: "white",
        backgroundColor: "rgba(0,0,0,0.1)"
      },
      "& .ms-Button-label": {
        color: "white",
        fontFamily: "Noto Sans",
        fontWeight: 400
      }
    },
    recordButton: {
      backgroundColor: isRecording ? "#c81210" : "#0089C9",
      ":hover, :active": {
        color: "white",
        backgroundColor: isRecording ? "#aa0f0d" : "#0074aa"
      }
    },
    text: {
      flex: 1,
      width: "100%",
      padding: theme.spacing.m,
      color: "white",
      backgroundColor: "transparent",
      border: "none",
      resize: "none",
      fontFamily: "Noto Sans",
      fontSize: 15,
      lineHeight: "1.5",
      overflowY: "auto",
      outline: "none",
      "&::-webkit-scrollbar": {
        width: 10,
        backgroundColor: "#152C39"
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#485e6e"
      }
    }
  }));

const Control = ({
  width,
  height,
  language,
  startRecordingText,
  stopRecordingText,
  confirmText,
  clearText,
  onChange
}) => {
  const { text, setText, startRecognition, stopRecognition } = useSpeech();
  const [isRecording, setRecording] = useState(false);
  const classes = useStyles({ width, height, isRecording })();
  const recordingButtonText = isRecording
    ? stopRecordingText
    : startRecordingText;

  const handleToggleRecording = () => {
    const recording = !isRecording;

    if (recording) {
      startRecognition({ lang: language });
    } else {
      stopRecognition();
    }

    setRecording(recording);
  };

  const handleTextChange = (event) => {
    const { value } = event.target;
    setText(value);
  };

  const handleConfirm = () => {
    onChange(text);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className={`SpeechToText ${classes.root}`}>
      <Header>
        <DefaultButton
          className={`${classes.primaryButton} ${classes.recordButton}`}
          onRenderIcon={() => <Mic24Regular color="white" />}
          onClick={handleToggleRecording}
        >
          {recordingButtonText}
        </DefaultButton>
      </Header>
      <textarea
        className={classes.text}
        value={text}
        onChange={handleTextChange}
      />
      <Footer>
        <DefaultButton
          className={classes.primaryButton}
          style={{ width: 100 }}
          onClick={handleConfirm}
        >
          {confirmText}
        </DefaultButton>
        <DefaultButton
          className={classes.secondaryButton}
          style={{ width: 100 }}
          onClick={handleClear}
        >
          {clearText}
        </DefaultButton>
      </Footer>
    </div>
  );
};

export default Control;

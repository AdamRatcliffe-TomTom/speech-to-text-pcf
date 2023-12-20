import { useState } from "react";

let recognition;

const useSpeech = () => {
  const [text, setText] = useState("");

  const startRecognition = ({
    continuous = true,
    interimResults = true,
    lang = "en-GB"
  } = {}) => {
    recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();

    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.lang = lang;
    recognition.start();

    recognition.addEventListener("result", (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");

      console.log("transcript: ", transcript);

      setText(transcript);
    });
  };

  const stopRecognition = () => {
    recognition?.stop();
  };

  return {
    startRecognition,
    stopRecognition,
    setText,
    text
  };
};

export default useSpeech;

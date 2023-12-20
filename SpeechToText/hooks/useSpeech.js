import { useState } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition;

const useSpeech = () => {
  const [text, setText] = useState("");

  const startRecognition = ({
    continuous = true,
    interimResults = true,
    lang = "en-US"
  } = {}) => {
    recognition = new SpeechRecognition();

    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.lang = lang;
    recognition.start();

    recognition.addEventListener("result", (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
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

import { useState, useEffect } from "react";
import createPonyfill from "web-speech-cognitive-services/lib/SpeechServices";

import {
  MS_SPEECH_SERVICE_REGION,
  MS_SPEECH_SERVICE_SUBSCRIPTION_KEY
} from "../config";

let SpeechRecognition;
let recognition;

const useSpeech = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    const init = async () => {
      SpeechRecognition = (
        await createPonyfill({
          credentials: {
            region: MS_SPEECH_SERVICE_REGION,
            subscriptionKey: MS_SPEECH_SERVICE_SUBSCRIPTION_KEY
          }
        })
      ).SpeechRecognition;
    };
    init();
  }, []);

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
        .join(" ");
      setText(transcript);
    });
  };

  const stopRecognition = () => {
    recognition?.abort();
  };

  return {
    startRecognition,
    stopRecognition,
    setText,
    text
  };
};

export default useSpeech;

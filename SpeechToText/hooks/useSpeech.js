import { useState, useEffect } from "react";
import createPonyfill from "web-speech-cognitive-services/lib/SpeechServices";

import {
  MS_SPEECH_SERVICE_REGION,
  MS_SPEECH_SERVICE_SUBSCRIPTION_KEY
} from "../config";

let SpeechRecognition;
let recognition;
let stopping = false;
let haveFinalResult = false;

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
      const resultsArray = Array.from(event.results);
      const transcript = resultsArray
        .map((result) => result[0].transcript)
        .join(" ");
      haveFinalResult = resultsArray.at(-1).isFinal;

      setText(transcript);

      if (stopping && haveFinalResult) {
        recognition?.abort();
        stopping = false;
      }
    });
  };

  // Need to work around a bug in the web-speech-cognitive-services library
  // where calling stop() fails to stop recording when continuously listening
  // https://github.com/compulim/web-speech-cognitive-services/issues/166
  const stopRecognition = () => {
    if (haveFinalResult) {
      recognition?.abort();
      stopping = false;
    } else {
      stopping = true;
    }
  };

  return {
    startRecognition,
    stopRecognition,
    setText,
    text
  };
};

export default useSpeech;

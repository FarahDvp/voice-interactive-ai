import React, { useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { useSpeechSynthesis } from "react-speech-kit";

import { AnswerFromAi } from "../config/openai";

function Speech({ refrech }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const { speak, voices } = useSpeechSynthesis({
    onEnd: () => {
      SpeechRecognition.startListening({ language: "ar-tn" });
    },
  });
  const [text, setText] = useState("");
  const [AI_Answer, setAI_Answer] = useState("");

  useEffect(() => {
    setText(transcript);
  }, [transcript]);

  //micro is desactivated => open micro
  useEffect(() => {
    if (!listening && transcript === "") {
      SpeechRecognition.startListening({ language: "ar-tn" });
      setAI_Answer("");
    }

    if (!listening && transcript !== "") {
      console.log(text);

      AnswerFromAi(text, (answer) => {
        setAI_Answer(answer);
        speak({
          text: answer,
          pitch: 2,
          voice: voices[36],
        });
      });
    }
  }, [listening, text, refrech]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>{text}</p>

      {AI_Answer && (
        <p>
          {"=>"} {AI_Answer}
        </p>
      )}
      {/* {voices.map((v, key) => (
        <div key={key}>
          {key} : {v.name}
        </div>
      ))} */}
    </div>
  );
}

export default Speech;

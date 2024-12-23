import React, { useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { useSpeechSynthesis } from "react-speech-kit";

import { AnswerFromAi } from "../config/openai";

function Speech() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const { speak, voices } = useSpeechSynthesis({
    onEnd: () => {
      SpeechRecognition.startListening();
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
      SpeechRecognition.startListening();
      setAI_Answer("");
    }

    if (!listening && transcript !== "") {
      console.log(text);

      AnswerFromAi(text, (answer) => {
        setAI_Answer(answer);
        speak({
          text: answer,
          pitch: 2,
          voice: voices[108],
        });
      });
    }
  }, [listening, text]);

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
    </div>
  );
}

export default Speech;

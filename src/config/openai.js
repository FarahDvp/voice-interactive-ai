import axios from "axios";

export const AnswerFromAi = (message, onSuccess) => {
  const options = {
    method: "POST",
    url: "https://api.edenai.run/v2/text/question_answer",
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_KEY}`,
    },
    data: {
      texts: [message],
      temperature: 0.8,
      examples: [[message, message]],
      providers: "openai",
      question: message,
      examples_context: message,
    },
  };

  axios
    .request(options)
    .then((response) => {
      onSuccess(
        response?.data?.openai?.answers.join(" ") ||
          "i can't answer this question"
      );
    })
    .catch((error) => {
      onSuccess("i can't answer this question");
    });
};

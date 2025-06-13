import { createContext, useState } from "react";
import { Alert } from "react-native";

import dummyQuestions from "../data/dummy";

// For better auto-completion
export const QuestionsContext = createContext({
  questions: [],
  onScan: (data) => {},
});

function QuestionsContextProvider({ children }) {
  const [questions, setQuestions] = useState(dummyQuestions);

  function onScan(data) {
    const question = questions.find((ques) => ques.id == data);

    // Validate the QR Code
    if (question === undefined) {
      Alert.alert(
        "Invalid QR Code",
        "Hmm... that QR doesn't match any question. Try scanning a different one."
      );
      return;
    }

    const quesIdx = question.quesNo - 1;

    // Validate the question number
    if (questions[quesIdx].unlocked === true) {
      Alert.alert(
        "Already Unlocked",
        `Looks like you've already unlocked Question ${quesIdx + 1}.`
      );
      return;
    }

    const updatedQuestions = [...questions];
    updatedQuestions[quesIdx] = {
      ...updatedQuestions[quesIdx],
      unlocked: true,
    };
    setQuestions(updatedQuestions);
  }

  const value = {
    questions: questions,
    onScan: onScan,
  };

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
}

export default QuestionsContextProvider;

// Question 20 ones here

import {
  Button,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { answers, questions } from "../data/dummy";

function QuestionScreen() {
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [ansBgColor, setAnsBgColor] = useState("#ccc");
  const questionNumber = 1;

  function changeTextHandler(enteredText) {
    setUserAnswer(enteredText);
  }

  async function submitHandler() {
    setSubmitDisabled(true);
    if (userAnswer.toLowerCase() === answers[questionNumber].toLowerCase()) {
      setAnsBgColor("lightgreen");
    } else {
      setAnsBgColor("red");
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setAnsBgColor("#ccc");
    setSubmitDisabled(false);
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="position" style={{ flex: 1 }}>
          <View
            style={[
              styles.rootContainer,
              { height: Dimensions.get("window").height },
            ]}
          >
            <View style={styles.container}>
              <View style={styles.questionContainer}>
                <Text style={styles.question}>{questions[questionNumber]}</Text>
              </View>
              <View
                style={[styles.inputContainer, { backgroundColor: ansBgColor }]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Type your answer"
                  placeholderTextColor={"#aaa"}
                  value={userAnswer}
                  onChangeText={changeTextHandler}
                  editable={!submitDisabled}
                />
              </View>
              <Button
                title="Submit"
                disabled={submitDisabled}
                onPress={submitHandler}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default QuestionScreen;

const styles = StyleSheet.create({
  rootContainer: {
    height: 700,
    paddingHorizontal: 16,
    paddingVertical: 64,
  },
  container: {
    flex: 1,
    backgroundColor: "#aaa",
    padding: 16,
    borderRadius: 8,
  },
  questionContainer: {
    justifyContent: "center",
    padding: 12,
    marginBottom: 48,
    borderRadius: 8,
    height: "50%",
    backgroundColor: "#ccc",
  },
  question: {
    textAlign: "center",
  },
  inputContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginVertical: 32,
  },
  input: {
    width: "100%",
    height: 60,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    borderBottomWidth: 2,
  },
});

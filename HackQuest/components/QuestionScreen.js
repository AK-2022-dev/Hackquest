// One Question with user input field

import { useLayoutEffect, useState } from "react";
import {
  Button,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


function QuestionScreen({ navigation, route }) {
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [ansBgColor, setAnsBgColor] = useState("#ccc");
  const { width, height } = useWindowDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Question ${route.params.id}`,
    });
  });

  function changeTextHandler(enteredText) {
    setUserAnswer(enteredText);
  }

  async function submitHandler() {
    setSubmitDisabled(true);
    if (userAnswer.toLowerCase() === route.params.ans.toLowerCase()) {
      setAnsBgColor("lightgreen");
    } else {
      setAnsBgColor("red");
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setAnsBgColor("#ccc");
    setSubmitDisabled(false);
  }

  function isPotrait() {
    return width < height;
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
              <View
                style={[
                  styles.questionContainer,
                  { marginBottom: isPotrait() ? 48 : 0 },
                ]}
              >
                <Text style={styles.question}>{route.params.ques}</Text>
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
    maxHeight: 700,
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

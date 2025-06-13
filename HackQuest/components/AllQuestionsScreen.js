// Question 20 ones here
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCameraPermissions } from "expo-camera";
import { useContext, useLayoutEffect } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import QuestionsContextProvider, {
  QuestionsContext,
} from "../context/questions-context";
import { QrScanner, scanQr } from "./QrScanner";
import QuestionScreen from "./QuestionScreen";
import GridItem from "./ui/GridItem";
import IconButton from "./ui/IconButton";

const Stack = createNativeStackNavigator();

function QuestionNavigator() {
  return (
    <QuestionsContextProvider>
      <Stack.Navigator>
        <Stack.Screen name="all-questions" component={AllQuestionsScreen} />
        <Stack.Screen name="one-question" component={QuestionScreen} />
        <Stack.Screen
          name="qr-scanner"
          component={QrScanner}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </QuestionsContextProvider>
  );
}

function AllQuestionsScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const [permission, requestPermission] = useCameraPermissions();
  const questionsCtx = useContext(QuestionsContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "All Questions",
      headerRight: () => (
        <IconButton
          icon="qr-code-outline"
          color="black"
          onPress={scanQr.bind(this, navigation, permission, requestPermission)}
        />
      ),
    });
  });

  function isPotrait() {
    return width < height;
  }

  function pressHandler(questionIdx) {
    navigation.navigate("one-question", questionsCtx.questions[questionIdx]);
  }

  return (
    <SafeAreaView
      style={[styles.container, { marginVertical: isPotrait() ? 120 : 0 }]}
      edges={["bottom"]}
    >
      {(() => {
        const matrix = [];
        let questionIdx = 0;
        for (let i = 0; i < 5; i++) {
          matrix.push(
            <View style={styles.row} key={i}>
              {(() => {
                const row = [];
                for (let j = 0; j < 4; j++) {
                  const currentIdx = questionIdx; // To avoid closure issue in JavaScript
                  row.push(
                    <GridItem
                      text={questionIdx + 1}
                      onPress={() => pressHandler(currentIdx)}
                      unlocked={questionsCtx.questions[questionIdx].unlocked}
                      key={j}
                    />
                  );
                  questionIdx++;
                }
                return row;
              })()}
            </View>
          );
        }
        return matrix;
      })()}
    </SafeAreaView>
  );
}

export default QuestionNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
});

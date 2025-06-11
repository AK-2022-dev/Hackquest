// Question 20 ones here
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import QuestionScreen from "../components/QuestionScreen";
import questions from "../data/dummy";
import scanQR from "./QrScanner";
import GridItem from "./ui/GridItem";
import IconButton from "./ui/IconButton";

const Stack = createNativeStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => (
          <IconButton icon="qr-code-outline" color="black" onPress={scanQR} />
        ),
      }}
    >
      <Stack.Screen
        name="all-questions"
        component={AllQuestionsScreen}
        options={{ title: "All Questions" }}
      />
      <Stack.Screen name="question" component={QuestionScreen} />
    </Stack.Navigator>
  );
}

function AllQuestionsScreen({ navigation }) {
  const { width, height } = useWindowDimensions();

  function isPotrait() {
    return width < height;
  }

  function pressHandler(questionIdx) {
    navigation.navigate("question", questions[questionIdx]);
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

export default StackNavigation;

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

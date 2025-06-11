import { Pressable, StyleSheet, Text, View } from "react-native";

function GridItem({ text, onPress }) {
  return (
    <View style={styles.outerContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <View style={styles.innerItem}>
          <Text style={styles.gridText}>{text}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default GridItem;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    margin: 4,
  },
  innerItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    borderWidth: 2,
    borderRadius: 10,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 10,
  },
  gridText: {
    fontSize: 28,
  }
});

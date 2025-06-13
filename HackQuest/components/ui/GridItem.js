import { Pressable, StyleSheet, Text, View } from "react-native";

function GridItem({ text, onPress, unlocked }) {
  return (
    <View style={[styles.outerContainer, { opacity: unlocked ? 1 : 0.4 }]}>
      <Pressable
        style={styles.button}
        onPress={onPress}
        disabled={!unlocked}
        android_ripple={{color: "#888"}}
      >
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
    backgroundColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
  },
  innerItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
});

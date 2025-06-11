import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

function IconButton({ icon, color, onPress }) {
  return (
    <Pressable onPress={onPress} style={{ marginHorizontal: 12 }}>
      <Ionicons name={icon} size={24} color={color} />
    </Pressable>
  );
}

export default IconButton;

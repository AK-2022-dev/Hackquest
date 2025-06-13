import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

function IconButton({ icon, color, onPress }) {
  const size = 24;

  return (
    <Pressable
      onPress={onPress}
      style={{ marginRight: 12, width: size, height: size }}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

export default IconButton;

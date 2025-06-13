// QR scanner functionality
import { CameraView, PermissionStatus } from "expo-camera";
import { useContext, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { QuestionsContext } from "../context/questions-context";

async function verifyPermissions(permission, requestPermission) {
  if (permission.status === PermissionStatus.UNDETERMINED) {
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  }

  if (permission.status === PermissionStatus.DENIED) {
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  }

  return true;
}

export async function scanQr(navigation, permission, requestPermission) {
  if (await verifyPermissions(permission, requestPermission)) {
    navigation.navigate("qr-scanner");
  } else {
    Alert.alert(
      "Insufficient Permissions!",
      "You need to grant camera permission to scan QR codes."
    );
  }
}

export function QrScanner({ navigation }) {
  const [scaned, setScanned] = useState(false);
  const questionsCtx = useContext(QuestionsContext);

  function scanHandler({ data }) {
    if (scaned) return;
    setScanned(true);

    questionsCtx.onScan(data);

    // Go back to AllQuestionsScreen
    navigation.goBack();
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanHandler}
      />
      <View style={styles.overlay}>
        <View style={styles.cornerBox}>
          {/* Corners */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
      </View>
    </View>
  );
}

const boxSize = 250;
const cornerLength = 30;
const borderWidth = 4;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  cornerBox: {
    width: boxSize,
    height: boxSize,
    position: "relative",
  },
  corner: {
    width: cornerLength,
    height: cornerLength,
    position: "absolute",
    borderColor: "white",
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: borderWidth,
    borderLeftWidth: borderWidth,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: borderWidth,
    borderRightWidth: borderWidth,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: borderWidth,
    borderLeftWidth: borderWidth,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: borderWidth,
    borderRightWidth: borderWidth,
  },
});

import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARPlaneSelector,
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

const HelloWorldSceneAR = () => {
  const [placed, setPlaced] = useState(false);

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      console.log(placed);
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }
  useEffect(() => {
    if (placed) {
      console.log("placed successfully");
    }
  }, [placed]);
  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color={"#ffffff"} />
      <ViroARPlaneSelector
        minHeight={0.1}
        minWidth={0.1}
        onPlaneSelected={() => setPlaced(true)}
      >
        <Viro3DObject
          source={require("./assets/RobotKit.glb")}
          position={[0, 0, 0]}
          scale={[0.05, 0.05, 0.05]}
          rotation={[0, 180, 0]}
          type="GLB"
        />
      </ViroARPlaneSelector>
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});

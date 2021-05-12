import React, { useMemo } from "react";
import BackgroundIcon from "assets/Background.svg";
import { Dimensions, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Background() {
  const wBg = useMemo(() => Math.round((width / 375) * 375), [width]);
  const hBg = useMemo(() => Math.round((height / 676) * 676), [height]);

  return (
    <View
      style={{
        position: "absolute",
        top: "-7%",
        left: 0,
        zIndex: -10000,
        backgroundColor: "#FFF",
      }}
    >
      <BackgroundIcon width={wBg < 375 ? 375 : wBg} height={hBg} />
    </View>
  );
}

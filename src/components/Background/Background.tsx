import React, { useMemo } from "react";
import BackgroundIcon from "../../../assets/Background.svg";
import BackgroundMIcon from "../../../assets/BackgroundMechanic.svg";
import { Dimensions, View } from "react-native";
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("window");

export default function Background() {
  const {
    user: { user_role },
  } = useSelector((state) => state);
  const wBg = useMemo(() => Math.round((width / 375) * 375), [width]);
  const hBg = useMemo(() => Math.round((height / 676) * 676), [height]);

  return (
    <View
      style={{
        position: "absolute",
        top: "-7%",
        left: 0,
        zIndex: -1000,
        backgroundColor: "#FFF",
      }}
    >
      {user_role !== "Conductor" ? (
        <BackgroundMIcon width={wBg < 375 ? 375 : wBg} height={hBg} />
      ) : (
        <BackgroundIcon width={wBg < 375 ? 375 : wBg} height={hBg} />
      )}
    </View>
  );
}

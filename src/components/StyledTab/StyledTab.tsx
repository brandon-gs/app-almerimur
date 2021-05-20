import React, { useState } from "react";
import {
  BottomTabBarOptions,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { Keyboard, TouchableOpacity, View } from "react-native";
import StyledText from "../StyledText";
import Home from "assets/Home.svg";
import Profile from "assets/Profile.svg";
import History from "assets/History.svg";
import { theme } from "theme/";
import Message from "../Message";
import { useDispatch, useSelector } from "react-redux";
import actions from "store/actions";
import { MessageTypes } from "store/reducers/message";
import Modal from "../Modal";

interface StyledTabProps extends BottomTabBarProps<BottomTabBarOptions> {}

function StyledTab({ state, descriptors, navigation }: StyledTabProps) {
  const { message, show, type } = useSelector((state) => state.message);

  const dispatch = useDispatch();
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  /** Show TabNavigation when keyboard is closed */
  React.useEffect(() => {
    const keyboadrDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboadrDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onPressMessage = () => {
    dispatch(
      actions.updateGlobalMessage({
        message: "",
        show: false,
        type: MessageTypes.Danger,
      })
    );
  };

  /** If keyboard is open dont show TabNavigation */
  if (isKeyboardVisible) {
    return null;
  }

  return (
    <>
      <Message
        message={message}
        show={show}
        type={type}
        onPress={onPressMessage}
      />
      <Modal />
      <View
        style={{
          flexDirection: "row",
          backgroundColor: theme.colors.background,
          height: 56,
          justifyContent: "center",
          alignItems: "center",
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const Icon =
            label === "Perfil"
              ? Profile
              : label === "Histórico"
              ? History
              : Home;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            dispatch(
              actions.updateGlobalMessage({
                message: "",
                show: false,
                type: MessageTypes.Danger,
              })
            );
            dispatch(actions.hideModal());
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return options.tabBarVisible ? (
            <TouchableOpacity
              key={`styled-tab-${index}`}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                borderRightColor: "rgba(0,0,0,0.2)",
                borderRightWidth: 1,
                height: "100%",
              }}
            >
              <View style={{ marginRight: 8 }}>
                <Icon width="23" height="23" />
              </View>
              <StyledText
                style={{
                  fontWeight: isFocused ? "bold" : "normal",
                  color: theme.colors.primary,
                }}
              >
                {label}
              </StyledText>
            </TouchableOpacity>
          ) : null;
        })}
      </View>
    </>
  );
}

export default StyledTab;

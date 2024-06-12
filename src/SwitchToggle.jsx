import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableWithoutFeedback } from "react-native";

const COLORS = {
  white: "#FFFFFF",
  violet: "#8C2C8C",
  lightWhite: "#EEE9FD",
  lightestWhite: "#F1F1F1",
};

const TOGGLE_HEIGHT_WIDTH = 27;

const SwitchToggle = ({ name, value, onChange }) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    onValueChange(value);
  }, [value]);

  const onValueChange = (value) => {
    const toValue = value ? 1 : 0;
    Animated.spring(animation, {
      toValue,
      delay: 1,
      bounciness: 10,
      useNativeDriver: true,
    }).start();
    onChange(name, value);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onValueChange(!value);
      }}
    >
      <Animated.View
        style={[
          styles.toggleContainer,
          {
            backgroundColor: animation.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [
                COLORS.lightestWhite,
                COLORS.lightWhite,
                COLORS.violet,
              ],
            }),
          },
        ]}
      >
        <Animated.View
          style={[
            styles.toggleSwitch,
            {
              transform: [
                {
                  translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1.8, 26],
                  }),
                },
                { perspective: 1000 },
              ],
            },
          ]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default SwitchToggle;

const styles = StyleSheet.create({
  toggleContainer: {
    width: 55,
    height: 30.8,
    borderRadius: 30,
    justifyContent: "center",
  },
  toggleSwitch: {
    elevation: 6,
    position: "absolute",
    width: TOGGLE_HEIGHT_WIDTH,
    height: TOGGLE_HEIGHT_WIDTH,
    backgroundColor: COLORS.white,
    borderRadius: TOGGLE_HEIGHT_WIDTH / 2,
  },
});

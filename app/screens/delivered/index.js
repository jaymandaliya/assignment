import React, { useEffect } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  interpolate,
  runOnJS,
} from "react-native-reanimated";
import {
  AppStyle,
  Assets,
  Colors,
  FontFamily,
  IconCloseLight,
  Layouts,
  Scale,
} from "../../theme";
import { Header, TextView } from "../../components";
import styles from "./styles";
import { goBack } from "../../navigator/utils";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Delivered = () => {
  const headerOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);
  const titleOpacity = useSharedValue(0);
  const subtitleTranslateY = useSharedValue(30);
  const subtitleOpacity = useSharedValue(0);
  const imageScale = useSharedValue(0);
  const imageRotate = useSharedValue(0);
  const buttonTranslateY = useSharedValue(50);
  const buttonOpacity = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 600 });
    
    titleTranslateY.value = withDelay(200, withSpring(0, { damping: 15 }));
    titleOpacity.value = withDelay(200, withTiming(1, { duration: 800 }));
    
    subtitleTranslateY.value = withDelay(400, withSpring(0, { damping: 15 }));
    subtitleOpacity.value = withDelay(400, withTiming(1, { duration: 800 }));
    
    imageScale.value = withDelay(600, withSpring(1, { damping: 8, stiffness: 100 }));
    imageRotate.value = withDelay(600, withSequence(
      withTiming(10, { duration: 300 }),
      withTiming(-5, { duration: 200 }),
      withTiming(0, { duration: 200 })
    ));
    
    buttonTranslateY.value = withDelay(800, withSpring(0, { damping: 12 }));
    buttonOpacity.value = withDelay(800, withTiming(1, { duration: 600 }));

    const startPulse = () => {
      pulseScale.value = withSequence(
        withTiming(1.05, { duration: 1500 }),
        withTiming(1, { duration: 1500 }),
        withTiming(1.05, { duration: 1500 }, () => {
          runOnJS(startPulse)();
        })
      );
    };

    const pulseTimeout = setTimeout(startPulse, 1200);
    
    return () => clearTimeout(pulseTimeout);
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleTranslateY.value }],
  }));

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(imageScale.value, [0, 1], [0, 1]),
    transform: [
      { scale: imageScale.value * pulseScale.value },
      { rotate: `${imageRotate.value}deg` },
    ],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonTranslateY.value }],
  }));

  const handleButtonPress = () => {
    buttonTranslateY.value = withSequence(
      withTiming(-5, { duration: 100 }),
      withTiming(0, { duration: 100 })
    );
  };

  return (
    <View style={[AppStyle.fillBg, Layouts.hPadding16]}>
      <Animated.View style={headerAnimatedStyle}>
        <Header
          leftIcon={IconCloseLight}
          showRightIcons={false}
          leftIconStyle={styles.leftIcon}
          showCustomContent={true}
          rightCustomContent={
            <View style={[AppStyle.rowHCenter, Layouts.mr15]}>
              <TouchableOpacity style={[styles.helpBtn, Layouts.ml15]}>
                <TextView
                  text={"Help"}
                  fontFamily={FontFamily.medium}
                  fontSize={Scale(14)}
                />
              </TouchableOpacity>
            </View>
          }
          onLeftPress={goBack}
        />
      </Animated.View>

      <Animated.View style={titleAnimatedStyle}>
        <TextView
          text={"Enjoy your order"}
          fontFamily={FontFamily.medium}
          fontSize={Scale(24)}
          style={Layouts.mt15}
        />
      </Animated.View>

      <Animated.View style={subtitleAnimatedStyle}>
        <TextView
          text={
            "Jonathan and Subway (Warriors Arena Road) worked their magic for you. Take a minute to rate, tip, and say thanks."
          }
          fontFamily={FontFamily.medium}
          fontSize={Scale(16)}
          style={[
            { lineHeight: Scale(24) },
            Layouts.mt20,
            Layouts.mb30,
          ]}
        />
      </Animated.View>

      <Animated.Image
        source={Assets.deliveryBag}
        style={[
          AppStyle.alignSelfCenter,
          Layouts.mt35,
          Layouts.mb30,
          imageAnimatedStyle,
        ]}
      />

      <AnimatedTouchableOpacity
        style={[
          styles.checkOutBtn,
          Layouts.mt100,
          buttonAnimatedStyle,
        ]}
        onPress={handleButtonPress}
      >
        <TextView
          text={"Close"}
          fontFamily={FontFamily.medium}
          fontSize={Scale(16)}
          color={Colors.white}
        />
      </AnimatedTouchableOpacity>
    </View>
  );
};

export default Delivered;
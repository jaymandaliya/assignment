import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { View, Image, ScrollView, TouchableOpacity, Pressable, Dimensions, Animated as RNAnimated } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import Animated, { 
  FadeIn, 
  FadeInDown, 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import {
  AppStyle,
  Assets,
  Colors,
  FontFamily,
  IconCart,
  IconCloseBold,
  IconEdit,
  IconIncrease,
  IconMinus,
  IconPlus,
  Layouts,
  Scale,
} from "../../theme";
import { Header, TextView } from "../../components";
import { useRoute } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";
import LabelValueRow from "./LabelValueRow";
import styles from "./styles";
import { goBack, navigate } from "../../navigator/utils";
import { addToCart, updateQuantity } from "../../reducers/cartSlice";


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ProductDetail = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const imageName = route.params?.imageName;
  const productId = route.params?.id;
  const [productDetail] = useState(route.params);
  
  // Get cart data from Redux
  const cartItems = useSelector(state => state.cart.items);
  const totalCartItems = useSelector(state => state.cart.totalQuantity);
  
  // Get current product quantity from cart
  const currentCartItem = cartItems.find(item => item.id === productId);
  const [quantity, setQuantity] = useState(currentCartItem?.quantity || 0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  // Update local quantity when cart changes
  useEffect(() => {
    const cartItem = cartItems.find(item => item.id === productId);
    setQuantity(cartItem?.quantity || 0);
  }, [cartItems, productId]);
  
  // Animation refs and values
  const productImageRef = useRef(null);
  const addToCartButtonRef = useRef(null);
  const flyingImageOpacity = useSharedValue(0);
  const flyingImageScale = useSharedValue(1);
  const flyingImageTranslateX = useSharedValue(0);
  const flyingImageTranslateY = useSharedValue(0);
  const cartBounce = useSharedValue(1);
  const buttonScale = useSharedValue(1);
  const successScale = useSharedValue(0);

  const nutritionItems = useMemo(() => [
    { label: "Total Fat", value: "0g", percent: "0%", fontSize: 16 },
    { label: "Saturated Fat", value: "0g", percent: "0%", fontSize: 16 },
    { label: "Total Fat", value: "0g", percent: "0%", fontSize: 16 },
    { label: "Sodium", value: "Omg", percent: "%", fontSize: 18 },
    { label: "Total Carbohydrate", value: "30g", percent: "0%", fontSize: 16 },
    { label: "Dietary Fiber", value: "30g", percent: "10%", fontSize: 16 },
    { label: "Sugar", value: "19g", percent: "10%", fontSize: 16 },
    { label: "Protein", value: "1g", percent: null, fontSize: 18 },
  ], []);

  const related = useMemo(() => [
    { url: Assets.advacado, id: 'avocado' },
    { url: Assets.appleMini, id: 'apple' },
    { url: Assets.pillsBlurryFamilySize, id: 'pills' },
    { url: Assets.frozenChicken, id: 'chicken' },
  ], []);

  const additionalNutritionItems = useMemo(() => [
    { label: "Potassium", value: "15%" },
    { label: "Calcium", value: "0%" },
    { label: "Iron", value: "2%" },
    { label: "Vitamin A", value: "2%" },
    { label: "Vitamin C", value: "15%" },
  ], []);

  const handleIncreaseQuantity = useCallback(() => {
    const newQuantity = quantity + 1;
    dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
  }, [dispatch, productId, quantity]);

  const handleDecreaseQuantity = useCallback(() => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
    }
  }, [dispatch, productId, quantity]);

  // Animation completion callback
  const onAnimationComplete = useCallback(() => {
    setIsAddingToCart(false);
  }, []);

  // Add to cart with animation
  const handleAddToCart = useCallback(() => {
    if (isAddingToCart) return;
    
    setIsAddingToCart(true);
    
    // Add to Redux cart
    dispatch(addToCart({
      id: productId,
      name: productDetail?.name,
      price: productDetail?.price,
      unit: productDetail?.unit,
      image: productDetail?.image,
      imageName: imageName,
    }));
    
    // Button press animation
    buttonScale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );

    // Get button position for starting point
    addToCartButtonRef.current?.measure((x, y, width, height, pageX, pageY) => {
      const startX = pageX + width / 2;
      const startY = pageY + height / 2;
      
      // Cart icon position (approximate - adjust based on your header layout)
      const endX = screenWidth - 50; // Adjust based on cart icon position
      const endY = 80; // Adjust based on header height
      
      // Calculate translation distances
      const translateX = endX - startX;
      const translateY = endY - startY;
      
      // Set initial position
      flyingImageTranslateX.value = 0;
      flyingImageTranslateY.value = 0;
      flyingImageScale.value = 1;
      flyingImageOpacity.value = 1;
      
      // Animate the flying image
      flyingImageTranslateX.value = withTiming(translateX, { duration: 800 });
      flyingImageTranslateY.value = withTiming(translateY, { duration: 800 });
      flyingImageScale.value = withSequence(
        withTiming(1.2, { duration: 200 }),
        withTiming(0.3, { duration: 600 })
      );
      flyingImageOpacity.value = withSequence(
        withTiming(1, { duration: 100 }),
        withTiming(0.8, { duration: 500 }),
        withTiming(0, { duration: 200 }, () => {
          // Cart bounce animation
          cartBounce.value = withSequence(
            withSpring(1.3, { damping: 10, stiffness: 200 }),
            withSpring(1, { damping: 8, stiffness: 150 })
          );
          
          // Success feedback
          successScale.value = withSequence(
            withSpring(1, { damping: 10, stiffness: 200 }),
            withTiming(0, { duration: 1000 }, () => {
              runOnJS(onAnimationComplete)();
            })
          );
        })
      );
    });
  }, [isAddingToCart, dispatch, productId, productDetail, imageName, buttonScale, flyingImageOpacity, flyingImageScale, flyingImageTranslateX, flyingImageTranslateY, cartBounce, successScale, onAnimationComplete]);

  // Animated styles
  const flyingImageStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: screenHeight * 0.4,
    left: screenWidth * 0.4,
    width: 60,
    height: 60,
    opacity: flyingImageOpacity.value,
    transform: [
      { translateX: flyingImageTranslateX.value },
      { translateY: flyingImageTranslateY.value },
      { scale: flyingImageScale.value },
    ],
    zIndex: 1000,
  }));

  const cartIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cartBounce.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const successFeedbackStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: screenHeight * 0.5,
    left: screenWidth * 0.5 - 50,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.success || '#4CAF50',
    opacity: interpolate(successScale.value, [0, 1], [0, 0.9], Extrapolate.CLAMP),
    transform: [{ scale: successScale.value }],
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  }));

  const renderNutritionRow = useCallback(({ label, value, percent, fontSize }, index) => (
    <View
      key={`${label}-${index}`}
      style={[
        AppStyle.rowHCenter,
        AppStyle.justifyContentBetween,
        Layouts.mt10,
      ]}
    >
      <View style={AppStyle.rowHCenter}>
        <TextView
          text={`${label} `}
          fontFamily={FontFamily.medium}
          fontSize={Scale(fontSize)}
        />
        <TextView
          text={value}
          fontFamily={FontFamily.medium}
          fontSize={Scale(fontSize)}
          color={Colors.foundationWhite900}
        />
      </View>
      {percent !== null && (
        <TextView
          text={percent}
          fontFamily={FontFamily.medium}
          fontSize={Scale(fontSize)}
          color={Colors.foundationWhite900}
        />
      )}
    </View>
  ), []);

  const renderAdditionalNutritionRow = useCallback(({ label, value }, index) => (
    <View key={`additional-${index}`}>
      <View
        style={[
          AppStyle.rowHCenter,
          AppStyle.justifyContentBetween,
          Layouts.mt10,
        ]}
      >
        <TextView
          text={label}
          fontFamily={FontFamily.medium}
          fontSize={Scale(18)}
          color={Colors.foundationWhite900}
        />
        <TextView
          text={value}
          fontFamily={FontFamily.medium}
          fontSize={Scale(18)}
          color={Colors.foundationWhite900}
        />
      </View>
      <View
        style={[
          styles.borderOne,
          Layouts.mt10,
          index === additionalNutritionItems.length - 1 && Layouts.mb15,
        ]}
      />
    </View>
  ), [additionalNutritionItems.length]);

  const relatedImageStyle = useMemo(() => ({
    height: Scale(88),
    width: Scale(88),
  }), []);

  return (
    <View style={[AppStyle.fillBg]}>
      <Header 
        leftIcon={IconCloseBold} 
        rightIcons={[{ 
          icon: IconCart,
          onPress: () => navigate("OrderDetail"),
          badgeCount: totalCartItems
        }]} 
        onLeftPress={goBack} 
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
      >
        {Assets[imageName] && (
          <SharedElement id={`product.${productId}.image`}>
            <Image
              ref={productImageRef}
              source={Assets[imageName]}
              style={{ height: Scale(256), width: "100%" }}
              resizeMode="contain"
            />
          </SharedElement>
        )}

        <Animated.View
          entering={FadeInDown.duration(300)}
          style={[Layouts.hPadding16, Layouts.mt10]}
        >
          <SharedElement id={`product.${productId}.title`}>
            <TextView
              text={productDetail?.name}
              fontFamily={FontFamily.bold}
              fontSize={Scale(24)}
              style={{ lineHeight: Scale(36) }}
            />
          </SharedElement>

          <View>
            <TextView
              text={"Information"}
              fontFamily={FontFamily.medium}
              fontSize={Scale(16)}
              style={[Layouts.mt20]}
            />
            <LabelValueRow label={"Price"} value={`${productDetail?.price}/pc`} />
            <LabelValueRow label={"Price per ground"} value={`${productDetail?.price}`} />
            <LabelValueRow label={"Package"} value={productDetail?.unit} />
          </View>

          <Animated.View entering={FadeIn.delay(100).duration(200)}>
            <TextView
              text={"Nutrition facts"}
              fontFamily={FontFamily.medium}
              fontSize={Scale(16)}
              style={Layouts.mt20}
            />

            <View style={[Layouts.mt15, styles.nutritionScreen]}>
              <TextView
                text={"Serving Size about 1 banana"}
                fontFamily={FontFamily.medium}
                fontSize={Scale(16)}
              />
              <View style={[styles.border, Layouts.mt10]} />

              <View
                style={[
                  AppStyle.rowHCenter,
                  Layouts.mt10,
                  AppStyle.justifyContentBetween,
                ]}
              >
                <TextView
                  text={"Calories 110"}
                  fontFamily={FontFamily.medium}
                  fontSize={Scale(16)}
                  numberOfLines={1}
                />
                <TextView
                  text={"% Daily Value"}
                  fontFamily={FontFamily.medium}
                  fontSize={Scale(16)}
                  numberOfLines={1}
                />
              </View>

              <View style={[styles.border, Layouts.mt10]} />

              {nutritionItems.map((item, index) => (
                <View key={`nutrition-${index}`}>
                  {renderNutritionRow(item, index)}
                  {(item.label === "Total Fat" && index === 2) ||
                  item.label === "Sodium" ||
                  item.label === "Protein" ? (
                    <View
                      style={[
                        item.label === "Sodium" || item.label === "Protein"
                          ? styles.borderOne
                          : styles.border,
                        Layouts.mt10,
                      ]}
                    />
                  ) : null}
                </View>
              ))}

              {additionalNutritionItems.map(renderAdditionalNutritionRow)}

              <TextView
                color={Colors.foundationWhite900}
                fontFamily={FontFamily.medium}
                fontSize={Scale(16)}
                text={`* The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutritional advice.`}
                style={{ lineHeight: Scale(24) }}
              />
            </View>
          </Animated.View>

          <View>
            <TextView
              text={"Related"}
              fontFamily={FontFamily.medium}
              fontSize={Scale(16)}
              style={[Layouts.mt20, Layouts.mb10]}
            />
          </View>
        </Animated.View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={true}
          pagingEnabled={false}
          contentContainerStyle={[Layouts.pl10]}
          decelerationRate="fast"
        >
          {related.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              style={styles.relatedProductItem}
            >
              <Image
                source={item.url}
                resizeMode="contain"
                style={relatedImageStyle}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View
          style={[
            Layouts.hPadding16,
            AppStyle.rowHCenter,
            AppStyle.justifyContentBetween,
            Layouts.mt35,
            Layouts.mb20,
          ]}
        >
          {quantity > 0 ? (
            <View style={[AppStyle.rowHCenter]}>
              <View
                style={[
                  AppStyle.rowHCenter,
                  styles.quantityView,
                  AppStyle.justifyContentBetween,
                  Layouts.hPadding10,
                ]}
              >
                <Pressable
                  onPress={handleDecreaseQuantity}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <IconMinus />
                </Pressable>
                <TextView
                  text={quantity.toString()}
                  fontFamily={FontFamily.medium}
                  fontSize={Scale(16)}
                  style={[{ minWidth: Scale(30), textAlign: 'center' }]}
                />
                <Pressable
                  onPress={handleIncreaseQuantity}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <IconPlus />
                </Pressable>
              </View>
              <TextView
                text={`${quantity}pc`}
                fontFamily={FontFamily.medium}
                fontSize={Scale(16)}
                style={[Layouts.ml10]}
              />
            </View>
          ) : (
            <Animated.View style={buttonAnimatedStyle}>
              <TouchableOpacity 
                ref={addToCartButtonRef}
                style={[styles.buttonSmall]} 
                onPress={handleAddToCart}
                disabled={isAddingToCart}
              >
                <TextView
                  text={isAddingToCart ? 'Adding...' : 'Add to Cart'}
                  fontFamily={FontFamily.medium}
                  fontSize={Scale(16)}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </Animated.View>
          )}

          <TouchableOpacity style={[AppStyle.rowHCenter]}>
            <IconEdit />
            <TextView
              text={'Leave a note'}
              fontFamily={FontFamily.medium}
              fontSize={Scale(16)}
              style={Layouts.ml10}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Flying Image Animation */}
      {Assets[imageName] && (
        <Animated.View style={flyingImageStyle} pointerEvents="none">
          <Image
            source={Assets[imageName]}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
          />
        </Animated.View>
      )}

      {/* Success Feedback */}
      <Animated.View style={successFeedbackStyle} pointerEvents="none">
        <TextView
          text="✓"
          fontSize={Scale(30)}
          color={Colors.white}
          fontFamily={FontFamily.bold}
        />
      </Animated.View>
    </View>
  );
};

export default ProductDetail;
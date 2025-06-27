import React, { useState, useCallback, useMemo, memo, useRef, useEffect } from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  NativeModules,
} from "react-native";
import {
  AppStyle,
  Assets,
  Colors,
  FontFamily,
  IconBackArrow,
  IconCart,
  IconChevronRight,
  IconDurationClock,
  IconPerson,
  IconPricingFees,
  IconSearch,
  Layouts,
  Scale,
} from "../../theme";
import { Header, TextView } from "../../components";
import styles from "./styles";
import { navigate } from "../../navigator/utils";
import { SharedElement } from "react-navigation-shared-element";
// alert(JSON.stringify(NativeModules))
// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Custom hook for smooth animations
const useScaleAnimation = (initialValue = 1) => {
  const scaleValue = useRef(new Animated.Value(initialValue)).current;

  const animateScale = useCallback((toValue, duration = 150) => {
    Animated.timing(scaleValue, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  }, [scaleValue]);

  return [scaleValue, animateScale];
};

// Quantity Button Component with animations (preserving original styles)
const QuantityButton = memo(({ onPress, children, style, disabled = false, isOriginalPlus = false }) => {
  const [scaleValue, animateScale] = useScaleAnimation(1);

  const handlePressIn = useCallback(() => {
    animateScale(0.95);
  }, [animateScale]);

  const handlePressOut = useCallback(() => {
    animateScale(1);
  }, [animateScale]);

  const handlePress = useCallback(() => {
    if (!disabled) {
      onPress?.();
    }
  }, [onPress, disabled]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        style={[
          isOriginalPlus ? null : {
            width: Scale(30),
            height: Scale(30),
            borderRadius: Scale(15),
            backgroundColor: disabled ? Colors.foundationWhite900 : Colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: disabled ? 0.5 : 1,
          },
          style
        ]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.7}
        disabled={disabled}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
});

// Enhanced ProductCard component with quantity management
const ProductCard = memo(({ item, quantity, onQuantityChange }) => {
  const [fadeAnim] = useState(new Animated.Value(1));
  const [scaleValue, animateScale] = useScaleAnimation(1);

  const handleProductPress = useCallback(() => {
    animateScale(0.98, 100);
    setTimeout(() => {
      animateScale(1, 100);

      const productData = {
        ...item,
        imageSource: item.image, // Keep original reference
        imageName: getImageName(item.image), // Add image name for debugging
      };
      navigate('ProductDetail', productData);

    }, 100);
  }, [item, animateScale]);
  const getImageName = useCallback((imageAsset) => {
    // This helps identify which asset is being passed
    const assetMap = {
      [Assets.banana]: 'banana',
      [Assets.advacado]: 'advacado',
      [Assets.tomato]: 'tomato',
      [Assets.cocaCola]: 'cocaCola',
      [Assets.pulpy]: 'pulpy',
      [Assets.signature]: 'signature',
      [Assets.chickenBites]: 'chickenBites',
      [Assets.appleMapple]: 'appleMapple',
      [Assets.frozenChicken]: 'frozenChicken',
      [Assets.honey]: 'honey',
      [Assets.pillsBurry]: 'pillsBurry',
      [Assets.pillsBlurryFamilySize]: 'pillsBlurryFamilySize',
      [Assets.doriTosNacho]: 'doriTosNacho',
      [Assets.wheatThrins]: 'wheatThrins',
      [Assets.dorito]: 'dorito',
      [Assets.signatureFarms]: 'signatureFarms',
      [Assets.boars]: 'boars',
      [Assets.jenny]: 'jenny',
      [Assets.openNature]: 'openNature',
      [Assets.primo]: 'primo',
      [Assets.tillaMook]: 'tillaMook',
    };
    return assetMap[imageAsset] || 'unknown';
  }, []);

  const handleQuantityIncrease = useCallback(() => {
    LayoutAnimation.configureNext({
      duration: 200,
      create: { type: 'easeInEaseOut', property: 'opacity' },
      update: { type: 'easeInEaseOut' },
    });
    onQuantityChange?.(item.id, (quantity || 0) + 1);
  }, [item.id, quantity, onQuantityChange]);

  const handleQuantityDecrease = useCallback(() => {
    if (quantity > 0) {
      LayoutAnimation.configureNext({
        duration: 200,
        create: { type: 'easeInEaseOut', property: 'opacity' },
        update: { type: 'easeInEaseOut' },
      });
      onQuantityChange?.(item.id, quantity - 1);
    }
  }, [item.id, quantity, onQuantityChange]);

  const renderQuantityControls = useCallback(() => {
    if (!quantity || quantity === 0) {
      return (
        <TouchableOpacity
          style={[AppStyle.alignItemsEnd]}
          onPress={handleQuantityIncrease}
          activeOpacity={0.7}
        >
          <Image source={Assets.iconPlus} style={[styles.plusIcon]} />
        </TouchableOpacity>
      );
    }

    return (
      <View
        style={[
          AppStyle.rowHCenter,
          {
            backgroundColor: Colors.foundationWhite100,
            borderRadius: Scale(20),
            paddingHorizontal: Scale(4),
            paddingVertical: Scale(2),
          }
        ]}
      >
        <QuantityButton
          onPress={handleQuantityDecrease}
          style={{
            backgroundColor: Colors.foundationWhite300,
            width: Scale(26),
            height: Scale(26),
            borderRadius: Scale(13),
          }}
        >
          <TextView
            text="-"
            fontFamily={FontFamily.medium}
            fontSize={Scale(16)}
            color={Colors.foundationBlack500}
          />
        </QuantityButton>

        <View
          style={[
            {
              minWidth: Scale(30),
              alignItems: 'center',
              marginHorizontal: Scale(8),
            }
          ]}
        >
          <TextView
            text={quantity.toString()}
            fontFamily={FontFamily.medium}
            fontSize={Scale(16)}
            color={Colors.foundationBlack500}
          />
        </View>

        <QuantityButton
          onPress={handleQuantityIncrease}
          style={{
            width: Scale(26),
            height: Scale(26),
            borderRadius: Scale(13),
          }}
        >
          <TextView
            text="+"
            fontFamily={FontFamily.medium}
            fontSize={Scale(14)}
            color={Colors.white}
          />
        </QuantityButton>
      </View>
    );
  }, [quantity, handleQuantityIncrease, handleQuantityDecrease]);

  return (
    <Animated.View
      style={[
        // styles.productCard,
        {
          transform: [{ scale: scaleValue }],
          opacity: fadeAnim,
        }
      ]}
    >
      <TouchableOpacity
        style={[styles.productCard]}
        onPress={handleProductPress}
        activeOpacity={0.9}
      >
        <View style={[AppStyle.alignItemsEnd]}>
          {renderQuantityControls()}
        </View>
        <SharedElement id={`product.${item.id}.image`} style={[{ zIndex: -10 }]}>

          <Image
            source={item.image}
            style={[styles.itemImage, Layouts.ml10]}
            resizeMode="contain"
          />
        </SharedElement>
        <SharedElement id={`product.${item.id}.title`}>

          <TextView
            text={item.name}
            fontFamily={FontFamily.medium}
            fontSize={Scale(16)}
            style={{ lineHeight: Scale(24) }}
            numberOfLines={2}
          />
        </SharedElement>

        <TextView
          text={item.price}
          fontFamily={FontFamily.regular}
          fontSize={Scale(14)}
          style={Layouts.mt5}
        />

        <TextView
          style={Layouts.mt8}
          text={item.unit}
          fontFamily={FontFamily.regular}
          color={Colors.foundationWhite900}
          numberOfLines={1}
        />
      </TouchableOpacity>
    </Animated.View>
  );
});

// Enhanced Banner component with parallax effect
const BannerItem = memo(({ item, index }) => {
  const [scaleValue, animateScale] = useScaleAnimation(1);

  const handlePressIn = useCallback(() => {
    animateScale(0.98);
  }, [animateScale]);

  const handlePressOut = useCallback(() => {
    animateScale(1);
  }, [animateScale]);

  return (

    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Image
        key={index}
        source={item.url}
        style={[styles.imageBanner]}
        resizeMode="cover"
      />
    </TouchableOpacity>

  );
});

// Enhanced Category Section with staggered animations
const CategorySection = memo(({ category, onSeeAllPress, quantities, onQuantityChange }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const renderProductItem = useCallback(
    ({ item, index }) => (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            })
          }]
        }}
      >
        <ProductCard
          item={item}
          quantity={quantities[item.id] || 0}
          onQuantityChange={onQuantityChange}
        />
      </Animated.View>
    ),
    [quantities, onQuantityChange, fadeAnim]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  const handleSeeAllPress = useCallback(() => {
    onSeeAllPress?.(category);
  }, [category, onSeeAllPress]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <View
        style={[
          AppStyle.rowHCenter,
          Layouts.mt15,
          AppStyle.justifyContentBetween,
          Layouts.hMargin15,
          Layouts.mt25,
        ]}
      >
        <TextView
          text={category.title}
          fontFamily={FontFamily.medium}
          fontSize={Scale(18)}
        />

        {category.seeAll && (
          <TouchableOpacity
            style={[AppStyle.rowHCenter]}
            onPress={handleSeeAllPress}
            activeOpacity={0.7}
          >
            <TextView
              text="See all"
              fontFamily={FontFamily.medium}
              fontSize={Scale(16)}
            />
            <IconChevronRight />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        style={[Layouts.mt15]}
        data={category.products}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={renderProductItem}
        contentContainerStyle={{
          paddingRight: Scale(10), // 10px margin for last element
        }}
        keyExtractor={keyExtractor}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={10}
        removeClippedSubviews={true}
        getItemLayout={(data, index) => ({
          length: 200,
          offset: 200 * index,
          index,
        })}
      />
    </Animated.View>
  );
});

// Enhanced Segment Tab with smooth transitions
const SegmentTab = memo(({ item, index, isActive, onPress }) => {
  const [scaleValue, animateScale] = useScaleAnimation(1);

  const handlePressIn = useCallback(() => {
    animateScale(0.95);
  }, [animateScale]);

  const handlePressOut = useCallback(() => {
    animateScale(1);
  }, [animateScale]);

  const handlePress = useCallback(() => {
    LayoutAnimation.configureNext({
      duration: 250,
      create: { type: 'easeInEaseOut', property: 'opacity' },
      update: { type: 'easeInEaseOut' },
    });
    onPress(index);
  }, [index, onPress]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          isActive ? styles.activeTab : styles.inActiveTab,
          index !== 0 && { marginLeft: Scale(16) },
        ]}
        activeOpacity={0.8}
      >
        <TextView
          text={item.title}
          fontFamily={FontFamily.medium}
          fontSize={Scale(14)}
          color={isActive ? Colors.white : Colors.foundationBlack500}
        />
      </TouchableOpacity>
    </Animated.View>
  );
});

const Products = () => {
  const { DynamicIslandModule } = NativeModules;
  useEffect(() => {
    DynamicIslandModule.startFoodOrderActivity(
      '8 min',
      'Hoà Phan Dev',
      '8 min',
    )
  }, [])
  // State management
  const [segments, setSegments] = useState([
    { title: "Featured", isActive: true },
    { title: "Categories", isActive: false },
    { title: "Orders", isActive: false },
  ]);

  // Quantity state for all products
  const [productQuantities, setProductQuantities] = useState({});

  // Animation values
  const scrollY = useRef(new Animated.Value(0)).current;

  // Memoized banners data
  const banners = useMemo(
    () => [
      { url: Assets.promo },
      { url: Assets.promo },
      { url: Assets.promo },
    ],
    []
  );

  // Memoized categories data
  const categories = useMemo(
    () => [
      {
        id: "fruits-vegetables",
        title: "Fruits & Vegetables",
        seeAll: true,
        products: [
          {
            id: "organic-banana",
            name: "Organic Banana",
            price: "$0.37",
            unit: "1 banana",
            image: Assets.banana,
            addButton: true,
          },
          {
            id: "medium-hass-avocado",
            name: "Medium Hass Avocado",
            price: "$2.21",
            unit: "1 avocado",
            image: Assets.advacado,
            addButton: true,
          },
          {
            id: "large-hot-house-tomato",
            name: "Large Hot House Tomato",
            price: "$1.04",
            unit: "1 tomato",
            image: Assets.tomato,
            addButton: true,
          },
        ],
      },
      {
        id: "beverages",
        title: "Beverages",
        seeAll: true,
        products: [
          {
            id: "coca-cola-zero",
            name: "Coca-Cola Zero Sugar Cola Soda",
            price: "$8.99",
            unit: "12 x 12 fl oz",
            image: Assets.cocaCola,
            addButton: true,
          },
          {
            id: "simply-pulp-free-orange",
            name: "Simply Pulp Free Orange Juice",
            price: "$5.49",
            unit: "52 fl oz",
            image: Assets.pulpy,
            addButton: true,
          },
          {
            id: "signature-refresh-purified",
            name: "Signature Refresh Purified Water",
            price: "$4.39",
            unit: "24 x 16.9 fl oz",
            image: Assets.signature,
            addButton: true,
          },
        ],
      },
      {
        id: "frozen-foods",
        title: "Frozen Foods",
        seeAll: true,
        products: [
          {
            id: "tgi-fridays-boneless-chicken",
            name: "T.G.I. Friday's Boneless Buffalo Chicken Bites",
            price: "$10.04",
            unit: "15 oz",
            image: Assets.chickenBites,
            addButton: true,
          },
          {
            id: "apple-maple-sausages",
            name: "Apple and Maple Frozen Sausages",
            price: "$7.69",
            unit: "50 fl oz",
            image: Assets.appleMapple,
            addButton: true,
          },
          {
            id: "top-ramen-frozen",
            name: "Top Ramen Frozen Bowl",
            price: "$3.69",
            unit: "52 fl oz",
            image: Assets.frozenChicken,
            addButton: true,
          },
        ],
      },
      {
        id: "pantry-groceries-1",
        title: "Pantry & Groceries",
        seeAll: true,
        products: [
          {
            id: "yogi-honey-chai",
            name: "Yogi Honey Chai Turmeric Vitality",
            price: "$5.49",
            unit: "16 tea bags",
            image: Assets.honey,
            addButton: true,
          },
          {
            id: "pillsbury-sugarfree-chocolate",
            name: "Pillsbury Sugarfree Chocolate Brownie Mix",
            price: "$5.49",
            unit: "12.5 oz",
            image: Assets.pillsBurry,
            addButton: true,
          },
          {
            id: "pillsbury-family-milk-chocolate",
            name: "Pillsbury Family Milk Chocolate Brownie Mix",
            price: "$2.74",
            unit: "18.3 oz",
            image: Assets.pillsBlurryFamilySize,
            addButton: true,
          },
        ],
      },
      {
        id: "pantry-groceries-2",
        title: "Pantry & Groceries",
        seeAll: true,
        products: [
          {
            id: "doritos-nacho-cheese",
            name: "Doritos Nacho Cheese",
            price: "$6.15",
            unit: "9.3 oz",
            image: Assets.doriTosNacho,
            addButton: true,
          },
          {
            id: "wheat-thins-sundried",
            name: "Wheat Thins Sundried Tomato & Basil",
            price: "$5.49",
            unit: "8.5 oz",
            image: Assets.wheatThrins,
            addButton: true,
          },
          {
            id: "doritos-ranch-bag",
            name: "Doritos Ranch Bag",
            price: "$6.15",
            unit: "9.2 oz",
            image: Assets.dorito,
            addButton: true,
          },
        ],
      },
      {
        id: "meat-seafood-plant-based",
        title: "Meat, Seafood & Plant-Based",
        seeAll: true,
        products: [
          {
            id: "signature-farms-chicken",
            name: "Signature Farms Boneless Skinless Chicken",
            price: "$11.54",
            unit: "approx 1.5 lbs; per lb",
            image: Assets.signatureFarms,
            addButton: true,
          },
          {
            id: "boars-head-turkey",
            name: "Boar's Head Turkey Honey Maple Glazed",
            price: "$7.69",
            unit: "12 oz",
            image: Assets.boars,
            addButton: true,
          },
          {
            id: "jennie-o-ground-turkey",
            name: "Jennie-O 93% Lean Ground Turkey",
            price: "$7.14",
            unit: "16 oz",
            image: Assets.jenny,
            addButton: true,
          },
        ],
      },
      {
        id: "cheese",
        title: "Cheese",
        seeAll: true,
        products: [
          {
            id: "open-nature-vegan-non-dairy",
            name: "Open Nature Vegan non-Dairy",
            price: "$5.49",
            unit: "8 oz",
            image: Assets.openNature,
            addButton: true,
          },
          {
            id: "primo-taglio-herb-brie",
            name: "Primo Taglio Herb & Garlic Brie Cheese",
            price: "$7.70",
            unit: "approx 0.5 lb",
            image: Assets.primo,
            addButton: true,
          },
          {
            id: "tillamook-sharp-cheddar",
            name: "Tillamook Sharp Cheddar",
            price: "$5.49",
            unit: "8 oz",
            image: Assets.tillaMook,
            addButton: true,
          },
        ],
      },
    ],
    []
  );

  // Callback functions with useCallback for performance
  const onSegmentPress = useCallback((index) => {
    setSegments((prevSegments) =>
      prevSegments.map((item, i) => ({
        ...item,
        isActive: i === index,
      }))
    );
  }, []);

  const onQuantityChange = useCallback((productId, newQuantity) => {
    setProductQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, newQuantity),
    }));
  }, []);

  const onLeftPress = useCallback(() => {
    alert("Back pressed");
  }, []);

  const onPersonPress = useCallback(() => {
    alert("Person pressed");
  }, []);

  const onCartPress = useCallback(() => {

    navigate('OrderDetail')
  }, []);

  const onSearchPress = useCallback(() => {
    alert("Search pressed");
  }, []);

  const onSeeAllPress = useCallback((category) => {
    console.log("See all pressed for:", category.title);
  }, []);

  // Memoized render functions
  const renderBannerItem = useCallback(
    ({ item, index }) => <BannerItem item={item} index={index} />,
    []
  );

  const renderCategorySection = useCallback(
    ({ item }) => (
      <CategorySection
        category={item}
        onSeeAllPress={onSeeAllPress}
        quantities={productQuantities}
        onQuantityChange={onQuantityChange}
      />
    ),
    [onSeeAllPress, productQuantities, onQuantityChange]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  // Memoized header right icons
  const headerRightIcons = useMemo(
    () => [
      { icon: IconPerson, onPress: onPersonPress },
      { icon: IconCart, onPress: onCartPress },
    ],
    [onPersonPress, onCartPress]
  );

  // Calculate total cart items for badge
  const totalCartItems = useMemo(() => {
    return Object.values(productQuantities).reduce((sum, qty) => sum + qty, 0);
  }, [productQuantities]);

  return (
    <View style={AppStyle.fillBg}>
      <Header
        leftIcon={IconBackArrow}
        showTitle
        title="Safeway"
        onLeftPress={onLeftPress}
        centerTitle={false}
        rightIcons={headerRightIcons}
        cartBadgeCount={totalCartItems}
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        bounces={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.container}>
          {/* Search Bar */}
          <TouchableOpacity
            style={[
              styles.searchBar,
              AppStyle.rowHCenter,
              Layouts.hPadding10,
              Layouts.mt15,
              Layouts.hMargin5,
            ]}
            onPress={onSearchPress}
            activeOpacity={0.8}
          >
            <IconSearch />
            <TextView
              text="Search stores and produ..."
              fontFamily={FontFamily.medium}
              color={Colors.foundationWhite900}
              fontSize={Scale(16)}
              style={Layouts.ml7}
            />
          </TouchableOpacity>

          {/* Info Row */}
          <View style={[AppStyle.rowHCenter, Layouts.mt18]}>
            <View style={[AppStyle.fill, AppStyle.rowHCenter]}>
              <IconDurationClock />
              <TextView
                text="In 60 minutes"
                color={Colors.foundationBlack500}
                fontFamily={FontFamily.regular}
                fontSize={Scale(16)}
                style={Layouts.ml8}
              />
            </View>
            <View style={[AppStyle.fill, AppStyle.rowHCenter]}>
              <IconPricingFees />
              <TextView
                text="Pricing and Fees"
                color={Colors.foundationBlack500}
                fontFamily={FontFamily.regular}
                fontSize={Scale(16)}
                style={Layouts.ml8}
              />
            </View>
          </View>

          {/* Segment Tabs */}
          <View style={[AppStyle.row, Layouts.mt15]}>
            {segments.map((item, index) => (
              <SegmentTab
                key={item.title}
                item={item}
                index={index}
                isActive={item.isActive}
                onPress={onSegmentPress}
              />
            ))}
          </View>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[Layouts.pl15, Layouts.mt20]}
          data={banners}
          renderItem={renderBannerItem}
          keyExtractor={(item, index) => index.toString()}
          removeClippedSubviews={true}
          initialNumToRender={2}
          maxToRenderPerBatch={3}
        />

        {/* Categories */}
        <View style={[Layouts.mb100]}>
          <FlatList
            data={categories}
            renderItem={renderCategorySection}
            keyExtractor={keyExtractor}
            removeClippedSubviews={true}
            initialNumToRender={3}
            maxToRenderPerBatch={2}
            windowSize={5}
            scrollEnabled={false}
          />
        </View>
      </Animated.ScrollView>
    </View>
  );
};
export default memo(Products);
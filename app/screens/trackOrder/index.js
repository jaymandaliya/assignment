import React, { useState, useEffect, useRef } from "react";
import { ScrollView, TouchableOpacity, View, Animated, Image } from "react-native";
import { 
  AppStyle, 
  FontFamily, 
  IconCloseBold, 
  IconCloseLight, 
  IconShare, 
  Layouts, 
  Scale, 
  Colors, 
  Assets, 
  IconChevronDown
} from "../../theme";
import { Header, TextView } from "../../components";
import { goBack, navigate } from "../../navigator/utils";
import styles from "./styles";
import { shallowEqual, useSelector } from "react-redux";

const AnimatedProgressBar = ({ onComplete, onSecondStepComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5;
  const animatedValues = useRef(
    Array.from({ length: totalSteps }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => {
        if (prevStep >= totalSteps - 1) {
          clearInterval(interval);
          onComplete && onComplete();
          return prevStep;
        }
        const nextStep = prevStep + 1;
        animateStep(nextStep);
        
        if (nextStep === 1) {
          onSecondStepComplete && onSecondStepComplete();
        }
        
        return nextStep;
      });
    }, 3000);

    animateStep(0);

    return () => clearInterval(interval);
  }, []);

  const animateStep = (step) => {
    animatedValues.forEach((value, index) => {
      if (index < step) {
        value.setValue(1);
      } else if (index === step) {
        Animated.timing(value, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }).start();
      } else {
        value.setValue(0);
      }
    });
  };

  const renderProgressBars = () => {
    return animatedValues.map((animatedValue, index) => (
      <View key={index} style={progressStyles.progressBarContainer}>
        <View style={progressStyles.progressBarInactive}>
          <Animated.View
            style={[
              progressStyles.progressBarActive,
              {
                width: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          />
        </View>
      </View>
    ));
  };

  return (
    <View style={progressStyles.progressContainer}>
      {renderProgressBars()}
    </View>
  );
};

const TrackOrder = () => {
  const getCartData = useSelector(state => state.cart, shallowEqual);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showDriverView, setShowDriverView] = useState(false);
  const handleProgressComplete = () => {
    setIsCompleted(true);
    // Navigate to Delivered screen after a brief delay
    setTimeout(() => {
      navigate('Delivered');
    }, 1000);
  };

  return (
    <View style={[AppStyle.fillBg]}>
      <Header
        leftIcon={IconCloseLight}
        showRightIcons={false}
        centerTitle={false}
        showCustomContent={true}
        rightCustomContent={
          <View style={[AppStyle.rowHCenter, Layouts.mr15]}>
            <TouchableOpacity style={[styles.shareBtn]}>
              <IconShare />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.helpBtn, Layouts.ml15]}>
              <TextView 
                text={'Help'} 
                fontFamily={FontFamily.medium} 
                fontSize={Scale(14)} 
              />
            </TouchableOpacity>
          </View>
        }
        onLeftPress={goBack}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[Layouts.hPadding16, Layouts.pt10]}>
          <TextView 
            text={'Preparing your order...'} 
            fontFamily={FontFamily.medium} 
            fontSize={Scale(24)} 
          />
          
          <View style={[Layouts.mt20]}>
            {isCompleted ? (
              <TextView 
                text={'Order Delivered!'} 
                fontFamily={FontFamily.medium} 
                fontSize={Scale(16)} 
              />
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextView 
                  text={'Arriving at '} 
                  fontFamily={FontFamily.regular} 
                  fontSize={Scale(16)} 
                />
                <TextView 
                  text={'10:15'} 
                  fontFamily={FontFamily.medium} 
                  fontSize={Scale(16)} 
                />
              </View>
            )}
            <AnimatedProgressBar 
              onComplete={handleProgressComplete}
              onSecondStepComplete={() => setShowDriverView(true)}
            />
          </View>

          <View style={[Layouts.mt15, { flexDirection: 'row', alignItems: 'center' }]}>
            <TextView 
              text={'Latest arrival by '} 
              fontFamily={FontFamily.regular} 
              fontSize={Scale(14)} 
              color={Colors.foundationWhite900}
            />
            <TextView 
              text={'10:40'} 
              fontFamily={FontFamily.medium} 
              fontSize={Scale(14)} 
              color={Colors.foundationWhite900}
            />
            <View style={{
              width: Scale(16),
              height: Scale(16),
              borderRadius: Scale(8),
              backgroundColor: Colors.foundationWhite900,
              marginLeft: Scale(8),
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <TextView 
                text={'i'} 
                fontFamily={FontFamily.medium} 
                fontSize={Scale(10)} 
                color={Colors.white} 
              />
            </View>
          </View>
        </View>

        <View style={styles.orderInProgress}>
          <Image source={Assets.prepare}/>
        </View>

        <View style={styles.deliveryDetails}>
          <View style={[styles.handle, AppStyle.alignSelfCenter, Layouts.mt15]} />

          <View>
            {showDriverView && (
              <View style={[Layouts.mb15]}>
                <View>
                  <Image 
                    source={Assets.driver} 
                    style={[{
                      height: Scale(120),
                      alignSelf: "center",
                      marginVertical: Scale(10)
                    }]} 
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.separator}/>
              </View>
            )}

            <View style={[Layouts.hPadding16, Layouts.vPadding20]}>
              <TextView 
                text={'Delivery details'} 
                fontFamily={FontFamily.medium} 
                fontSize={Scale(18)} 
              />
              
              <View style={[Layouts.mt15, styles.addressView]}>
                <TextView 
                  text={'Address'} 
                  fontFamily={FontFamily.regular} 
                  fontSize={Scale(14)} 
                  color={Colors.foundationWhite900} 
                />
                <TextView 
                  text={'Bay Area, San Francisco, California, USA'} 
                  fontFamily={FontFamily.regular} 
                  fontSize={Scale(16)} 
                  style={[Layouts.mt5]} 
                />
              </View>

              <View style={[Layouts.mt15, styles.addressView]}>
                <TextView 
                  text={'Type'} 
                  fontFamily={FontFamily.regular} 
                  fontSize={Scale(14)} 
                  color={Colors.foundationWhite900} 
                />
                <TextView 
                  text={'Leave at door'} 
                  fontFamily={FontFamily.regular} 
                  fontSize={Scale(16)} 
                  style={[Layouts.mt5]} 
                />
              </View>

              <View style={[Layouts.mt15, styles.addressView]}>
                <TextView 
                  text={'Instructions'} 
                  fontFamily={FontFamily.regular} 
                  fontSize={Scale(14)} 
                  color={Colors.foundationWhite900} 
                />
                <TextView 
                  text={'Please knock to let me know it has arrive and then leave it at the doorstep'} 
                  fontFamily={FontFamily.regular} 
                  fontSize={Scale(16)} 
                  style={[Layouts.mt5]} 
                />
              </View>

              <View style={[Layouts.mt15]}>
                <TextView 
                  text={'Service'} 
                  fontFamily={FontFamily.regular} 
                  fontSize={Scale(14)} 
                  color={Colors.foundationWhite900} 
                />
                <TextView 
                  text={'Standard'} 
                  fontFamily={FontFamily.regular} 
                  fontSize={Scale(16)} 
                  style={[Layouts.mt5]} 
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.separator}/>
        
        <View style={[Layouts.hPadding16]}>
          <View style={[
            Layouts.mt5,
            AppStyle.rowHCenter,
            AppStyle.justifyContentBetween,
            Layouts.vPadding10,
            Layouts.pb15
          ]}>
            <View style={[AppStyle.fill]}>
              <TextView 
                text={'Share this delivery'} 
                fontFamily={FontFamily.medium} 
                fontSize={Scale(16)} 
              />
              <TextView 
                text={'Let someone follow along'} 
                fontFamily={FontFamily.regular} 
                fontSize={Scale(14)} 
                color={Colors.foundationBlack500} 
                style={[Layouts.mt5]} 
              />
            </View>
            
            <TouchableOpacity style={[{
              backgroundColor: Colors.searchInputBackgroundColor,
              borderRadius: Scale(99),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: Scale(40),
              width: Scale(96),
            }]}>
              <IconShare />
              <TextView 
                text={'Share'} 
                fontFamily={FontFamily.medium} 
                fontSize={Scale(14)} 
                style={[Layouts.ml10]} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.separator}/>
        
        <View style={[Layouts.hPadding16]}>
          <View style={[Layouts.mt20]}>
            <View style={[AppStyle.rowHCenter, AppStyle.justifyContentBetween]}>
              <View>
                <TextView 
                  text={'Order summary'} 
                  fontFamily={FontFamily.medium} 
                  fontSize={Scale(18)} 
                />
                <TextView 
                  text={'Subway, Warriors Arena Road'} 
                  fontFamily={FontFamily.regular} 
                  fontSize={Scale(14)} 
                  color={Colors.foundationWhite900} 
                  style={[Layouts.mt2]} 
                />
              </View>
              <TouchableOpacity>
                <TextView 
                  text={'view receipt'} 
                  fontFamily={FontFamily.medium} 
                  fontSize={Scale(14)} 
                  color={Colors.foundationSecondaryTextColor} 
                />
              </TouchableOpacity>
            </View>

            {getCartData?.items?.map((item, index) => (
              <View key={index} style={[Layouts.mt20, AppStyle.rowHCenter]}>
                <View style={AppStyle.row}>
                  <View style={[styles.quantityView]}>
                    <TextView 
                      text={item?.quantity} 
                      fontFamily={FontFamily.medium} 
                      fontSize={Scale(16)} 
                      textAlign={'center'}
                    />
                  </View>
                  <View style={[Layouts.ml15]}>
                    <TextView 
                      text={item?.name} 
                      fontFamily={FontFamily.medium} 
                      fontSize={Scale(16)} 
                    />
                    <TouchableOpacity style={[Layouts.mt5,AppStyle.rowHCenter]}>
                      <TextView 
                        text={'Show more'} 
                        fontFamily={FontFamily.regular} 
                        fontSize={Scale(14)} 
                        color={Colors.foundationBlack500} 
                        style={Layouts.mr5}
                      />
                      <IconChevronDown />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}

            <View style={[Layouts.mt20, { 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center'
            }]}>
              <TextView 
                text={'Total'} 
                fontFamily={FontFamily.medium} 
                fontSize={Scale(16)} 
              />
              <TextView 
                text={`US$${getCartData?.totalPrice}`} 
                fontFamily={FontFamily.semiBold} 
                fontSize={Scale(18)} 
              />
            </View>
          </View>
        </View>

        <View style={[styles.separator, Layouts.mt18]}/>

        <View style={[Layouts.hPadding20]}>
          <View style={[Layouts.mt20]}>
            <TextView 
              text={'Invite friends'} 
              fontFamily={FontFamily.medium} 
              fontSize={Scale(18)} 
            />
            
            <View style={[AppStyle.rowHCenter]}>
              <Image 
                source={Assets.referralIcon} 
                style={{
                  height: Scale(90),
                  width: Scale(60)
                }} 
                resizeMode="contain"
              />
              <TextView 
                text={'Invite a friend, get $5 off'} 
                fontFamily={FontFamily.medium} 
                fontSize={Scale(16)} 
                color={Colors.foundationSecondaryTextColor} 
                style={[Layouts.ml15]} 
              />
            </View>    
          </View>

          <View style={{ height: Scale(50) }} />
        </View>
      </ScrollView>
    </View>
  );
};

const progressStyles = {
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: Scale(12),
  },
  progressBarContainer: {
    flex: 1,
    marginHorizontal: Scale(3),
  },
  progressBarInactive: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarActive: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
};

export default TrackOrder;
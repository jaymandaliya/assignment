import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View, Alert, Platform } from "react-native";
import {
    AppStyle,
    Assets,
    Colors,
    FontFamily,
    IconChevronRightGray,
    IconCloseBold,
    IconDurationClock,
    IconLocationPin,
    Layouts,
    Scale
} from "../../theme";
import { Header, TextView } from "../../components";
import { goBack, navigate } from "../../navigator/utils";
import styles from "./styles";
import { shallowEqual, useSelector } from "react-redux";
import LiveActivityManager from "./LiveActivityManager";


const OrderDetail = () => {
    const getCartData = useSelector(state => state.cart, shallowEqual);
    const [orderStatus, setOrderStatus] = useState('idle'); // idle, preparing, on_the_way, at_address, delivered
    const [liveActivityId, setLiveActivityId] = useState(null);
    const [etaMinutes, setEtaMinutes] = useState(9);

    // Constants for order logic
    const MINIMUM_ORDER_AMOUNT = 10.00;
    const FREE_DELIVERY_THRESHOLD = 39.73;

    // Calculate remaining amounts
    const currentTotal = getCartData?.totalPrice || 0;
    const remainingForMinimum = Math.max(0, MINIMUM_ORDER_AMOUNT - currentTotal);
    const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - currentTotal);

    // Check conditions
    const hasMetMinimumOrder = currentTotal >= MINIMUM_ORDER_AMOUNT;
    const hasMetFreeDelivery = currentTotal >= FREE_DELIVERY_THRESHOLD;

    // Demo order data for Dynamic Island
    const orderData = {
        orderId: "ORD-12345",
        restaurant: "BurgerHouse",
        items: "Cheeseburger Menu x2",
        total: 19.90,
        driver: {
            name: "Kadir",
            avatar: "https://example.com/driver-avatar.jpg" // Replace with actual avatar
        },
        deliveryAddress: "San Francisco Bay Area"
    };

    // Start Live Activity when order is placed
    const startLiveActivity = async () => {
        try {
            const activityId = await LiveActivityManager.startActivity({
                status: 'preparing',
                orderId: orderData.orderId,
                restaurant: orderData.restaurant,
                items: orderData.items,
                total: orderData.total,
                etaMinutes: 9,
                driver: orderData.driver,
                deliveryAddress: orderData.deliveryAddress
            });

            setLiveActivityId(activityId);
            setOrderStatus('preparing');

            // Simulate order progression for demo
            simulateOrderProgress(activityId);

        } catch (error) {
            console.error('Failed to start Live Activity:', error);
            // Alert.alert('Error', 'Failed to start order tracking');
        }
    };

    // Simulate order progression with demo timings
    const simulateOrderProgress = (activityId) => {
        // Preparing phase - 30 seconds
        setTimeout(() => {
            updateOrderStatus(activityId, 'on_the_way', 8);
        }, 30000);

        // On the way phase - 60 seconds
        setTimeout(() => {
            updateOrderStatus(activityId, 'at_address', 2);
        }, 90000);

        // At address phase - 30 seconds
        setTimeout(() => {
            updateOrderStatus(activityId, 'delivered', 0);
        }, 120000);
    };

    // Update Live Activity status
    const updateOrderStatus = async (activityId, status, eta) => {
        try {
            await LiveActivityManager.updateActivity(activityId, {
                status,
                etaMinutes: eta,
                orderId: orderData.orderId,
                restaurant: orderData.restaurant,
                items: orderData.items,
                total: orderData.total,
                driver: orderData.driver,
                deliveryAddress: orderData.deliveryAddress
            });

            setOrderStatus(status);
            setEtaMinutes(eta);

        } catch (error) {
            console.error('Failed to update Live Activity:', error);
        }
    };

    // End Live Activity
    const endLiveActivity = async () => {
        if (liveActivityId) {
            try {
                await LiveActivityManager.endActivity(liveActivityId);
                setLiveActivityId(null);
                setOrderStatus('idle');
            } catch (error) {
                console.error('Failed to end Live Activity:', error);
            }
        }
    };

    // Enhanced checkout function
    const handleCheckout = () => {
        if (hasMetMinimumOrder) {
            if (Platform.OS == 'ios') {

                startLiveActivity();
            }
            navigate("TrackOrder");
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (liveActivityId) {
                endLiveActivity();
            }
        };
    }, [liveActivityId]);

    console.log(JSON.stringify(getCartData));

    return (
        <View style={[AppStyle.fillBg]}>
            <Header
                leftIcon={IconCloseBold}
                showRightIcons={false}
                title={'Your order'}
                centerTitle={false}
                showCustomContent={true}
                rightCustomContent={
                    <TouchableOpacity style={[styles.editBtn, Layouts.mr5]}>
                        <TextView text={'Edit'} fontSize={Scale(16)} />
                    </TouchableOpacity>
                }
                onLeftPress={goBack}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Location Section */}
                <View style={[
                    Layouts.hPadding16,
                    AppStyle.rowHCenter,
                    AppStyle.justifyContentBetween
                ]}>
                    <View style={[AppStyle.rowHCenter, Layouts.mt30]}>
                        <IconLocationPin />
                        <View style={[Layouts.ml15]}>
                            <TextView
                                text={'San Francisco Bay Area'}
                                fontFamily={FontFamily.medium}
                                fontSize={Scale(16)}
                            />
                            <TextView
                                text={'John\'s List'}
                                fontFamily={FontFamily.medium}
                                fontSize={Scale(14)}
                                color={Colors.foundationWhite900}
                            />
                        </View>
                    </View>
                    <TouchableOpacity>
                        <IconChevronRightGray />
                    </TouchableOpacity>
                </View>

                {/* Store Section */}
                <View style={[
                    AppStyle.rowHCenter,
                    styles.storeView,
                    Layouts.mt20,
                    AppStyle.justifyContentBetween,
                    Layouts.mb10
                ]}>
                    <View style={[AppStyle.rowHCenter]}>
                        <Image
                            source={Assets.groceryStore}
                            style={[styles.groceryStore]}
                        />
                        <TextView
                            text={'Safeway'}
                            fontFamily={FontFamily.medium}
                            fontSize={Scale(16)}
                            style={Layouts.ml10}
                        />
                    </View>
                    <TextView
                        text={`$${currentTotal.toFixed(2)}`}
                        fontFamily={FontFamily.medium}
                        fontSize={Scale(16)}
                        style={[Layouts.mr10]}
                    />
                </View>

                {/* Cart Items */}
                {getCartData?.items?.map((item, index) => (
                    <View
                        style={[
                            AppStyle.rowHCenter,
                            Layouts.hPadding20,
                            styles.cartItem,
                            
                        ]}
                        key={index}
                    >
                        <TextView
                            text={`${item?.quantity} pc`}
                            fontFamily={FontFamily.medium}
                            fontSize={Scale(16)}
                        />
                        <Image
                            source={Assets[item?.imageName]}
                            style={[styles.image, Layouts.ml20]}
                        />
                        <View style={[Layouts.ml20,AppStyle.fill]}>
                            <TextView
                                text={item?.name}
                                fontFamily={FontFamily.medium}
                                fontSize={Scale(16)}
                                style={{ lineHeight: Scale(20) }}
                            />
                            <TextView
                                text={`$${item?.unitPrice}/pc`}
                                color={Colors.foundationWhite900}
                                fontSize={Scale(16)}
                                style={[Layouts.mt5]}
                            />
                        </View>
                    </View>
                ))}

                {/* Minimum Order Notice */}
                {!hasMetMinimumOrder && (
                    <View style={[AppStyle.rowHCenter, Layouts.mt15, Layouts.hPadding16]}>
                        <IconDurationClock />
                        <TextView
                            text={'The minimum order amount is $10.00'}
                            fontFamily={FontFamily.medium}
                            fontSize={Scale(16)}
                            style={Layouts.ml20}
                        />
                    </View>
                )}

                {/* Free Delivery Notice */}
                {!hasMetFreeDelivery && (
                    <View style={[styles.addContainer, Layouts.hMargin20]}>
                        <TextView
                            text={`Add $${remainingForFreeDelivery.toFixed(2)} more to your order and get your items delivered for free`}
                            fontFamily={FontFamily.regular}
                            fontSize={Scale(16)}
                            color={Colors.foundationWhite900}
                            style={{ lineHeight: Scale(24) }}
                        />
                    </View>
                )}

                {/* Order Status Display (for demo) */}
                {orderStatus !== 'idle' && (
                    <View style={[styles.statusContainer, Layouts.hMargin20, Layouts.mt20]}>
                        <TextView
                            text={`Order Status: ${orderStatus.replace('_', ' ').toUpperCase()}`}
                            fontFamily={FontFamily.medium}
                            fontSize={Scale(16)}
                            color={Colors.primary}
                        />
                        {etaMinutes > 0 && (
                            <TextView
                                text={`ETA: ${etaMinutes} minutes`}
                                fontFamily={FontFamily.regular}
                                fontSize={Scale(14)}
                                color={Colors.foundationWhite900}
                                style={Layouts.mt5}
                            />
                        )}
                    </View>
                )}
            </ScrollView>

            {/* Checkout Button */}
            <TouchableOpacity
                style={[
                    styles.checkOutBtn,
                    !hasMetMinimumOrder && styles.disabledBtn
                ]}
                onPress={handleCheckout}
                disabled={!hasMetMinimumOrder}
            >
                <TextView
                    text={orderStatus === 'idle' ? 'Go to Checkout' : 'Track Order'}
                    fontFamily={FontFamily.medium}
                    fontSize={Scale(16)}
                    color={Colors.white}
                />
            </TouchableOpacity>

          
        </View>
    );
};

export default OrderDetail;
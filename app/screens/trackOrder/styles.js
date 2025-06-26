import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Colors, Scale } from "../../theme";
const styles = StyleSheet.create({
    shareBtn: {
        height: Scale(33),
        width: Scale(33),
        borderRadius: Scale(33),
        backgroundColor: Colors.searchInputBackgroundColor,
        justifyContent: 'center',
        alignItems: "center"
    }, helpBtn: {

        borderRadius: Scale(100),
        backgroundColor: Colors.searchInputBackgroundColor,
        justifyContent: 'center',
        alignItems: "center",
        width: Scale(63),
        height: Scale(33)
    },
    orderInProgress: {
        backgroundColor: Colors.searchInputBackgroundColor,
        justifyContent: "center",
        alignItems: "center",
        height: Scale(350),
        marginTop: Scale(20)
    },
    handle: {
        height: Scale(5),
        width: Scale(70),
        backgroundColor: Colors.searchInputBackgroundColor,

    },
    deliveryDetails: {
        flex: 1,
        borderTopLeftRadius: Scale(10),
        borderTopRightRadius: Scale(10),
        marginTop: -15,
        backgroundColor: Colors.white
    },
    addressView: { borderBottomWidth: 1, borderBottomColor: Colors.borderColor, paddingBottom: Scale(15) },
    separator: {
        backgroundColor: Colors.borderColor,
        height: Scale(10),

    },
    quantityView: {
        height: Scale(29),
        width: Scale(29),
        backgroundColor: Colors.searchInputBackgroundColor,
        justifyContent: "center",
        alignItems: "center",

    },
    info: {
        width: Scale(16),
        height: Scale(16),
        borderRadius: Scale(8),
        backgroundColor: Colors.foundationWhite900,
        marginLeft: Scale(8),
        justifyContent: 'center',
        alignItems: 'center'
    },
    driverView: {
        height: Scale(120),
        alignSelf: "center",
        marginVertical: Scale(10)
    },
    shareBtnView: {
        backgroundColor: Colors.searchInputBackgroundColor,
        borderRadius: Scale(99),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: Scale(40),
        width: Scale(96),
    }
});
export default styles
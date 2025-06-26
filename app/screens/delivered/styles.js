import React from "react";
import { StyleSheet } from "react-native";
import { Colors, Scale } from "../../theme";
const styles = StyleSheet.create({
    helpBtn: {

        borderRadius: Scale(100),
        backgroundColor: Colors.searchInputBackgroundColor,
        justifyContent: 'center',
        alignItems: "center",
        width: Scale(63),
        height: Scale(33)
    }, leftIcon: { marginLeft: -15 },
    checkOutBtn: {
        backgroundColor: Colors.foundationBlack500,
        height: Scale(52),
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: Scale(16),
        marginBottom: Scale(35)
    },
});
export default styles
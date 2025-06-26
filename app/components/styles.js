import React from "react";
import { StyleSheet } from "react-native";
import { Scale } from "../theme";
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    leftContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    centerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftAlignTitle: {
        alignItems: 'flex-start',
        marginLeft:Scale(5)
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    hiddenContainer: {
        opacity: 0,
        pointerEvents: 'none',
    },
    iconButton: {
        padding: 8,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 40,
        minHeight: 40,
    },
    rightIconSpacing: {
        marginLeft: 8,
    },
    disabledIcon: {
        opacity: 0.5,
    },
});
export default styles
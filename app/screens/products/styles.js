import React from "react";
import { StyleSheet } from "react-native";
import { Colors, Scale } from "../../theme";
const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: Colors.searchInputBackgroundColor,
        height: Scale(44)
    },
    container: {
        paddingHorizontal: Scale(16)
    },
    activeTab: {
        backgroundColor: Colors.foundationBlack500,
        borderRadius: Scale(90),
        paddingVertical: Scale(8),
        paddingHorizontal: Scale(24),
    },
    inActiveTab: { paddingHorizontal: Scale(14), paddingVertical: Scale(8) },
    imageBanner: {
        height: Scale(130),
        width: Scale(310),
        marginRight: Scale(15)

    },
    productCard: {
        width: Scale(143),
        marginRight: Scale(5),
        paddingLeft:Scale(15)
    },
    plusIcon: {
        height: Scale(35),
        width: Scale(35)
    },
    itemImage: { height: Scale(90), width: Scale(101) ,marginTop:-20,zIndex:-10}
});
export default styles
import React from "react";
import { StyleSheet } from "react-native";
import { Colors, Scale } from "../../theme";
const styles = StyleSheet.create({
    nutritionScreen: {
        backgroundColor: Colors.productDetailsContainerBGColor,
        padding: Scale(15)
    },
    border: {
        height: Scale(2),
        backgroundColor: Colors.borderColor
    },
    borderOne: {
        height: Scale(1),
        backgroundColor: Colors.borderColor
    },
    relatedProductItem: {
        backgroundColor: Colors.white,
        height: Scale(88),
        width: Scale(88),
        marginVertical: 10,
        borderRadius: 0,
        // iOS Shadow - optimized
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        // Android Shadow
        elevation: 3,
        marginLeft: Scale(5),
        justifyContent: "center",
        alignItems: "center",
        marginRight: Scale(10),
    },
    quantityView:{
        borderWidth:2,
        borderColor:Colors.borderColor,
        height:Scale(38),
        width:Scale(91),

    },
    buttonSmall:{
        backgroundColor:Colors.foundationBlack500,
        height:Scale(38),
        width:Scale(130),
        justifyContent:"center",
        alignItems:"center"
    }
});
export default styles
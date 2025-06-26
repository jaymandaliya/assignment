import React from "react";
import { StyleSheet } from "react-native";
import { Colors, Scale } from "../../theme";
const styles = StyleSheet.create({
    editBtn: {
        height: Scale(33),
        width: Scale(61),
        backgroundColor: Colors.searchInputBackgroundColor,
        borderRadius: Scale(99),
        justifyContent: "center",
        alignItems: "center"
    },
    storeView: {
        backgroundColor: Colors.searchInputBackgroundColor,
        paddingHorizontal: Scale(16),
        height: Scale(58)
    },
    groceryStore:{
        width:Scale(33),
        height:Scale(35)
    },
    image:{
        height:Scale(35),
        width:Scale(33)
    },cartItem:{
        borderBottomWidth:1,
        borderBottomColor:Colors.borderColor,
        paddingVertical:Scale(10)
    },
    addContainer:{
        padding:Scale(10),
        backgroundColor:Colors.searchInputBackgroundColor,
        marginLeft:Scale(58),
        marginTop:Scale(20)
    },
    checkOutBtn:{
        backgroundColor:Colors.foundationBlack500,
        height:Scale(52),
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal:Scale(16),
        marginBottom:Scale(35)
    },
    disabledBtn:{
        backgroundColor:Colors.foundationBlack500,
        height:Scale(52),
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal:Scale(16),
        marginBottom:Scale(35),
        opacity:0.5
    }
});
export default styles
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable 
} from "react-native";

const Navbar = ({buttonSelected, setButtonSelected}) => {

    function handleChange(event, number){
        if(number === buttonSelected) return;
        setButtonSelected(number);
        
    }

    return(
        <View style={styles.buttonContainer}>
            <Pressable  style={buttonSelected === 1 ? styles.selectedButton : styles.button}  onPress={(e)=> {handleChange(e, 1)}}><Text style={styles.text}>hot</Text></Pressable >
            <Pressable  style={buttonSelected === 2 ? styles.selectedButton : styles.button}  onPress={(e)=> {handleChange(e, 2)}}><Text style={styles.text}>top</Text></Pressable >
            <Pressable  style={buttonSelected === 3 ? styles.selectedButton : styles.button}  onPress={(e)=> {handleChange(e, 3)}}><Text style={styles.text}>new</Text></Pressable >
            <Pressable  style={buttonSelected === 4 ? styles.selectedButton : styles.button}  onPress={(e)=> {handleChange(e, 4)}}><Text style={styles.text}>controversial</Text></Pressable >
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-around',
        marginVertical: 5
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#FF4500',
    },
    selectedButton:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#ff9566',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
})

export default Navbar;
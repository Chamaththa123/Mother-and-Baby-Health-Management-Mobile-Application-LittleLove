import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

import MyImage from '../../assets/logo.png';

const Login = ({ navigation }) => {
    const handleLoginPress = () => {
        navigation.navigate('Login');
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <View style={styles.container} onPress={handleLoginPress}>
            <View style={styles.rowContainer}>
                <Text style={styles.leftText}>Welcome</Text>
                <View style={styles.imageContainer}>
                    <Image source={MyImage} style={styles.image} />
                </View>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.redText}>Little </Text>
                <Text style={styles.blueText}>Love</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20, // Add padding to create space between text and image
    },
    imageContainer: {
        flex: 1, // Expand to fill available space
        alignItems: 'flex-end', // Align the image to the right
    },
    image: {
        width: '57%',
        height: '43%',marginRight:20
    },
    leftText: {
        marginTop:'-11%',
        fontSize: 30,
        fontWeight: '900'
    },
    textContainer: {
        flexDirection: 'row', // Display texts in the same row
        margin:20,
        marginTop:'-42%',
        marginLeft:'15%'
    },
    redText: {
        color: '#57ADF8',
        fontSize: 25,
        fontWeight: '600',

    },
    blueText: {
        color: '#FF25A9',
        fontSize: 25,
        fontWeight: '600',
    },
    buttonStyle: {
        backgroundColor: 'white',
        padding: 13,
        borderRadius: 10,
        width: '90%',
        height: 60,
        margin: 10,
        marginLeft: 20,
        marginBottom: 30,
        borderColor: '#FF1515',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
});

export default Login;

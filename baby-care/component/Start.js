import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

import MyImage from '../assets/logo.png';

const Start = ({ route, navigation }) => {
    const handleLoginPress = () => {
        navigation.navigate('Login');
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <TouchableOpacity style={styles.container} onPress={handleLoginPress}>
            <Image source={MyImage} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.redText}>Little </Text>
                <Text style={styles.blueText}> Love</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: '50%',
        height: '25%',
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '1%'
    },
    redText: {
        color: '#57ADF8',
        fontSize: 25,
        fontWeight: '600',
        textAlign: 'center',
    },
    blueText: {
        color: '#FF25A9',
        fontSize: 25,
        fontWeight: '600',
        textAlign: 'center',
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

export default Start;

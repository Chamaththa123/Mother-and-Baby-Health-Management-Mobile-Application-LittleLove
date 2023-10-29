import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
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
        <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled" // This property helps with keyboard interaction
        >
            <View style={styles.container}>
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
                <Text style={styles.log_in}>Sign In to Your Account</Text>
                <View style={styles.pickerContainer}>
                    <Picker style={styles.picker}>
                        <Picker.Item label="Select Your Account" />
                        <Picker.Item label="Mother" value="Mother" />
                        <Picker.Item label="Midwife" value="Midwife" />
                        <Picker.Item label="Seller" value="Seller" />
                    </Picker>
                </View>
                <Text style={styles.inputDetails}>Enter User Email</Text>
                <TextInput
                    placeholder="Enter User Email"
                    style={styles.textBoxes}
                />
                <Text style={styles.inputDetails}>Enter Password</Text>
                <TextInput
                    placeholder="Enter Password"
                    style={styles.textBoxes}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
        paddingHorizontal: 20,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    image: {
        width: '57%',
        height: '43%',
        marginRight: 20,
    },
    leftText: {
        marginTop: '-11%',
        fontSize: 30,
        fontWeight: '900',
    },
    textContainer: {
        flexDirection: 'row',
        margin: 20,
        marginTop: '-42%',
        marginLeft: '15%',
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
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        margin: 20,
        marginLeft: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    inputDetails: {
        fontSize: 17,
        marginLeft: '5%',
        marginTop: '3%',
        marginBottom: '-3%',
    },
    textBoxes: {
        width: '90%',
        fontSize: 16,
        padding: 12,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        margin: 20,
        marginLeft: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    buttonStyle: {
        backgroundColor: '#57ADF8',
        padding: 13,
        borderRadius: 10,
        width: '90%',
        height: 50,
        margin: 10,
        marginLeft: 20,
        marginBottom: 20,
        borderColor: 'gray',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
    },
    log_in: {
        marginTop: '20%',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});

export default Login;

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, query, orderByChild, equalTo, get, onValue } from 'firebase/database';
import { db } from '../../../../firebase/config';
import { LineChart } from 'react-native-chart-kit';
import BPGraph from './BPGraph';

const MotherGraphs = ({ data }) => {
    const navigation = useNavigation();
    const [clinicData, setClinicData] = useState([]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center', // Center content horizontally
            paddingTop: 10, // Add some top padding
        },
        chartHeader: {
            fontSize: 17,
            fontWeight: 'bold',
            margin: 30, // Reduce the margin
        },
        dot: {
            width: 10,
            height: 10,
            borderRadius: 5,
            margin: 5,
        },
        greenDot: {
            backgroundColor: 'green',
        },
        blueDot: {
            backgroundColor: 'blue',
        },
    });

    useEffect(() => {
        const clinicRef = ref(db, 'Clinic');
        const userClinicQuery = query(clinicRef, orderByChild('motherId'), equalTo(data.id));

        const unsubscribe = onValue(userClinicQuery, (snapshot) => {
            if (snapshot.exists()) {
                const clinicData = snapshot.val();
                const clinicArray = Object.values(clinicData);
                clinicArray.sort((a, b) => a.timestamp - b.timestamp); // Sort by timestamp
                setClinicData(clinicArray);
            } else {
                setClinicData([]);
            }
        });
        return () => unsubscribe();
    }, [data.id]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.chartHeader}>Maternal Weight Chart</Text>
                {clinicData.length > 0 && (
                    <LineChart
                        data={{
                            labels: clinicData.map((item) => item.week),
                            datasets: [
                                {
                                    data: clinicData.map((item) => item.weight),
                                    // color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Set the color to red
                                    strokeWidth: 2,
                                },
                            ],
                        }}
                        width={Dimensions.get('window').width - 20}
                        height={220}
                        yAxisSuffix="kg"
                        chartConfig={{
                            backgroundGradientFrom: 'white',
                            backgroundGradientTo: 'white',
                            color: (opacity = 1) => `rgba(0, 0, 255 , ${opacity})`,
                        }}
                    />
                )}

                <Text>Week</Text>
                <Text style={{ margin: 10 }}>
                    <View style={[styles.dot, styles.blueDot]} /> Maternal Weight
                </Text>
                <Text style={styles.chartHeader}>Fundal Height Chart</Text>
                {clinicData.length > 0 && (
                    <LineChart
                    data={{
                        labels: clinicData.map((item) => item.week),
                        datasets: [
                            {
                                data: clinicData.map((item) => item.F_height),
                                // color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // Set the color to green
                                strokeWidth: 2,
                            },
                        ],
                    }}
                    width={Dimensions.get('window').width - 20}
                    height={220}
                    yAxisSuffix="cm"
                    chartConfig={{
                        backgroundGradientFrom: 'white',
                        backgroundGradientTo: 'white',
                        color: (opacity = 1) => `rgba(11, 102, 35 , ${opacity})`,
                    }}
                    
                />
                
                )}
                <Text>Week</Text>
                <Text style={{ margin: 10 }}>
                    <View style={[styles.dot, styles.greenDot]} /> Fundal Height
                </Text>
                {clinicData.length === 0 && (
                    <Text>No clinic data available for this user.</Text>
                )}

                <BPGraph data={data} />
            </View>
        </ScrollView>
    );
};

export default MotherGraphs;

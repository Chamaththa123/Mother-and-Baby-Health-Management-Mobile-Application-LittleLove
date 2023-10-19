import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, query, orderByChild, equalTo, get, onValue } from 'firebase/database';
import { db } from '../../../../firebase/config';
import { LineChart } from 'react-native-chart-kit';

const MotherGraphs = ({ data }) => {
    const navigation = useNavigation();
    const [clinicData, setClinicData] = useState([]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            paddingTop: 0,
        },
        chartHeader: {
            fontSize: 17,
            fontWeight: 'bold',
            margin: 30,
        },
        chartContainer: {
            marginLeft: 0,
        },
        dot: {
            width: 10,
            height: 10,
            borderRadius: 5,
            margin: 5,
        },
        redDot: {
            backgroundColor: 'red',
        },
    });

    useEffect(() => {
        const clinicRef = ref(db, 'Clinic');
        const userClinicQuery = query(clinicRef, orderByChild('motherId'), equalTo(data.id));

        const unsubscribe = onValue(userClinicQuery, (snapshot) => {
            if (snapshot.exists()) {
                const clinicData = snapshot.val();
                const clinicArray = Object.values(clinicData);
                clinicArray.sort((a, b) => a.week - b.week);
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
                <Text style={styles.chartHeader}>Blood Pressure Chart</Text>
                {clinicData.length > 0 ? (
                    <View style={styles.chartContainer}>
                        <LineChart
                            data={{
                                labels: clinicData.map((item) => item.week.toString()),
                                datasets: [
                                    {
                                        data: clinicData.map((item) => item.bp),
                                        strokeWidth: 2,
                                    },
                                ],
                            }}
                            width={Dimensions.get('window').width} // Set chart width to screen width
                            height={220}
                            yAxisSuffix=""
                            chartConfig={{
                                backgroundGradientFrom: 'white',
                                backgroundGradientTo: 'white',
                                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                                labelColor: (opacity = 0.6) => `rgba(0, 0, 0, ${opacity})`,
                            }}
                            
                        />
                    </View>
                ) : null }

                <Text>Week</Text>
                <Text style={{ margin: 10 }}>
                    <View style={[styles.dot, styles.redDot]} /> Blood Pressure (mmHg)
                </Text>

                {clinicData.length === 0 && (
                    <Text>No clinic data available for this user.</Text>
                )}
            </View>
        </ScrollView>
    );
};

export default MotherGraphs;

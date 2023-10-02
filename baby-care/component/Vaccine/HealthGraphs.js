import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; 
import { useNavigation } from '@react-navigation/native';
import { ref, query, orderByChild, equalTo, onValue } from 'firebase/database';
import { db } from '../../firebase/config';

const HealthGraphs = ({ data }) => {

    const [clinicData, setClinicData] = useState([]);

    useEffect(() => {
        const clinicRef = ref(db, 'Clinic');
        const userClinicQuery = query(
            clinicRef,
            orderByChild('motherId'),
            equalTo(data.id)
        );

        const unsubscribe = onValue(userClinicQuery, (snapshot) => {
            if (snapshot.exists()) {
                const clinicData = snapshot.val();
                const clinicArray = Object.values(clinicData);
                clinicArray.reverse();
                setClinicData(clinicArray);
            } else {
                setClinicData([]);
            }
        });
        return () => unsubscribe();
    }, [data.id]);

    const generateChartData = () => {
        const labels = clinicData.map((clinicDetail) => clinicDetail.age); 
        const heightData = clinicData.map((clinicDetail) => clinicDetail.height);
        const weightData = clinicData.map((clinicDetail) => clinicDetail.weight);

        return {
            labels,
            datasets: [
                {
                    data: weightData,
                    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                    strokeWidth: 2,
                    label: 'Weight',
                },
                {
                    data: heightData,
                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                    strokeWidth: 2,
                    label: 'Height',
                },
            ],
        };
    };

    const chartData = generateChartData();

    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 0.6) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 116,
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            // stroke: '#000',
        },
        xAxisLabel: 'Weight', 
        yAxisLabel: 'Height', 
    };


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginLeft: 10,
            marginRight: 10,
        },
        chartContainer: {
            marginTop: 20,
            alignItems: 'center',
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
        },
    });

    return (
        <ScrollView>
            <View style={styles.container}>
                {clinicData.length > 0 && (
                    <View style={styles.chartContainer}>
                        <Text style={styles.title}>Weight and Height Chart</Text>
                        <LineChart
                            data={chartData}
                            width={300}
                            height={200}
                            chartConfig={chartConfig}
                            bezier
                            style={styles.chart}
                        />
                    </View>
                )}

                {clinicData.length === 0 && (
                    <Text>No clinic data available for this user.</Text>
                )}
            </View>
        </ScrollView>
    );
};

export default HealthGraphs;

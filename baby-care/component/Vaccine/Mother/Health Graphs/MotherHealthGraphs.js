import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; 
import { useNavigation } from '@react-navigation/native';
import { ref, query, orderByChild, equalTo, onValue } from 'firebase/database';
import { db } from '../../../../firebase/config';
import BMIGraphs from './MotherBMIGraphs';
import BPGraphs from './MotherBPGraphs';

const HealthGraphs = ({ data }) => {

    const [clinicData, setClinicData] = useState([]);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

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
            borderRadius: 16,
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
        },
        xAxisLabel: 'Week',
        yAxisLabel: 'Height',
    };

    // Calculate chart height as a percentage of the screen height
    const chartHeight = screenHeight * 0.4; // You can adjust this percentage as needed

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
        legendContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
        },
        legendDot: {
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 5,
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
                            width={screenWidth - 20}
                            height={chartHeight}
                            chartConfig={chartConfig}
                            bezier
                            style={styles.chart}
                        />
                        <Text style={{marginTop:-20}}>Week</Text>
                    </View>
                )}

                {clinicData.length === 0 && (
                    <Text>No clinic data available for this user.</Text>
                )}

                {/* Legends for Height and Weight */}
                <View style={styles.legendContainer}>
                    <View style={[styles.legendDot, { backgroundColor: 'red' }]} />
                    <Text>Height</Text>
                    <View style={[styles.legendDot, { backgroundColor: 'blue' }]} />
                    <Text>Weight</Text>
                </View>

                <BMIGraphs data={data}/>
                <BPGraphs data={data}/>
            </View>
        </ScrollView>
    );
};

export default HealthGraphs;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './component/Home';
import AllVaccine from './component/Vaccine/All';
import Add from './component/Add';
import MotherList from './component/Vaccine/MotherList';
import MotherDetails from './component/Vaccine/MotherDetails';
import AddBaby from './component/Vaccine/AddBaby';
import BabyDetails from './component/Vaccine/BabyDetails';
import AddVaccine from './component/Vaccine/AddVaccine';
import AddClinic from './component/Vaccine/AddClinic';
import BabyAllDetails from './component/Vaccine/Baby/BabyAllDetails';
import AddBabyVaccine from './component/Vaccine/Baby/AddBabyVaccine';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='AllVaccine' component={AllVaccine} />
        <Stack.Screen name='Add' component={Add} />
        <Stack.Screen name='MotherList' component={MotherList} />
        <Stack.Screen name='MotherDetails' component={MotherDetails} />
        <Stack.Screen name='AddBaby' component={AddBaby} />
        <Stack.Screen name='BabyDetails' component={BabyDetails} />
        <Stack.Screen name='AddVaccine' component={AddVaccine} />
        <Stack.Screen name='AddClinic' component={AddClinic} />
        <Stack.Screen name='BabyAllDetails' component={BabyAllDetails} />
        <Stack.Screen name='AddBabyVaccine' component={AddBabyVaccine} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};


export default App;
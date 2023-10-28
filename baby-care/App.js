import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './component/Home';
import AllVaccine from './component/Vaccine/Mother/MotherAllDetails';
import AddMother from './component/AddMother';
import MotherList from './component/Vaccine/Mother/MotherList';
import MotherDetails from './component/Vaccine/Mother/MotherDetails';
import AddBaby from './component/Vaccine/Mother/AddBaby';
import BabyDetails from './component/Vaccine/Baby/BabyDetails';
import AddVaccine from './component/Vaccine/Mother/AddMotherVaccine';
import AddClinic from './component/Vaccine/Mother/AddMotherClinic';
import BabyAllDetails from './component/Vaccine/Baby/BabyAllDetails';
import AddBabyVaccine from './component/Vaccine/Baby/AddBabyVaccine';
import AddBabyClinic from './component/Vaccine/Baby/AddBabyClinic';
import Start from './component/Start';
import Login from './component/user/Login';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='AllVaccine' component={AllVaccine} />
        <Stack.Screen name='AddMother' component={AddMother} />
        <Stack.Screen name='MotherList' component={MotherList} />
        <Stack.Screen name='MotherDetails' component={MotherDetails} />
        <Stack.Screen name='AddBaby' component={AddBaby} />
        <Stack.Screen name='BabyDetails' component={BabyDetails} />
        <Stack.Screen name='AddVaccine' component={AddVaccine} />
        <Stack.Screen name='AddClinic' component={AddClinic} />
        <Stack.Screen name='BabyAllDetails' component={BabyAllDetails} />
        <Stack.Screen name='AddBabyVaccine' component={AddBabyVaccine} />
        <Stack.Screen name='AddBabyClinic' component={AddBabyClinic} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};


export default App;
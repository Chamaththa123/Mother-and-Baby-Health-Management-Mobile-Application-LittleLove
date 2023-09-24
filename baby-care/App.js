import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './component/Home';
import AllVaccine from './component/Vaccine/All';
import Add from './component/Add';
import MotherList from './component/Vaccine/MotherList';
import MotherDetails from './component/Vaccine/MotherDetails';

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

      </Stack.Navigator>
    </NavigationContainer>
  )
};


export default App;
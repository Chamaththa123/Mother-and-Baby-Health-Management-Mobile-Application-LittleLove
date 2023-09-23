import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './component/Home';
import AllVaccine from './component/Vaccine/All';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
<Stack.Screen name='Home' component={Home} />
<Stack.Screen name='AllVaccine' component={AllVaccine} />

      </Stack.Navigator>
    </NavigationContainer>
  )
};


export default App;
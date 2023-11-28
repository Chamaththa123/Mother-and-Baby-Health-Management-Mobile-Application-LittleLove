import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './pages/Start';
import Login from './pages/user/Login';
import Homepage2 from './pages/Homepage2';
import Addmother from './pages/Mother/Addmother';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Hmepage2' component={Homepage2} />
        <Stack.Screen name='AddMother' component={Addmother} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};


export default App;
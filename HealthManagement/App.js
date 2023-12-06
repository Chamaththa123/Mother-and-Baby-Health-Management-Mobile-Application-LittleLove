import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { firebase } from "./firebase/config";
import Start from "./component/Start";
import Login from "./component/user/Login";
import Homepage2 from "./component/Homepage2";
import Addmother from "./component/Mother/Addmother";
import Homepage1 from "./component/Homepage1";
import MotherProfile from "./component/Mother/MotherProfile";
import MidWifeProfile from "./component/Midwife/MidWifeProfile";
import MotherList from "./component/Mother/MotherList";
import Qr from "./component/Mother/Qr";
import QrScanner from "./component/Midwife/QrScanner";
import MotherDetails from "./component/Mother/MotherDetails";
import AddPregnancy from "./component/Mother/AddPregnancy";
import Loading from "./component/Loading";
import PregnancyDetails from "./component/Mother/Pregnancy/PregnancyDetails";
import AddBaby from "./component/Mother/Baby/AddBaby";
import DeliveryInformation from "./component/Mother/Pregnancy/DeliveryInformation";
import AdditionalNote from "./component/Mother/Pregnancy/AdditionalNote";
import Clinic from "./component/Mother/Pregnancy/Clinic/Clinic";
import AddVaccine from "./component/Mother/Pregnancy/Clinic/AddVaccine";
import AddClinic from "./component/Mother/Pregnancy/Clinic/AddClinic";
const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Homepage2" component={Homepage2} />
        {/* <Stack.Screen name="Addmother" component={Addmother} /> */}
        {/* <Stack.Screen name="Home" component={HomePage} /> */}
        {/* <Stack.Screen name="Profile" component={Profile} /> */}
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="Homepage2" component={Homepage2} />
      <Stack.Screen name="Homepage1" component={Homepage1} />
      <Stack.Screen name="MotherProfile" component={MotherProfile} />
      <Stack.Screen name="MidWifeProfile" component={MidWifeProfile} />
      <Stack.Screen name="Addmother" component={Addmother} />
      <Stack.Screen name="MotherList" component={MotherList} />
      <Stack.Screen name="QR" component={Qr} />
      <Stack.Screen name="QrScanner" component={QrScanner} />
      <Stack.Screen name="MotherDetails" component={MotherDetails} />
      <Stack.Screen name="AddPregnancy" component={AddPregnancy} />
      <Stack.Screen name="PregnancyDetails" component={PregnancyDetails} />
      <Stack.Screen name="AddBaby" component={AddBaby} />
      <Stack.Screen name="DeliveryInformation" component={DeliveryInformation} />
      <Stack.Screen name="AdditionalNote" component={AdditionalNote} />
      <Stack.Screen name="Clinic" component={Clinic} />
      <Stack.Screen name="AddVaccine" component={AddVaccine} />
      <Stack.Screen name="AddClinic" component={AddClinic} />

    </Stack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

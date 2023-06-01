import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import University from "../screens/University";
import Birthday from "../screens/Birthday";
import AddName from "../screens/AddName";
import AddPhoto from "../screens/AddPhoto";
import AddBio from "../screens/AddBio";
import MyTabs from "./BottomTabs";
import AudioChat from "../screens/AudioChat";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";
import OTPScreen from "../screens/OTPScreen";
import SignUp from "../screens/SignUp";
import CreateRoom from "../screens/CreateRoom";
import { getLogin } from "../store/LocalStor";

const Stack = createNativeStackNavigator();

const MyStack = () => {
    const [auth, setAuth] = React.useState(false);

React.useEffect(() =>{
      routes()
},[])

const routes = async() =>{
    let isLogin  = await getLogin()
    console.warn(isLogin);
     if (isLogin) {
        setAuth(true)
     } 
}
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ auth ? MyTabs : Login} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="AddName" component={AddName} />
        <Stack.Screen name="Birthday" component={Birthday} />
        <Stack.Screen name="University" component={University} />
        <Stack.Screen name="AddPhoto" component={AddPhoto} />
        <Stack.Screen name="AddBio" component={AddBio} />
        <Stack.Screen name="MyTabs" component={MyTabs} />
        <Stack.Screen name="AudioChat" component={AudioChat} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="CreateRoom" component={CreateRoom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack;

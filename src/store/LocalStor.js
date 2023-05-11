import AsyncStorage from '@react-native-async-storage/async-storage';

var setRegToken = async function (isToken) {
  await AsyncStorage.setItem('token', isToken);
};

var getRegToken = async function () {
  return await AsyncStorage.getItem('token');
};

var setLogin= async function (checkLogin) {
  await AsyncStorage.setItem('checkLogin', checkLogin);
};
var getLogin = async function () {
  return await AsyncStorage.getItem('checkLogin');
};



export {setRegToken, getRegToken,setUserNames ,getUserNames,setLogin,getLogin};
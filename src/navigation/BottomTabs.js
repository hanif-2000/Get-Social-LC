import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native'
import Search from '../screens/Search';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { backgroundColor: '#C284FD', width: '50%', alignSelf: 'center', borderRadius: 20 } }}>
                <Tab.Screen name="Home" component={Home}
                    options={{
                        tabBarIcon: ({ focused, color }) => {
                            return (
                                <Ionicons name={focused ? 'home' : 'home-outline'} size={20} color={'#fff'} />
                            );
                        },
                    }}
                />
                <Tab.Screen name="Profile" component={Profile}
                    options={{
                        tabBarIcon: ({ focused, color }) => {
                            return (
                                <FontAwesome name={focused ? 'user' : 'user-o'} size={20} color={'#fff'} />
                            )
                        }
                    }}
                />
                {/* <Tab.Screen name="Search" component={Search}
                    options={{
                        tabBarIcon: ({ focused, color }) => {
                            return (
                                <Ionicons name={focused ? 'search' : 'search-outline'} size={20} color={'#fff'} />
                            );
                        },
                    }} /> */}
            </Tab.Navigator>
        </View>
    );
}

export default MyTabs
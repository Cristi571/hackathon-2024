import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './Home/Home';
import { Discover } from './Discover/Discover';
import { Login } from './Authentication/Login';

const Tab = createBottomTabNavigator();

function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: 'Home' }} />
                    <Tab.Screen name="Discover" component={Discover} options={{ tabBarLabel: 'Discover' }} />
                    <Tab.Screen name="Login" component={Login} options={{ tabBarLabel: 'Login' }} />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default App;
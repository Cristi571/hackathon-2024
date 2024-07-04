import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer, useTheme } from "@react-navigation/native"
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons'

import { Home } from "../Home/Home"
import { Discover } from "../Discover/Discover"
import { Login } from "../Authentication/Login"


const Tab = createBottomTabNavigator();

const AuthenticationTabs = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
            <Tab.Screen 
                name="Login" 
                component={Login}
                options={{ title: "Connexion" }}
            />
        </Tab.Navigator>
    )
}


export const Navigation = () => {
    const theme = useTheme()
    theme.colors.secondaryContainer = "transparent"

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                activeColor='white'
                inactiveColor='gray'
                barStyle={{
                    backgroundColor: 'black',
                    height: 70,
                }}
            >

                <Tab.Screen 
                    name="Home" 
                    component={Home}
                    options={{
                        title: "",
                        tabBarLabel: 'Accueil',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome6 name="house" color={color} size={18} />
                        ),
                        tabBarActiveTintColor: "#0D47A1",
                        tabBarInactiveTintColor: "gray"
                    }}
                />

                <Tab.Screen 
                    name="Discover" 
                    component={Discover}
                    options={{
                        title: "",
                        tabBarLabel: 'Découvrir',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome name="compass" color={color} size={26} />
                        ),
                        tabBarActiveTintColor: "#0D47A1",
                        tabBarInactiveTintColor: "gray"
                    }}
                />

                <Tab.Screen 
                    name="Authentication" 
                    component={AuthenticationTabs}
                    options={{
                        title: '',
                        tabBarLabel: 'Se connecter',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome name="user-circle" color={color} size={18} />
                        ),
                        tabBarActiveTintColor: "#0D47A1",
                        tabBarInactiveTintColor: "gray",
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

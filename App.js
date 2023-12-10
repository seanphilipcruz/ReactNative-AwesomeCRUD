import * as React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./screens/Home";
import CreateUser from "./screens/Users/Create";
import { Provider } from "react-redux";
import store from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import EditUser from "./screens/Users/Edit";
import { PaperProvider } from "react-native-paper";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackNavigation() {
    const BotNavigationOptions = {
        headerShown: false
    }

    const CreateUserOptions = {
        title: "Add New User",
        headerTitle: "Add New User",
        headerBackTitle: "Home"
    }

    const EditUserOptions = {
        headerBackTitle: "Home"
    }

    return (
        <Stack.Navigator>
            <Stack.Screen name="BottomNavigation" component={BotNavigation} options={BotNavigationOptions} />
            <Stack.Screen name="CreateUser" component={CreateUser} options={CreateUserOptions} />
            <Stack.Screen name="EditUser" component={EditUser} options={EditUserOptions} />
        </Stack.Navigator>
    )
}

function BotNavigation() {
    const homeOptions = {
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => {
            return (
                <MaterialCommunityIcons name="home" color={color} size={size} />
            )
        }
    }

    const CreateUserOptions = {
        tabBarLabel: 'Create User',
    }

    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={Home} options={homeOptions} />
        </Tab.Navigator>
    )
}

const App = () => {
    return (
        <PaperProvider settings={{ rippleEffectEnabled: true }}>
            <Provider store={store}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <StackNavigation />
                    </NavigationContainer>
                </SafeAreaProvider>
            </Provider>
        </PaperProvider>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        paddingTop: 50,
        textAlign: 'center'
    },
    view: {
        flex: 1,
    }
});

export default App;

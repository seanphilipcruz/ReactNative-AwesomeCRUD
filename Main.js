import { AppRegistry, Button, StyleSheet, View } from "react-native";
import {PaperProvider, Text} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as StoreProvider } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

const image = require('./assets/default.png');

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text variant="displayMedium">Home Screen</Text>
        </View>
    );
}

const App = () => {
    return (
        <PaperProvider>
            <Home />
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
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
});

AppRegistry.registerComponent("TestApp", () => App);

import { useDispatch, useSelector } from "react-redux";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import {ActivityIndicator, Avatar, Button, Card, IconButton, Text, TouchableRipple} from "react-native-paper";
import React, { useEffect } from "react";
import {deleteUser, fetchUsers, fetchUser} from "../store/users/reducers";
import {fetchDesignations} from "../store/designations/reducers";

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchDesignations());
    },[dispatch, navigation]);

    const handleRefresh = () => {
        try {
            dispatch(fetchUsers());
        } catch (error) {
            Alert.alert("Error occurred", "There was an error loading the users: " + error);
        }
    }

    const handleAdd = () => {
        navigation.navigate("CreateUser");
    }

    const handleEdit = (id) => {
        dispatch(fetchUser(id));

        navigation.navigate("EditUser", { id: id });
    }

    const handleDelete = (id) => {
        try {
            Alert.alert("Are you sure to delete the user's data?", "This action is irreversible", [
                {
                    text: 'Yes',
                    onPress: () => {
                        dispatch(deleteUser(id));
                    }
                },
                {
                    text: 'No',
                    onPress: () => {},
                    style: 'cancel'
                }
            ]);
        } catch (error) {
            Alert.alert("Error occurred", "There was an error deleting the user data: " + error);
        }
    }

    const cardLeftContent = () => {
        return (
            <Avatar.Icon icon="account" />
        )
    }

    if (loading) {
        return (
            <ActivityIndicator animating={true} style={styles.activityIndicator} size="large" />
        )
    } else {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.flexRight}>
                    <IconButton icon="plus" mode="contained" onPress={handleAdd} />
                    <IconButton icon="refresh" mode="contained" onPress={handleRefresh} />
                </View>

                {
                    users.map((item, index) => (
                        <Card key={index} style={styles.card}>
                            <Card.Title title={item.name} subtitle={item.designation.name} right={cardLeftContent} style={styles.cardTitle} />
                            <Card.Actions>
                                <Button icon="account-edit" style={styles.buttons} mode="contained" onPress={() => handleEdit(item.id)}>Edit</Button>
                                <Button icon="delete" style={styles.buttons} mode="contained" onPress={() => handleDelete(item.id)}>Delete</Button>
                            </Card.Actions>
                        </Card>
                    ))
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    activityIndicator: {
        margin: 15,
        padding: 15
    },

    card: {
        padding: 5,
        margin: 15
    },

    cardTitle: {
        margin: 15,
        padding: 10
    },

    cardContent: {
        padding: 20
    },

    row: {
        display: "flex"
    },

    text: {
        marginTop: 20,
        padding: 15,
        textAlign: "center",
    },

    flexRight: {
        flexDirection: 'row-reverse',
        paddingVertical: 20,
    },

    iconButtons: {
        width: 55
    },

    buttons: {
        marginVertical: 10,
        marginEnd: 10
    },

    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 8
    },

    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    floatingButton:{
        backgroundColor: '#6B9EFA',
        borderColor: '#6B9EFA',
        height: 55,
        width: 55,
        borderRadius: 55 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 60,
        right: 15,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
});

export default HomeScreen;

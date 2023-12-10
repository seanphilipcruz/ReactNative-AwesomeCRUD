import { useDispatch, useSelector } from "react-redux";
import { ScrollView, StyleSheet, View } from "react-native";
import {Button, Card, Text} from "react-native-paper";
import React, { useEffect } from "react";
import { fetchUsers } from "../store/users/reducers";
import {fetchDesignations} from "../store/designations/reducers";

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchDesignations());
    },[dispatch]);

    const handleDelete = async (id) => {
        try {
            // await deleteUserService(id);

            // dispatch(deleteUser(id));
        } catch (error) {
            console.error("Error deleting data: ", error);
        }
    }

    const handleAdd = () => {
        navigation.navigate("CreateUser");
    }

    const handleEdit = (id) => {
        navigation.navigate("EditUser", { id: id });
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.flexRight}>
                <Button icon="plus" style={styles.buttons} mode="contained" onPress={handleAdd}>Add new user</Button>
            </View>
            {
                loading ? (
                    <Text style={styles.text}>Loading Users ...</Text>
                ) : error ? (
                    <Text style={styles.text}>Error Occurred: {error}</Text>
                ) :  (
                    <View>
                        {
                            users.map((item, index) => (
                                <Card key={index} style={styles.card}>
                                    <Card.Title title={item.name} />
                                    <Card.Actions>
                                        <Button icon="account-edit" style={styles.buttons} mode="contained" onPress={() => handleEdit(item.id)}>Edit</Button>
                                        <Button icon="delete" style={styles.buttons} mode="contained" onPress={() => handleDelete(item.id)}>Delete</Button>
                                    </Card.Actions>
                                </Card>
                            ))
                        }
                    </View>
                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 25
    },

    row: {
        display: "flex"
    },

    column: {
        flex: 1
    },

    text: {
        marginTop: 20,
        textAlign: "center",
    },

    flexRight: {
        alignSelf: "flex-end",
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

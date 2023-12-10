import { ScrollView, StyleSheet, Dimensions, Alert, View } from "react-native";
import {Button, HelperText, TextInput, TouchableRipple} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchUsers, updateUser } from "../../store/users/reducers";
import DropDown from "react-native-paper-dropdown";
import { validateUserForm } from "../../store/constants";

const device = Dimensions.get("screen");

const EditUser = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { id } = route.params;

    const { user, loading, error, status, message } = useSelector((state) => state.users);
    const { designations } = useSelector((state) => state.designations);
    const [ designationList, setDesignationList] = useState([]);
    const [ designation, setDesignation ] = useState('');
    const [ isDropdownActive, setDropdown ] = useState(false);
    const [ isFormValid, setFormValidity ] = useState(false);
    const [ errors, setErrors ] = useState({});
    const [ form, setForm ] = useState({
        id: '',
        name: '',
        mobile_number: '',
        email: '',
        designation_id: ''
    });

    useEffect(() => {
        syncFormWithUserData();

        setNavigationOptions();
    }, [id, user]);

    useEffect(() => {
        setDesignationList(list());

        setFormDesignation();

        validateUserForm(form, setErrors, setFormValidity);
    }, [form.name, form.email, form.mobile_number, form.designation_id, designation]);

    const setNavigationOptions = () => {
        navigation.setOptions({
            title: loading ? 'Loading User ...' : error !== null ? 'Error Occurred' : `Edit User`,
            headerTitle: loading ? 'Loading User ...' : error !== null ? 'Error Occurred' : `Edit User`
        });
    }

    const syncFormWithUserData = () => {
        // Set form data values
        const userData = user;

        setDesignation(userData.designation_id);

        setForm(form => ({
            ...form,
            id: id,
            name: userData.name,
            mobile_number: userData.mobile_number,
            email: userData.email
        }));
    }

    const setFormDesignation = () => {
        setForm({
            ...form,
            designation_id: designation
        });
    }

    const handleSubmit = () => {
        if (isFormValid) {
            Alert.alert("Are you sure to update user?", "Select yes to proceed otherwise no.", [
                {
                    text: 'No',
                    onPress: () => {},
                    style: "cancel"
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        dispatch(updateUser(form));
                    }
                }
            ]);
            
            setTimeout(() => {
                updateUserDetails();
            }, 1500);
        } else {
            Alert.alert("Error on submitting the form", "The errors must be solved prior to saving the changes");
        }
    }

    const updateUserDetails = () => {
        try {
            console.info("Status / Message: ", [status, message]);

            dispatch(fetchUsers());

            if (status !== "success") {
                Alert.alert('Error Occurred', 'An error has occurred while updating the user.');
            } else {
                Alert.alert('The user has been updated!', message);
            }

            navigation.navigate("Home");
        } catch (error) {
            navigation.navigate("Home");

            Alert.alert("Error Occurred", error.message);
        }
    }

    // List the designations and format to label/value pairs for the dropdown
    const list = () => {
        let dataset = [];

        designations.map((item) => {
            dataset.push({
                label: item.name,
                value: item.id
            });
        });

        return dataset;
    }

    return (
        <ScrollView style={styles.form}>
            <View style={styles.textInput}>
                <TextInput
                    mode="outlined"
                    disabled={loading}
                    label="Full Name"
                    placeholder="Ex. Juan Dela A. Cruz Jr."
                    name="name"
                    value={form.name}
                    onChangeText={e => {
                        setForm({
                            ...form,
                            name: e
                        })
                    }} />
                <HelperText type="error" visible={errors.hasOwnProperty('name')}>
                    { errors.name }
                </HelperText>
            </View>

            <View style={styles.textInput}>
                <TextInput
                    mode="outlined"
                    disabled={loading}
                    label="Mobile Number"
                    placeholder="09154283142"
                    name="mobile_number"
                    value={form.mobile_number}
                    onChangeText={e => {
                        setForm({
                            ...form,
                            mobile_number: e
                        })
                    }} />
                <HelperText type="error" visible={errors.hasOwnProperty('mobile_number')}>
                    { errors.mobile_number }
                </HelperText>
            </View>

            <View style={styles.textInput}>
                <TextInput
                    mode="outlined"
                    disabled={loading}
                    label="Email"
                    placeholder="juandelacruzjr@gmail.com"
                    name="email"
                    value={form.email}
                    onChangeText={e => {
                        setForm({
                            ...form,
                            email: e
                        })
                    }} />
                <HelperText type="error" visible={errors.hasOwnProperty('email')}>
                    { errors.email }
                </HelperText>
            </View>

            <View style={styles.textInput}>
                <DropDown
                    label="Designation"
                    mode="outlined"
                    visible={isDropdownActive}
                    onDismiss={() => setDropdown(false)}
                    showDropDown={() => setDropdown(true)}
                    value={designation}
                    setValue={setDesignation}
                    list={designationList} />
                <HelperText type="error" visible={errors.hasOwnProperty('designation')}>
                    { errors.designation }
                </HelperText>
            </View>

            <TouchableRipple>
                <Button
                    mode="outlined"
                    style={styles.submitButton}
                    disabled={!isFormValid}
                    onPress={handleSubmit}
                    icon="check-circle">
                    Update
                </Button>
            </TouchableRipple>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        marginHorizontal: 18,
        paddingVertical: 20
    },

    textInput: {
        marginVertical: 8
    },

    submitButton: {
        width: device.width / 3.9,
        alignSelf: "center",
        marginVertical: 27,
        borderRadius: 5
    }
});

export default EditUser;

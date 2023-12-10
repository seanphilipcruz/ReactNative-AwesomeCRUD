import {ScrollView, Text, StyleSheet, Dimensions, Alert, View} from "react-native";
import {Button, HelperText, TextInput, TouchableRipple} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser, updateUser } from "../../store/users/reducers";
import { fetchDesignations } from "../../store/designations/reducers";
import DropDown from "react-native-paper-dropdown";
import {validateUserForm} from "../../store/constants";

const device = Dimensions.get("screen");

const EditUser = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { id } = route.params;

    const { user, loading, error } = useSelector((state) => state.users);
    const { designations } = useSelector((state) => state.designations);
    const [ designationList, setDesignationList] = useState([]);
    const [ designation, setDesignation ] = useState("");
    const [isDropdownActive, setDropdown] = useState(false);
    const [ isFormValid, setFormValidity ] = useState(false);
    const [ errors, setErrors ] = useState({});
    const [ form, setForm ] = useState({
        name: '',
        mobile_number: '',
        email: '',
        designation_id: ''
    });

    useEffect(() => {
        dispatch(fetchUser(id));

        syncFormWithData();
    }, [id]);

    useEffect(() => {
        setNavigationOptions();

        setDesignationList(list());

        setFormDesignation();

        validateUserForm(form, setErrors, setFormValidity);
    }, [navigation, form.name, form.email, form.mobile_number, form.designation_id]);

    const setNavigationOptions = () => {
        navigation.setOptions({
            title: loading ? 'Loading User ...' : error !== null ? 'Error Occurred' : `Edit User`,
            headerTitle: loading ? 'Loading User ...' : error !== null ? 'Error Occurred' : `Edit User`
        });
    }

    const syncFormWithData = () => {
        setForm({
            ...form,
            user
        });
    }

    const setFormDesignation = () => {
        setForm({
            ...form,
            designation_id: designation
        });
    }

    const updateUserDetails = async () => {
        const response = await dispatch(updateUser(id, form));

        try {
            const { status, message } = response.data;

            navigation.navigate("Home");
        } catch (error) {

        }
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

                    }
                }
            ]);
        } else {
            Alert.alert("The form has been successfully validated and has Errors");
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
                    disabled={loading || error !== null}
                    label="Full Name"
                    placeholder="Ex. Juan Dela A. Cruz Jr."
                    value={form.name}
                    onChangeText={e => {
                        setForm({
                            ...form,
                            name: e
                        });
                    }} />
                <HelperText type="error" visible={errors.hasOwnProperty('name')}>
                    { errors.name }
                </HelperText>
            </View>

            <View style={styles.textInput}>
                <TextInput
                    mode="outlined"
                    disabled={loading || error !== null}
                    label="Mobile Number"
                    placeholder="+63 915 428 3142"
                    value={form.mobile_number}
                    onChangeText={e => {
                        setForm({
                            ...form,
                            mobile_number: e
                        });
                    }} />
                <HelperText type="error" visible={errors.hasOwnProperty('mobile_number')}>
                    { errors.mobile_number }
                </HelperText>
            </View>

            <View style={styles.textInput}>
                <TextInput
                    mode="outlined"
                    disabled={loading || error !== null}
                    label="Email"
                    placeholder="juandelacruzjr@gmail.com"
                    value={form.email}
                    onChangeText={e => {
                        setForm({
                            ...form,
                            email: e
                        });
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

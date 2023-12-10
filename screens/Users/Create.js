import { Alert, Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Button, HelperText, TextInput, Text } from "react-native-paper";
import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import DropDown from "react-native-paper-dropdown";
import {validateUserForm} from "../../store/constants";
import {storeUser} from "../../store/users/reducers";

const device = Dimensions.get("screen");

// console.log("Device Width: ", device);

const CreateUser = ({ navigation }) => {
    const dispatch = useDispatch();
    const { status, message } = useSelector((state) => state.users);
    const { designations } = useSelector((state) => state.designations);
    const [ designationList, setDesignationList ] = useState([]);
    const [ designation, setDesignation ] = useState("");
    const [ isDropdownActive, setDropdown ] = useState(false);
    const [ isFormValid, setFormValidity ] = useState(false);
    const [ errors, setErrors ] = useState({});
    const [ form, setForm ] = useState({
        name: '',
        mobile_number: '',
        email: '',
        designation_id: ''
    });

    useEffect(() => {
        setDesignationList(list());

        setFormDesignation();
    }, [designation]);

    useEffect(() => {
        validateUserForm(form, setErrors, setFormValidity);
    }, [form.name, form.designation_id, form.mobile_number, form.email])

    const setFormDesignation = () => {
        setForm({
            ...form,
            designation_id: designation
        });
    }

    const handleSubmit = () => {
        if (isFormValid) {
            dispatch(storeUser(form));

            setTimeout(() => {
                storeUserDetails();
            }, 1500);
        } else {
            Alert.alert("Error on submitting the form", "The errors must be solved prior to saving the changes");
        }
    }

    const storeUserDetails = () => {
        try {
            navigation.navigate("Home");

            if (status !== "success") {
                Alert.alert('Error Occurred', 'An error has occurred while updating the user.');
            } else {
                Alert.alert('The user has been saved!', message);
            }
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
                    label="Mobile Number"
                    placeholder="09154283142"
                    value={form.mobile_number}
                    onChangeText={e => {
                        setForm({
                            ...form,
                            mobile_number: e
                        })
                    }}/>
                <HelperText type="error" visible={errors.hasOwnProperty('mobile_number')}>
                    { errors.mobile_number }
                </HelperText>
            </View>

            <View style={styles.textInput}>
                <TextInput
                    mode="outlined"
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

            <Button
                mode="outlined"
                style={styles.submitButton}
                disabled={!isFormValid}
                onPress={handleSubmit}
                icon="check-circle">
                Save
            </Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        marginHorizontal: 18,
        paddingVertical: 20,
    },

    textInput: {
        marginVertical: 9.5
    },

    submitButton: {
        width: device.width / 3.9,
        alignSelf: "center",
        marginVertical: 27,
        borderRadius: 5
    }
});

export default CreateUser;

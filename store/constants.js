export const API_URL = 'https://seanphilipcruz.com/react/api';


export const validateUserForm = (form, setErrors, setFormValidity) => {
    let errors = {};

    if (!form.name) {
        errors.name = 'Name is required';
    }

    if (!form.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.email = 'Email is invalid';
    }

    if (form.mobile_number.length > 13 || !/\+63+[0-9]+/.test(form.mobile_number)) {
        errors.mobile_number = 'Invalid mobile number'
    }

    if (!form.designation_id) {
        errors.designation = 'Designation is required'
    }

    setErrors(errors);
    setFormValidity(Object.keys(errors).length === 0);
}

export function validateRegister(values) {
    const errors = {}

    if(!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length < 6 ) {
        errors.email = "Email must be valid format and at least 6 characters";
    }

    if(!values.username || values.username.trim().length < 3) {
        errors.username = "Username must be at least 3 characters";
    }

    if(!values.password || values.password.length < 6 ) {
        errors.password = "Password must be at least 6 characters";
    }

    if (!values.rePassword) {
        errors.rePassword = 'Please confirm your password!';
    } else if (values.password !== values.rePassword ) {
         errors.rePassword = 'Confirm password do not match the password!'
    }
    
    return errors;
}
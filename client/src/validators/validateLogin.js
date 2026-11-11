export function validateLogin(values) {
    const errors = {}

    if(!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length < 6 ) {
        errors.email = "Email must be valid format and at least 6 characters";
    }

    if(!values.password || values.password.length < 6 ) {
        errors.password = "Password must be at least 6 characters";
    }
    
    return errors;
}
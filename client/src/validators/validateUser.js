export function validateUser(values) {
    const errors = {}

    if(!values.email || values.email.length < 6 ) {
        errors.email = "Email must be valid format and at least 6 characters";
    }

    if(!values.password || values.password.length < 3 ) {
        errors.password = "Password must be at least 3 characters";
    }
    
    return errors;
}
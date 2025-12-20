import { useState } from "react";

export default function useForm(callback, initialValues, validate = () => ({})) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const changeHandler = (event) => {
        const {name, value, type, checked } = event.target;
        const newValue = type === "checkbox" ? checked : value;

        setValues(state => ({
            ...state,
            [name]: newValue,
        }));

        if (touched[name]){
            setErrors(validate({ ...values, [name]: newValue}));
        }
    };

    const blurHandler = (event) => {
        const { name} = event.target;

        setTouched(state => ({ ...state, [name]: true}));
        setErrors(validate(values));
    };

    const formAction = (formData) => {
        const submittedValues = { 
            ...values,
            ...Object.fromEntries(formData.entries()),
        };

        const validationErrors = validate(submittedValues);

        setErrors(validationErrors);
        setTouched(
            Object.keys(submittedValues).reduce(
                (acc, key) => ({ ...acc, [key]: true }),
                {}
            )
        );
        if (Object.keys(validationErrors).length === 0) {
            callback(submittedValues);
        }
    };

    const inputData = (fieldName) => ({
            name: fieldName,
            onChange: changeHandler,
            value: values[fieldName] ?? "",
            onBlur: blurHandler,
        });

    return {
        values,
        setValues,
        errors,
        touched,
        formAction,
        inputData,    
    };
}
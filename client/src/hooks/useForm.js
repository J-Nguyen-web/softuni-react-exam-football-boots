import { useState } from "react";

export default function useForm(callback, initialValues) {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (event) => {
        setValues(state => ({
            ...state,
            [event.target.name]: event.target.value
        }))
    };

    const formAction = (formData) => {
        callback(values, formData);
    }

    const inputData = (fieldName) => {
        return {
            name: fieldName,
            onChange: changeHandler,
            value: values[fieldName],
        }
    }

    return {
        values,
        setValues,
        changeHandler,
        formAction,
        inputData,    
    };
}
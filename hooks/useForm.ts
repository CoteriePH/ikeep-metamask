import React from 'react';

export default function useForm(initialValues: any) {
    const [values, setValues] = React.useState(initialValues);

    const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues((oldValue: any) => ({
            ...oldValue,
            [event.target.name]: event.target.value
        }));
    };

    return { values, onInputHandler };
}
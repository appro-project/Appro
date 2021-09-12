import React from 'react';
import { TextField } from '@material-ui/core';

interface Props {
    title: string;
    value: number | null;
    required?: boolean;

    handleProperty(event: React.ChangeEvent<any>): void;
}

const NumericProperty = ({ title, value, required, handleProperty }: Props) =>
    <TextField
        variant="standard"
        required = { required }
        fullWidth
        id="email"
        label={ title }
        name={ title }
        value={ value || '' }
        type={ 'number' }
        onChange={ event => handleProperty(event) }/>;

export default NumericProperty;

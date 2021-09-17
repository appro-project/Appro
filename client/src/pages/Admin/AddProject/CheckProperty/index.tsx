import React from 'react';
import { InputLabel, Switch } from '@material-ui/core';

interface Props {
    title: string;
    checked: boolean;

    handleProperty(): void;
}

const CheckProperty = ({ title, checked, handleProperty }: Props) =>
    <React.Fragment>
        <InputLabel>{ title }</InputLabel>
        <Switch
            checked={ checked }
            onChange={ () => handleProperty() }
            color="primary"
            name="project-garage"
            inputProps={ { 'aria-label': 'primary checkbox' } }
        />
    </React.Fragment>;
export default CheckProperty;

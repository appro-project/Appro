import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { FormLabel } from '@material-ui/core';

interface Props {
    title: string;
    required?: boolean;
    multiple?: boolean;
    disabled?: boolean;
    handleProperty(event: React.ChangeEvent<any>): void;
}

const FileProperty = ({ title, required, multiple, disabled, handleProperty }: Props) =>
    <React.Fragment>
        <FormLabel>{ title }</FormLabel>
        <FormControl>
            <InputLabel htmlFor={ `${title}-label` }/>
            <Input type="file" id={ `${title}-label` }
                   onChange={ event => handleProperty(event) }
                   inputProps={ { multiple } }
                   disabled={disabled}
                   required={ required }/>
        </FormControl>
    </React.Fragment>;

export default FileProperty;

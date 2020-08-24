import React from 'react';

import classes from './TextInput.module.scss';

interface Props {
    placeholder: string;
}

const TextInput = (props: Props) => {
    return <input type="text" placeholder={ props.placeholder }/>;
};

export default TextInput;

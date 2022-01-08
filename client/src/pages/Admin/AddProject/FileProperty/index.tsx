import React, { useState } from 'react';
import classes from './FileProperty.module.scss';

interface Props {
  title: string;
  required?: boolean;

  handleProperty(event: React.ChangeEvent<HTMLInputElement>): void;
}

const FileProperty = ({ title, required, handleProperty }: Props) => {
  const [fileName, setFileName] = useState('');

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.files && event.target.files[0] ? event.target.files[0].name : '');
    handleProperty(event);
  };

  return (
    <>
      <label className={classes['file-label']} htmlFor={`${title}-label`}>
        {title}
        <input hidden type="file" id={`${title}-label`} onChange={handleChangeFile} required={required} />
        <div className={classes['file-input']}>{fileName}</div>
      </label>
    </>
  );
};

export default FileProperty;

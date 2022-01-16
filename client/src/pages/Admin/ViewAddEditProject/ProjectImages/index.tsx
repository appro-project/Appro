import React from 'react';
import { Button, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core';
import FileProperty from "../FileProperty";
import delete_icon from '../../../../assets/img/admin/delete.svg';


interface Props {
    images: string[] | null | undefined;
    title: string;
    required?: boolean;
    multiple?: boolean;
    disabled?: boolean;
    
    handleAddImage(event: React.ChangeEvent<any>): void;
    
    handleRemoveImage(id: string | number): void;
    
}

const ProjectImages = ({ images, title, required, multiple, disabled, handleAddImage, handleRemoveImage }: Props) => {
    if (images) {
        return <>
            <ImageList cols={ 3 } rowHeight={ 164 }>
                { images.map((item) => (
                    <ImageListItem key={ item }>
                        <img
                            src={ item }
                            alt={ item }
                            loading="lazy"
                        />
                        { !disabled &&
                        <ImageListItemBar
                            position="top"
                            actionIcon={
                                <IconButton style={ { width: 40, height: 40 } }
                                            disabled={ disabled }
                                            onClick={ () => handleRemoveImage(item) }>
                                    <img src={ delete_icon }/>
                                </IconButton>
                            }
                            actionPosition="left"
                        />}
                    </ImageListItem>
                )) }
            </ImageList>
        </>
    }
    return <FileProperty
        title={ title }
        required={ required }
        disabled={ disabled }
        multiple={ multiple }
        handleProperty={ handleAddImage }
    />
}

export default ProjectImages;

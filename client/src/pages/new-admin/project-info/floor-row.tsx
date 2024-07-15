import React, {useEffect} from 'react'
import {Button, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Paper} from '@mui/material'
import NumericProperty from '../../Admin/ViewAddEditProject/NumericProperty'
import CheckProperty from '../../Admin/ViewAddEditProject/CheckProperty'
import {ImageInfo} from "@/api/model";
import {useSaveImages} from "@/api/useSaveImages";
import FileProperty from "@/pages/Admin/ViewAddEditProject/FileProperty";
import delete_icon from "@/assets/img/admin/delete.svg";

interface PropsType {
    view: boolean;
    id: number;
    index: number | null;
    area: number | null;
    height: number | null;
    planningImage: ImageInfo | null;
    isAttic: boolean | null;
    isBasement: boolean | null;
    handleFloorIndexChange: (event: React.ChangeEvent<any>, floorId: number) => void;
    handleFloorAtticChange: (floorId: number) => void;
    handleFloorBasementChange: (floorId: number) => void;
    handleFloorAreaChange: (event: React.ChangeEvent<any>, floorId: number) => void;
    handleFloorHeightChange: (event: React.ChangeEvent<any>, floorId: number) => void;
    handleFloorImageChange: (floorId: number, image:ImageInfo) => void;
    handleDeleteFloorClick: (floorId: number) => void;
}

const FloorRow: React.FC<PropsType> = ({
                                           view,
                                           id,
                                           index,
                                           area,
                                           height,
                                           planningImage,
                                           isBasement,
                                           isAttic,
                                           handleFloorIndexChange,
                                           handleFloorAtticChange,
                                           handleFloorBasementChange,
                                           handleFloorAreaChange,
                                           handleFloorHeightChange,
                                           handleFloorImageChange,
                                           handleDeleteFloorClick
                                       }) => {

    const {mutate: saveImages, data: imagesPreview} = useSaveImages();

    useEffect(() => {
        if (imagesPreview) {
            const floorImage = imagesPreview[0];
            handleFloorImageChange(id, floorImage);
        }
    }, [imagesPreview]);


    const isFloorIndexDisabled = () => {
        // return isAttic || isBasement;
        return false;
    };

    const isFloorAtticDisabled = () => {
        // return !!index || isBasement;
        return false;
    };

    const isFloorBasementDisabled = () => {
        // return !!index || isAttic;
        return false;
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        saveImages({images: event.target.files})
    }



    return (
        <Paper sx={{p: 2}}>
            <Grid container spacing={2} key={`floor-${index}`}>
                <Grid item xs={2}>
                    <NumericProperty
                        title={'Номер этажа'}
                        value={index}
                        disabled={isFloorIndexDisabled() || view}
                        handleProperty={(event: React.ChangeEvent<any>) => handleFloorIndexChange(event, id)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <NumericProperty
                        title={'Площадь, м2'}
                        value={area}
                        disabled={view}
                        handleProperty={(event: React.ChangeEvent<any>) => handleFloorAreaChange(event, id)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <NumericProperty
                        title={'Высота, м'}
                        value={height}
                        disabled={view}
                        handleProperty={(event: React.ChangeEvent<any>) => handleFloorHeightChange(event, id)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CheckProperty
                        title={'Мансарда'}
                        checked={!!isAttic}
                        disabled={isFloorAtticDisabled() || view}
                        handleProperty={() => handleFloorAtticChange(id)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CheckProperty
                        title={'Подвал'}
                        checked={!!isBasement}
                        disabled={isFloorBasementDisabled() || view}
                        handleProperty={() => handleFloorBasementChange(id)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button variant='contained' color='primary' onClick={() => handleDeleteFloorClick(id)}>
                        Удалить
                    </Button>
                </Grid>

                <Grid item xs={6}>
                    <FloorImage
                        images={planningImage ? [planningImage.path] : null}
                        title={'Загрузить планировку'}
                        disabled={view}
                        handleAddImage={handleImageUpload}
                        handleRemoveImage={() => handleFloorImageChange(id, null)}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default FloorRow;



interface Props {
    images: string[] | null | undefined;
    title: string;
    required?: boolean;
    disabled?: boolean;
    isMain?: boolean;

    handleAddImage(event: React.ChangeEvent<any>): void;

    handleRemoveImage(id: string | number): void;
}

const FloorImage = ({
                          images,
                          title,
                          required,
                          disabled,
                          isMain,
                          handleAddImage,
                          handleRemoveImage
                      }: Props) => {
    if (images && isMain) {
        return ListImage(images, disabled, handleRemoveImage)
    }
    return (
        <>
            <FileProperty
                title={title}
                required={required}
                disabled={disabled}
                handleProperty={handleAddImage}
            />
            {images && ListImage(images, disabled, handleRemoveImage)}

        </>
    )
}


export const ListImage = (
    images: string[],
    disabled: boolean | undefined,
    handleRemoveImage: (id: string | number) => void
) => {
    return (
        <ImageList cols={3}>
            {images.map((item, index) => (
                <ImageListItem key={item + index}>
                    <img src={item} alt={item} loading='lazy'/>
                    {!disabled && (
                        <ImageListItemBar
                            position='top'
                            actionIcon={
                                <IconButton
                                    style={{width: 40, height: 40}}
                                    disabled={disabled}
                                    onClick={() => handleRemoveImage(item)}
                                >
                                    <img src={delete_icon}/>
                                </IconButton>
                            }
                            actionPosition='left'
                        />
                    )}
                </ImageListItem>
            ))}
        </ImageList>
    )
}

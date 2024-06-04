import React, {FC} from "react";
import {ProjectProps} from "@/pages/new-admin/project-info/model";
import {Grid, IconButton, ImageList, ImageListItem, ImageListItemBar} from "@mui/material";
import FileProperty from "@/pages/Admin/ViewAddEditProject/FileProperty";
import {currentHost} from "@/services/server-data";
import delete_icon from "@/assets/img/admin/delete.svg";

export const ImageData: FC<ProjectProps> = ({mode, state, dispatch}) => {
    const view = mode === 'view';
    const addNew = false;

    const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'imagesToAdd', payload: event.target.files});
    }

    const handlePhotosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'photosToAdd', payload: event.target.files});
    }

    const handleImageRemove = (imageSrc: string) => {
        const images = state.images;
        const imagesToDelete = state.imagesToDelete || [];
        if (images) {
            const newImages = images.filter((i: string) => i !== imageSrc);
            imagesToDelete.push(imageSrc);
            dispatch({type: 'images', payload: newImages});
            dispatch({type: 'imagesToDelete', payload: imagesToDelete});
        }
    }

    const handlePhotoRemove = (photoSrc: string) => {
        const photos = state.photos;
        const photosToDelete = state.photosToDelete || [];
        if (photos) {
            const newPhotos = photos.filter((i: string) => i !== photoSrc);
            photosToDelete.push(photoSrc);
            dispatch({type: 'photos', payload: newPhotos});
            dispatch({type: 'photosToDelete', payload: photosToDelete});
        }
    }

    const handleMainImageChange = (event: React.ChangeEvent<any>) => {
        dispatch({type: 'mainImage', payload: event.target.files[0]});
    }

    const handleMainImageRemove = () => {
        const mainImage = state.mainImage;
        const imagesToDelete = state.imagesToDelete || [];
        // @ts-ignore
        imagesToDelete.push(mainImage);
        dispatch({type: 'mainImage', payload: null});
        dispatch({type: 'imagesToDelete', payload: imagesToDelete});
    }


    return (
        <Grid container>
            <Grid item xs={12}>
                <ProjectImage
                    images={state.mainImage && typeof state.mainImage === 'string' ? [state.mainImage] : null}
                    title={'Загрузить основное изображения проекта'}
                    isMain={true}
                    required={true}
                    disabled={view}
                    handleAddImage={handleMainImageChange}
                    handleRemoveImage={handleMainImageRemove}
                />
            </Grid>
            <Grid item xs={12}>
                <ProjectImage
                    images={addNew ? null : state.images}
                    title={'Загрузить изображения проекта'}
                    required={true}
                    multiple={true}
                    disabled={view}
                    handleAddImage={handleImagesChange}
                    handleRemoveImage={handleImageRemove}
                />
            </Grid>
            {
                state.isFinished && (
                    <Grid item xs={12}>
                        <ProjectImage
                            images={addNew ? null : state.photos}
                            title={'Загрузить фото готового проекта'}
                            required={false}
                            multiple={true}
                            disabled={view}
                            handleAddImage={handlePhotosChange}
                            handleRemoveImage={handlePhotoRemove}
                        />
                    </Grid>
                )
            }
        </Grid>)
}


interface Props {
    images: string[] | null | undefined;
    title: string;
    required?: boolean;
    multiple?: boolean;
    disabled?: boolean;
    isMain?: boolean;

    handleAddImage(event: React.ChangeEvent<any>): void;

    handleRemoveImage(id: string | number): void;
}

const ProjectImage = ({
                          images,
                          title,
                          required,
                          multiple,
                          disabled,
                          isMain,
                          handleAddImage,
                          handleRemoveImage
                      }: Props) => {
    if (images && isMain) {
        return getImageList(images, disabled, handleRemoveImage)
    }
    return (
        <>
            {images && getImageList(images, disabled, handleRemoveImage)}
            <FileProperty
                title={title}
                required={required}
                disabled={disabled}
                multiple={multiple}
                handleProperty={handleAddImage}
            />
        </>
    )
}


const getImageList = (
    images: string[],
    disabled: boolean | undefined,
    handleRemoveImage: (id: string | number) => void
) => {
    return (
        <ImageList cols={3} >
            {images.map((item) => (
                <ImageListItem key={item}>
                    <img src={currentHost + item} alt={item} loading='lazy'/>
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
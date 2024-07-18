import React, {FC, useEffect} from "react";
import {ProjectProps} from "@/pages/new-admin/project-info/model";
import {Divider, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography} from "@mui/material";
import FileProperty from "@/pages/Admin/ViewAddEditProject/FileProperty";
import delete_icon from "@/assets/img/admin/delete.svg";

import {useSaveImages} from "@/api/useSaveImages";
import {ImageInfo} from "@/api/model";

export const ImageData: FC<ProjectProps> = ({mode, projectDto, dispatch}) => {
    const view = mode === 'view';
    const addNew = false;

    const {mutate: saveImages, data: savedImages} = useSaveImages();
    const {mutate: saveMainImage, data: savedMainImage} = useSaveImages();
    const {mutate: savePhotos, data: savedPhotos} = useSaveImages();

    useEffect(() => {
        if (savedImages) {
            const {images} = projectDto;
            dispatch({type: 'images', payload: images ? [...images, ...savedImages] : savedImages});
        }
    }, [savedImages]);

    useEffect(() => {
        if (savedMainImage) {
            dispatch({type: 'mainImage', payload: savedMainImage[0]});
        }
    }, [saveMainImage]);

    const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        saveImages({images: event.target.files})
    }


    const handleImageRemove = (imageSrc: string) => {
        const images = projectDto.images;

        if (images) {
            const newImages = images.filter((i: ImageInfo) => i.path !== imageSrc);
            dispatch({type: 'images', payload: newImages});
        }
    }


    const handleMainImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      saveMainImage({images: event.target.files})
    }

    const handleMainImageRemove = () => {
        dispatch({type: 'mainImage', payload: null});
    }


    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography>Основне зображення</Typography>
                <ProjectImage
                    images={projectDto.mainImage ? [projectDto.mainImage.path] : null}
                    title={'Загрузить основное изображения проекта'}
                    isMain={true}
                    required={true}
                    disabled={view}
                    handleAddImage={handleMainImageChange}
                    handleRemoveImage={handleMainImageRemove}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography>Зображення проекту</Typography>
                {/*{ListImage(state.images ? state.images.map((i: any) => i.path) : [], view, handleImageRemove)}*/}
            </Grid>
            <Divider/>
            <Grid item xs={12}>
                <ProjectImage
                    images={addNew ? null : projectDto.images.map((i: any) => i.path)}
                    title={'Загрузить изображения проекта'}
                    required={true}
                    multiple={true}
                    disabled={view}
                    handleAddImage={handleImagesChange}
                    handleRemoveImage={handleImageRemove}
                />
            </Grid>
            {/*{*/}
            {/*    state.projectConfig?.isFinished && (*/}
            {/*        <Grid item xs={12}>*/}
            {/*            <ProjectImage*/}
            {/*                images={addNew ? null : state.photos.map((i: any) => i.path)}*/}
            {/*                title={'Загрузить фото готового проекта'}*/}
            {/*                required={false}*/}
            {/*                multiple={true}*/}
            {/*                disabled={view}*/}
            {/*                handleAddImage={handlePhotosChange}*/}
            {/*                handleRemoveImage={handlePhotoRemove}*/}
            {/*            />*/}
            {/*        </Grid>*/}
            {/*    )*/}
            {/*}*/}
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
        return ListImage(images, disabled, handleRemoveImage)
    }
    return (
        <>
            <FileProperty
                title={title}
                required={required}
                disabled={disabled}
                multiple={multiple}
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
                <ImageListItem key={item + index} >
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
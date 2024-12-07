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

    const {mutate: saveImages, data: savedImages, isPending: imagesLoading} = useSaveImages();
    const {mutate: saveMainImage, data: savedMainImage, isPending: mainImageLoading} = useSaveImages();
    const {mutate: savePhotos, data: savedPhotos, isPending: photoLoading} = useSaveImages();

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
    }, [savedMainImage]);

    useEffect(() => {
        if (savedPhotos) {
            const { photos } = projectDto
            dispatch({
                type: 'photos',
                payload: photos ? [...photos, ...savedPhotos] : savedPhotos
            })
        }
    }, [savedPhotos])

    const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        saveImages({images: event.target.files , type: 'image'})
    }


    const handleImageRemove = (imageSrc: string) => {
        const images = projectDto.images;

        if (images) {
            const newImages = images.filter((i: ImageInfo) => i.path !== imageSrc);
            dispatch({type: 'images', payload: newImages});
        }
    }


    const handleMainImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      saveMainImage({images: event.target.files, type: 'main'})
    }

    const handleMainImageRemove = () => {
        dispatch({type: 'mainImage', payload: null});
    }

    const handlePhotosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        savePhotos({ images: event.target.files, type: 'photo' })
    }

    const handlePhotoRemove = (photoSrc: string) => {
        const photos = projectDto.photos

        if (photos) {
            const newPhotos = photos.filter((i: ImageInfo) => i.path !== photoSrc)
            dispatch({ type: 'photos', payload: newPhotos })
        }
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant={'h5'}>Основне зображення</Typography>
                <ProjectImage
                    images={projectDto.mainImage ? [projectDto.mainImage.path] : null}
                    title={'Завантажити'}
                    isMain={true}
                    required={true}
                    disabled={view}
                    handleAddImage={handleMainImageChange}
                    handleRemoveImage={handleMainImageRemove}
                    isLoading={mainImageLoading}
                />
            </Grid>
            {/* <Divider/> */}
            <Grid item xs={12}>
                <Typography variant={'h5'}>Зображення проекту</Typography>
                <ProjectImage
                    images={addNew ? null : projectDto.images.map((i: any) => i.path)}
                    title={'Завантажити'}
                    required={true}
                    multiple={true}
                    disabled={view}
                    handleAddImage={handleImagesChange}
                    handleRemoveImage={handleImageRemove}
                    isLoading={imagesLoading}
                />
            </Grid>
            {projectDto.isFinished && (
                <>
                    <Divider />
                    <Grid item xs={12}>
                        <Typography variant={'h5'} >Фото готового проекту</Typography>
                        <ProjectImage
                            images={addNew ? null : projectDto.photos.map((i: any) => i.path)}
                            title={'Завантажити'}
                            required={false}
                            multiple={true}
                            disabled={view}
                            handleAddImage={handlePhotosChange}
                            handleRemoveImage={handlePhotoRemove}
                            isLoading={photoLoading}
                        />
                    </Grid>
                </>
            )}
        </Grid>)
}


interface ProjectImageProps {
    images: string[] | null | undefined;
    title: string;
    required?: boolean;
    multiple?: boolean;
    disabled?: boolean;
    isMain?: boolean;
    isLoading?: boolean;

    handleAddImage(event: React.ChangeEvent<any>): void;

    handleRemoveImage(id: string | number): void;
}

const ProjectImage: FC<ProjectImageProps> = ({
                          images,
                          title,
                          required,
                          multiple,
                          disabled,
                          isMain,
                          handleAddImage,
                          handleRemoveImage,
                          isLoading
                      }) => {
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
                isLoading={isLoading}
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
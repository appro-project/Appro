import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import {Button, DialogTitle, Grid, Typography} from '@material-ui/core';
import TextProperty from './TextProperty';
import SelectProperty from './SelectProperty';
import NumericProperty from './NumericProperty';
import FileProperty from './FileProperty';
import CheckProperty from './CheckProperty';
import Container from '../../../containers/hoc/Container';
import {
    ceilingOptions,
    foundationOptions,
    insulationOptions,
    roofOptions,
    styleOptions,
    wallMaterialOptions,
} from '../constants';

interface PropsType {
    handleTitleChange: (event: React.ChangeEvent<any>) => void;
    handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleStyleChange: (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => void;
    handleGeneralAreaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleLivingAreaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleBuildingAreaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleTimeToCreateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleImagesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleMainImageChange: (event: React.ChangeEvent<any>) => void;
    handleProjectPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleBuildingPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleLengthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleWidthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleFoundationChange: (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => void;
    handleWallMaterialChange: (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => void;
    handleWallThicknessChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleInsulationChange: (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => void;
    handleInsulationThicknessChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleCeilingChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
    handleRoofChange: (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => void;
    handleGarageChange: () => void;
    handleBedroomChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleFloorNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isProjectFilled: boolean;
    saveProject: () => void;
    renderFloors: () => JSX.Element[];
    title: string;
    description: string;
    generalArea: number | null;
    timeToCreate: number | null;
    projectPrice: number | null;
    buildingArea: number | null;
    livingArea: number | null;
    buildingPrice: number | null;
    foundation: string;
    ceiling: string;
    roof: string;
    bedroomCount: number | null;
    wallMaterial: string;
    wallThickness: number | null;
    insulation: string;
    insulationThickness: number | null;
    length: number | null;
    width: number | null;
    isGaragePresent: boolean;
    style: string;
    floorListLength: number;
}

const AddProject: React.FC<PropsType> = ({
                                             handleTitleChange,
                                             handleDescriptionChange,
                                             handleStyleChange,
                                             handleGeneralAreaChange,
                                             handleLivingAreaChange,
                                             handleBuildingAreaChange,
                                             handleTimeToCreateChange,
                                             handleImagesChange,
                                             handleMainImageChange,
                                             handleProjectPriceChange,
                                             handleBuildingPriceChange,
                                             handleLengthChange,
                                             handleWidthChange,
                                             handleFoundationChange,
                                             handleWallMaterialChange,
                                             handleWallThicknessChange,
                                             handleInsulationChange,
                                             handleInsulationThicknessChange,
                                             handleCeilingChange,
                                             handleRoofChange,
                                             handleGarageChange,
                                             handleBedroomChange,
                                             handleFloorNumberChange,
                                             isProjectFilled,
                                             saveProject,
                                             renderFloors,
                                             title,
                                             description,
                                             generalArea,
                                             projectPrice,
                                             buildingArea,
                                             livingArea,
                                             buildingPrice,
                                             foundation,
                                             ceiling,
                                             roof,
                                             bedroomCount,
                                             wallMaterial,
                                             wallThickness,
                                             insulation,
                                             insulationThickness,
                                             length,
                                             width,
                                             isGaragePresent,
                                             style,
                                             timeToCreate,
                                             floorListLength
                                         }) => {

    return <div style={{padding: 20}}>
        <Container>
            <Grid container spacing={3} justifyContent="center"
                  alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom align="center">Новый проект</Typography>
                </Grid>
                <div>
                    <div>
                        <DialogTitle>
                            Основная информация</DialogTitle>
                    </div>
                    <Grid item xs={12} container spacing={5}>
                        <Grid item xs={6}>
                            <TextProperty
                                title={'Название проекта'}
                                value={title}
                                handleProperty={handleTitleChange}
                                required={true}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextProperty
                                title={'Описание'}
                                value={description}
                                handleProperty={handleDescriptionChange}
                                required={true}/>
                        </Grid>
                        <Grid item xs={6}>
                            <SelectProperty
                                title={'Стиль'}
                                value={style}
                                options={styleOptions}
                                required={true}
                                handleProperty={handleStyleChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <NumericProperty
                                title={'Общая площадь проекта, кв.м.'}
                                value={generalArea}
                                required={true}
                                handleProperty={handleGeneralAreaChange}/>
                        </Grid>
                        <Grid item xs={4}>
                            <NumericProperty
                                title={'Подготовка проекта, дн'}
                                value={timeToCreate}
                                required={true}
                                handleProperty={handleTimeToCreateChange}/>
                        </Grid>
                        <Grid item xs={4}>
                            <NumericProperty
                                title={'Цена проекта, грн'}
                                value={projectPrice}
                                required={true}
                                handleProperty={handleProjectPriceChange}/>
                        </Grid>
                        <Grid item xs={4}>
                            <NumericProperty
                                title={'Цена строительства, грн'}
                                value={buildingPrice}
                                required={true}
                                handleProperty={handleBuildingPriceChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <FileProperty
                                title={'Загрузить основное изображения проекта'}
                                required={true}
                                handleProperty={handleMainImageChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <FileProperty
                                title={'Загрузить изображения проекта'}
                                required={true}
                                multiple={true}
                                handleProperty={handleImagesChange}/>
                        </Grid>
                    </Grid>
                    <DialogTitle style={{paddingTop: '20px'}}>
                        Детальная информация</DialogTitle>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <NumericProperty
                                title={'Жилая площадь, кв.м.'}
                                value={livingArea}
                                required={true}
                                handleProperty={handleLivingAreaChange}/>
                        </Grid>
                        <Grid item xs={4}>
                            <NumericProperty
                                title={'Площадь застройки, кв.м.'}
                                value={buildingArea}
                                required={true}
                                handleProperty={handleBuildingAreaChange}/>
                        </Grid>
                        <Grid item xs={4}>
                            <SelectProperty
                                title={'Фундамент'}
                                value={foundation}
                                options={foundationOptions}
                                required={true}
                                handleProperty={handleFoundationChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <SelectProperty
                                title={'Перекрытия'}
                                value={ceiling}
                                options={ceilingOptions}
                                required={true}
                                handleProperty={handleCeilingChange}/>
                        </Grid>
                        <Grid item xs={4}>
                            <SelectProperty title={'Кровля'}
                                            value={roof}
                                            options={roofOptions}
                                            required={true}
                                            handleProperty={handleRoofChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <NumericProperty title={'Количество спален'}
                                             value={bedroomCount}
                                             required={true}
                                             handleProperty={handleBedroomChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <SelectProperty
                                title={'Материал стен'}
                                value={wallMaterial}
                                options={wallMaterialOptions}
                                required={true}
                                handleProperty={handleWallMaterialChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <NumericProperty
                                title={'Толщина стен, мм'}
                                value={wallThickness}
                                required={true}
                                handleProperty={handleWallThicknessChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <SelectProperty title={'Материал утеплителя'}
                                            value={insulation}
                                            options={insulationOptions}
                                            required={true}
                                            handleProperty={
                                                handleInsulationChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <NumericProperty title={'Толщина утеплителя, мм'}
                                             value={insulationThickness}
                                             required={true}
                                             handleProperty={
                                                 handleInsulationThicknessChange}
                            />
                        </Grid>
                        <Grid item xs={12} container spacing={2}>
                            <Grid item xs={2}>
                                <InputLabel>Габариты застройки</InputLabel>
                            </Grid>
                            <Grid item xs={2}>
                                <NumericProperty
                                    title={'длина, м'}
                                    value={length}
                                    required={true}
                                    handleProperty={handleLengthChange}/>
                            </Grid>
                            <Grid item xs={2}>
                                <NumericProperty
                                    title={'ширина, м'}
                                    value={width}
                                    required={true}
                                    handleProperty={handleWidthChange}/>
                            </Grid>

                        </Grid>
                        <Grid item xs={12}>
                            <CheckProperty title={'Гараж'}
                                           checked={isGaragePresent}
                                           handleProperty={handleGarageChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <NumericProperty
                                title={'Количество этажей (включая мансарду и подвал)'}
                                value={floorListLength}
                                required={true}
                                handleProperty={handleFloorNumberChange}/>
                        </Grid>
                        {
                            renderFloors()
                            // floorRows
                        }
                    </Grid>
                </div>
                <Grid item lg={8}>
                    <Button variant="contained"
                            color="primary"
                            disabled={isProjectFilled}
                            onClick={saveProject}>
                        Добавить проект
                    </Button>
                </Grid>
            </Grid>
        </Container>
    </div>;
}

export default AddProject;

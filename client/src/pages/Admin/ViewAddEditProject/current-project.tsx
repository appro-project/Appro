import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import { Button, DialogTitle, Grid } from '@mui/material'
import TextProperty from './TextProperty'
import SelectProperty from './SelectProperty'
import NumericProperty from './NumericProperty'
import CheckProperty from './CheckProperty'
import { Container } from '@/containers/hoc/Container/Container'
import {
	ceilingOptions,
	foundationOptions,
	insulationOptions,
	roofOptions,
	styleOptions,
	wallMaterialOptions
} from '../constants'
import ProjectImage from './ProjectImages'
import { SelectChangeEvent } from '@mui/material/Select'

interface PropsType {
  add: boolean;
  edit: boolean;
  handleTitleChange: (event: React.ChangeEvent<any>) => void;
  handleDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleStyleChange: (event: SelectChangeEvent) => void;
  handleGeneralAreaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLivingAreaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBuildingAreaChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTimeToCreateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImagesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhotosChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageRemove: (imageSrc: string) => void;
  handlePhotoRemove: (imageSrc: string) => void;
  handleMainImageChange: (event: React.ChangeEvent<any>) => void;
  handleMainImageRemove: () => void;
  handleProjectPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBuildingPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLengthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleWidthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFoundationChange: (event: SelectChangeEvent) => void;
  handleWallMaterialChange: (event: SelectChangeEvent) => void;
  handleWallThicknessChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInsulationChange: (event: SelectChangeEvent) => void;
  handleInsulationThicknessChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCeilingChange: (event: SelectChangeEvent) => void;
  handleRoofChange: (event: SelectChangeEvent) => void;
  handleGarageChange: () => void;
  handleBedroomChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFloorNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isProjectFilled: boolean;
  saveProject: () => void;
  cancelChanges: () => void;
  renderFloors: () => JSX.Element[];
  id?: number;
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
  isFinished: boolean;
  mainImage?: File | string | null;
  images?: string[] | null;
  photos?: string[] | null;
}

const ViewAddEditProject: React.FC<PropsType> = ({
  add,
  edit,
  handleTitleChange,
  handleDescriptionChange,
  handleStyleChange,
  handleGeneralAreaChange,
  handleLivingAreaChange,
  handleBuildingAreaChange,
  handleTimeToCreateChange,
  handleImagesChange,
  handlePhotosChange,
  handleImageRemove,
  handlePhotoRemove,
  handleMainImageChange,
  handleMainImageRemove,
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
  cancelChanges,
  renderFloors,
  id,
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
  floorListLength,
  mainImage,
  images,
  photos,
  isFinished,
}) => {

  const view = !(add || edit);

  return (
    <div style={{ padding: 20 }}>
      <Container>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <div>
            <div>
              <DialogTitle>Основная информация</DialogTitle>
            </div>
            <Grid item xs={12} container spacing={5}>
              <Grid item xs={6}>
                <TextProperty
                  title={'Название проекта'}
                  value={title}
                  handleProperty={handleTitleChange}
                  required={true}
                  disabled={view}
                />
              </Grid>
              <Grid item xs={6}>
                <TextProperty
                  title={'Описание'}
                  value={description}
                  handleProperty={handleDescriptionChange}
                  required={true}
                  disabled={view}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectProperty
                  title={'Стиль'}
                  value={style}
                  options={styleOptions}
                  required={true}
                  disabled={view}
                  handleProperty={handleStyleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <NumericProperty
                  title={'Общая площадь проекта, кв.м.'}
                  value={generalArea}
                  required={true}
                  disabled={view}
                  handleProperty={handleGeneralAreaChange}
                />
              </Grid>
              <Grid item xs={4}>
                <NumericProperty
                  title={'Подготовка проекта, дн'}
                  value={timeToCreate}
                  required={true}
                  disabled={view}
                  handleProperty={handleTimeToCreateChange}
                />
              </Grid>
              <Grid item xs={4}>
                <NumericProperty
                  title={'Цена проекта, грн'}
                  value={projectPrice}
                  required={true}
                  disabled={view}
                  handleProperty={handleProjectPriceChange}
                />
              </Grid>
              <Grid item xs={4}>
                <NumericProperty
                  title={'Цена строительства, грн'}
                  value={buildingPrice}
                  required={true}
                  disabled={view}
                  handleProperty={handleBuildingPriceChange}
                />
              </Grid>
              <Grid item xs={6}>
                <ProjectImage
                  images={mainImage && typeof mainImage === 'string' ? [mainImage] : null}
                  title={'Загрузить основное изображения проекта'}
                  isMain={true}
                  required={true}
                  disabled={view}
                  handleAddImage={handleMainImageChange}
                  handleRemoveImage={handleMainImageRemove}
                />
              </Grid>
              <Grid item xs={6}>
                <ProjectImage
                  images={add ? null : images}
                  title={'Загрузить изображения проекта'}
                  required={true}
                  multiple={true}
                  disabled={view}
                  handleAddImage={handleImagesChange}
                  handleRemoveImage={handleImageRemove}
                />
              </Grid>
              {isFinished && (
                <Grid item xs={6}>
                  <ProjectImage
                    images={add ? null : photos}
                    title={'Загрузить фото готового проекта'}
                    required={false}
                    multiple={true}
                    disabled={view}
                    handleAddImage={handlePhotosChange}
                    handleRemoveImage={handlePhotoRemove}
                  />
                </Grid>
              )}
            </Grid>
            <DialogTitle style={{ paddingTop: '20px' }}>Детальная информация</DialogTitle>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <NumericProperty
                  title={'Жилая площадь, кв.м.'}
                  value={livingArea}
                  required={true}
                  disabled={view}
                  handleProperty={handleLivingAreaChange}
                />
              </Grid>
              <Grid item xs={4}>
                <NumericProperty
                  title={'Площадь застройки, кв.м.'}
                  value={buildingArea}
                  required={true}
                  disabled={view}
                  handleProperty={handleBuildingAreaChange}
                />
              </Grid>
              <Grid item xs={4}>
                <SelectProperty
                  title={'Фундамент'}
                  value={foundation}
                  options={foundationOptions}
                  required={true}
                  disabled={view}
                  handleProperty={handleFoundationChange}
                />
              </Grid>
              <Grid item xs={4}>
                <SelectProperty
                  title={'Перекрытия'}
                  value={ceiling}
                  options={ceilingOptions}
                  required={true}
                  disabled={view}
                  handleProperty={handleCeilingChange}
                />
              </Grid>
              <Grid item xs={4}>
                <SelectProperty
                  title={'Кровля'}
                  value={roof}
                  options={roofOptions}
                  required={true}
                  disabled={view}
                  handleProperty={handleRoofChange}
                />
              </Grid>
              <Grid item xs={4}>
                <NumericProperty
                  title={'Количество спален'}
                  value={bedroomCount}
                  required={true}
                  disabled={view}
                  handleProperty={handleBedroomChange}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectProperty
                  title={'Материал стен'}
                  value={wallMaterial}
                  options={wallMaterialOptions}
                  required={true}
                  disabled={view}
                  handleProperty={handleWallMaterialChange}
                />
              </Grid>
              <Grid item xs={6}>
                <NumericProperty
                  title={'Толщина стен, мм'}
                  value={wallThickness}
                  required={true}
                  disabled={view}
                  handleProperty={handleWallThicknessChange}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectProperty
                  title={'Материал утеплителя'}
                  value={insulation}
                  options={insulationOptions}
                  required={true}
                  disabled={view}
                  handleProperty={handleInsulationChange}
                />
              </Grid>
              <Grid item xs={6}>
                <NumericProperty
                  title={'Толщина утеплителя, мм'}
                  value={insulationThickness}
                  required={true}
                  disabled={view}
                  handleProperty={handleInsulationThicknessChange}
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
                    disabled={view}
                    handleProperty={handleLengthChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <NumericProperty
                    title={'ширина, м'}
                    value={width}
                    required={true}
                    disabled={view}
                    handleProperty={handleWidthChange}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <CheckProperty
                  title={'Гараж'}
                  checked={isGaragePresent}
                  disabled={view}
                  handleProperty={handleGarageChange}
                />
              </Grid>
              <Grid item xs={6}>
                <NumericProperty
                  title={'Количество этажей (включая мансарду и подвал)'}
                  value={floorListLength}
                  required={true}
                  disabled={view}
                  handleProperty={handleFloorNumberChange}
                />
              </Grid>
              {renderFloors()}
            </Grid>
          </div>
          {!view && (
            <Grid item lg={8}>
              <Button variant="contained" color="primary" disabled={isProjectFilled} onClick={saveProject}>
                Сохранить
              </Button>
              <Button variant="outlined" onClick={cancelChanges}>
                Отмена
              </Button>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default ViewAddEditProject;

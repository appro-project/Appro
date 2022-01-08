import React from 'react';
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
import classes from './AddProject.module.scss';
import Button from '../../../components/UI/Button';

interface PropsType {
  handleTitleChange: (value: string) => void;
  handleDescriptionChange: (value: string) => void;
  handleStyleChange: (value: string) => void;
  handleGeneralAreaChange: (event: number | null) => void;
  handleLivingAreaChange: (event: number | null) => void;
  handleBuildingAreaChange: (event: number | null) => void;
  handleTimeToCreateChange: (event: number | null) => void;
  handleImagesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMainImageChange: (event: React.ChangeEvent<any>) => void;
  handleProjectPriceChange: (event: number | null) => void;
  handleBuildingPriceChange: (event: number | null) => void;
  handleLengthChange: (event: number | null) => void;
  handleWidthChange: (event: number | null) => void;
  handleFoundationChange: (value: string) => void;
  handleWallMaterialChange: (value: string) => void;
  handleWallThicknessChange: (event: number | null) => void;
  handleInsulationChange: (value: string) => void;
  handleInsulationThicknessChange: (event: number | null) => void;
  handleCeilingChange: (value: string) => void;
  handleRoofChange: (value: string) => void;
  handleGarageChange: () => void;
  handleBedroomChange: (event: number | null) => void;
  handleFloorNumberChange: (event: number | null) => void;
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
  floorListLength,
}) => {
  return (
    <div style={{ padding: 20 }}>
      <Container>
        <div>
          <h4 className={classes['title']}>Новый проект</h4>
          <div>
            <div>
              <p className={classes['subtitle']}>Основная информация</p>
            </div>
            <div>
              <div className={classes['item__two-in-row']}>
                <TextProperty title={'Название проекта'} value={title} onChange={handleTitleChange} required={true} />
                <TextProperty
                  title={'Описание'}
                  value={description}
                  onChange={handleDescriptionChange}
                  required={true}
                />
              </div>
              <div className={classes['item__two-in-row']}>
                <SelectProperty
                  title={'Стиль'}
                  value={style}
                  options={styleOptions}
                  required={true}
                  handleProperty={handleStyleChange}
                />

                <NumericProperty
                  title={'Общая площадь проекта, кв.м.'}
                  value={generalArea}
                  required={true}
                  onChange={handleGeneralAreaChange}
                />
              </div>
              <div className={classes['item__three-in-row']}>
                <NumericProperty
                  title={'Подготовка проекта, дн'}
                  value={timeToCreate}
                  required={true}
                  onChange={handleTimeToCreateChange}
                />
                <NumericProperty
                  title={'Цена проекта, грн'}
                  value={projectPrice}
                  required={true}
                  onChange={handleProjectPriceChange}
                />

                <NumericProperty
                  title={'Цена строительства, грн'}
                  value={buildingPrice}
                  required={true}
                  onChange={handleBuildingPriceChange}
                />
              </div>
              <div className={classes['item__two-in-row']}>
                <FileProperty
                  title={'Загрузить основное изображения проекта'}
                  required={true}
                  handleProperty={handleMainImageChange}
                />
                <FileProperty
                  title={'Загрузить изображения проекта'}
                  required={true}
                  handleProperty={handleImagesChange}
                />
              </div>
            </div>
            <p className={classes['subtitle']}>Детальная информация</p>
            <div>
              <div className={classes['item__three-in-row']}>
                <NumericProperty
                  title={'Жилая площадь, кв.м.'}
                  value={livingArea}
                  required={true}
                  onChange={handleLivingAreaChange}
                />

                <NumericProperty
                  title={'Площадь застройки, кв.м.'}
                  value={buildingArea}
                  required={true}
                  onChange={handleBuildingAreaChange}
                />

                <SelectProperty
                  title={'Фундамент'}
                  value={foundation}
                  options={foundationOptions}
                  required={true}
                  handleProperty={handleFoundationChange}
                />
              </div>
              <div className={classes['item__three-in-row']}>
                <SelectProperty
                  title={'Перекрытия'}
                  value={ceiling}
                  options={ceilingOptions}
                  required={true}
                  handleProperty={handleCeilingChange}
                />
                <SelectProperty
                  title={'Кровля'}
                  value={roof}
                  options={roofOptions}
                  required={true}
                  handleProperty={handleRoofChange}
                />
                <NumericProperty
                  title={'Количество спален'}
                  value={bedroomCount}
                  required={true}
                  onChange={handleBedroomChange}
                />
              </div>
              <div className={classes['item__two-in-row']}>
                <SelectProperty
                  title={'Материал стен'}
                  value={wallMaterial}
                  options={wallMaterialOptions}
                  required={true}
                  handleProperty={handleWallMaterialChange}
                />
                <NumericProperty
                  title={'Толщина стен, мм'}
                  value={wallThickness}
                  required={true}
                  onChange={handleWallThicknessChange}
                />
              </div>
              <div className={classes['item__two-in-row']}>
                <SelectProperty
                  title={'Материал утеплителя'}
                  value={insulation}
                  options={insulationOptions}
                  required={true}
                  handleProperty={handleInsulationChange}
                />

                <NumericProperty
                  title={'Толщина утеплителя, мм'}
                  value={insulationThickness}
                  required={true}
                  onChange={handleInsulationThicknessChange}
                />
              </div>
              <div className={classes['item__three-in-row']}>
                <p>Габариты застройки</p>
                <NumericProperty title={'длина, м'} value={length} required={true} onChange={handleLengthChange} />
                <NumericProperty title={'ширина, м'} value={width} required={true} onChange={handleWidthChange} />
              </div>
              <CheckProperty title={'Гараж'} checked={isGaragePresent} handleProperty={handleGarageChange} />
              <div className={classes['item__one-in-row']}>
                <NumericProperty
                  title={'Количество этажей (включая мансарду и подвал)'}
                  value={floorListLength}
                  required={true}
                  onChange={handleFloorNumberChange}
                />
              </div>
              {renderFloors()}
            </div>
          </div>
          <div className={classes['item__one-in-row']}>
            <Button title={'Добавить проект'} disabled={isProjectFilled} actionHandler={saveProject} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AddProject;

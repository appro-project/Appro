import React, { useState } from 'react';
import AddProject from './AddProject';
import { FloorDto } from '../../entity/FloorDto';
import FloorRow from './FloorRow';
import { useDispatch, useSelector } from 'react-redux';
import { saveProject } from '../../redux/actions';
import { getProjectSaving } from '../../redux/selectors';
import Loader from '../../components/UI/Loader';
import classes from './Admin.module.scss';

interface State {
  id: number;
  title: string;
  description: string;
  generalArea: number | null;
  timeToCreate: number | null;
  projectPrice: number | null;
  livingArea: number | null;
  buildingArea: number | null;
  wallMaterial: string;
  wallThickness: number | null;
  foundation: string;
  ceiling: string;
  roof: string;
  buildingPrice: number | null;
  mainImage: File | null;
  images: FileList | null;
  insulation: string;
  insulationThickness: number | null;
  length: number | null;
  width: number | null;
  style: string;
  isGaragePresent: boolean;
  bedroomCount: number | null;
  floorList: FloorDto[];
}

const initialState = {
  id: 0,
  title: '',
  description: '',
  generalArea: null,
  timeToCreate: null,
  projectPrice: null,
  livingArea: null,
  buildingArea: null,
  wallMaterial: '',
  wallThickness: null,
  foundation: '',
  ceiling: '',
  roof: '',
  buildingPrice: null,
  images: null,
  mainImage: null,
  insulation: '',
  insulationThickness: null,
  length: null,
  width: null,
  style: '',
  isGaragePresent: false,
  bedroomCount: null,
  floorList: [] as FloorDto[],
};

const Admin = () => {
  const [state, setState] = useState<State>(initialState);
  const projectSaving = useSelector(getProjectSaving);
  const dispatch = useDispatch();

  const handleTitleChange = (value: string) => {
    setState({ ...state, title: value });
  };

  const handleDescriptionChange = (value: string) => {
    setState({ ...state, description: value });
  };

  const handleStyleChange = (value: string) => {
    setState({ ...state, style: value });
  };

  const handleGeneralAreaChange = (value: number | null) => {
    setState({ ...state, generalArea: value });
  };

  const handleLivingAreaChange = (value: number | null) => {
    setState({ ...state, livingArea: value });
  };

  const handleBuildingAreaChange = (value: number | null) => {
    setState({ ...state, buildingArea: value });
  };

  const handleTimeToCreateChange = (value: number | null) => {
    setState({
      ...state,
      timeToCreate: value,
    });
  };

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, images: event.target.files });
  };

  const handleMainImageChange = (event: React.ChangeEvent<any>) => {
    setState({ ...state, mainImage: event.target.files[0] });
  };

  const handleProjectPriceChange = (value: number | null) => {
    setState({ ...state, projectPrice: value });
  };

  const handleBuildingPriceChange = (value: number | null) => {
    setState({ ...state, buildingPrice: value });
  };

  const handleLengthChange = (value: number | null) => {
    setState({ ...state, length: value });
  };

  const handleWidthChange = (value: number | null) => {
    setState({ ...state, width: value });
  };

  const handleFoundationChange = (value: string) => {
    setState({ ...state, foundation: value });
  };

  const handleWallMaterialChange = (value: string) => {
    setState({ ...state, wallMaterial: value });
  };

  const handleWallThicknessChange = (value: number | null) => {
    setState({
      ...state,
      wallThickness: value,
    });
  };

  const handleInsulationChange = (value: string) => {
    setState({ ...state, insulation: value });
  };

  const handleInsulationThicknessChange = (value: number | null) => {
    setState({
      ...state,
      insulationThickness: value,
    });
  };

  const handleCeilingChange = (value: string) => {
    setState({ ...state, ceiling: value });
  };

  const handleRoofChange = (value: string) => {
    setState({ ...state, roof: value });
  };

  const handleGarageChange = () => {
    setState({ ...state, isGaragePresent: !state.isGaragePresent });
  };

  const handleBedroomChange = (value: number | null) => {
    setState({ ...state, bedroomCount: value });
  };

  const handleFloorNumberChange = (value: number | null) => {
    const floorList = [];
    if (value && value < 7) {
      if (value) {
        for (let i = 0; i < value; i = i + 1) {
          floorList.push({
            id: i + 1,
            index: null,
            area: null,
            height: null,
            planningImage: null,
            isAttic: false,
            isBasement: false,
          });
        }
      }
    }
    setState({ ...state, floorList });
  };

  const handleFloorIndexChange = (value: number | null, floorId: number) => {
    const floors = [...state.floorList];
    const index = value;
    floors.filter((i) => i.id === floorId).forEach((i) => (i.index = index));

    setState({ ...state, floorList: floors });
  };

  const handleFloorAtticChange = (floorId: number) => {
    const floors = [...state.floorList];
    floors.filter((i) => i.id === floorId).forEach((i) => (i.isAttic = !i.isAttic));

    setState({ ...state, floorList: floors });
  };

  const handleFloorBasementChange = (floorId: number) => {
    const floors = [...state.floorList];
    floors.filter((i) => i.id === floorId).forEach((i) => (i.isBasement = !i.isBasement));

    setState({ ...state, floorList: floors });
  };

  const handleFloorAreaChange = (value: number | null, floorId: number) => {
    const floors = [...state.floorList];
    const area = value;
    floors.filter((i) => i.id === floorId).forEach((i) => (i.area = area));

    setState({ ...state, floorList: floors });
  };

  const handleFloorHeightChange = (value: number | null, floorId: number) => {
    const floors = [...state.floorList];
    const height = value;
    floors.filter((i) => i.id === floorId).forEach((i) => (i.height = height));

    setState({ ...state, floorList: floors });
  };

  const handleFloorImageChange = (event: React.ChangeEvent<any>, floorId: number) => {
    const floors = [...state.floorList];
    const image = event.target.files[0];
    floors.filter((i) => i.id === floorId).forEach((i) => (i.planningImage = image));

    setState({ ...state, floorList: floors });
  };

  const isProjectFilled = (): boolean => {
    const {
      title,
      generalArea,
      timeToCreate,
      projectPrice,
      livingArea,
      buildingArea,
      wallMaterial,
      wallThickness,
      foundation,
      ceiling,
      roof,
      buildingPrice,
      images,
      insulation,
      insulationThickness,
      length,
      width,
      style,
      bedroomCount,
      floorList,
    } = state;

    return !(
      title &&
      generalArea &&
      timeToCreate &&
      projectPrice &&
      livingArea &&
      buildingArea &&
      wallMaterial &&
      wallThickness &&
      foundation &&
      ceiling &&
      roof &&
      buildingPrice &&
      images &&
      insulation &&
      insulationThickness &&
      length &&
      width &&
      style &&
      bedroomCount &&
      floorList.length > 0
    );
  };

  const renderFloors = () => {
    const floorRows: JSX.Element[] = [];
    const { floorList } = state;
    for (let i = 0; i < floorList.length; i = i + 1) {
      const floor = floorList[i];
      const floorId = i + 1;
      floorRows.push(
        <FloorRow
          floor={floor}
          floorId={floorId}
          handleFloorIndexChange={handleFloorIndexChange}
          handleFloorAtticChange={handleFloorAtticChange}
          handleFloorBasementChange={handleFloorBasementChange}
          handleFloorAreaChange={handleFloorAreaChange}
          handleFloorHeightChange={handleFloorHeightChange}
          handleFloorImageChange={handleFloorImageChange}
        />,
      );
    }
    return floorRows;
  };

  const onSave = () => {
    dispatch(saveProject({ project: state }));
    setState({ ...initialState });
  };

  return (
    <>
      {!projectSaving ? (
        <AddProject
          handleTitleChange={handleTitleChange}
          handleDescriptionChange={handleDescriptionChange}
          handleStyleChange={handleStyleChange}
          handleGeneralAreaChange={handleGeneralAreaChange}
          handleLivingAreaChange={handleLivingAreaChange}
          handleBuildingAreaChange={handleBuildingAreaChange}
          handleTimeToCreateChange={handleTimeToCreateChange}
          handleImagesChange={handleImagesChange}
          handleMainImageChange={handleMainImageChange}
          handleProjectPriceChange={handleProjectPriceChange}
          handleBuildingPriceChange={handleBuildingPriceChange}
          handleLengthChange={handleLengthChange}
          handleWidthChange={handleWidthChange}
          handleFoundationChange={handleFoundationChange}
          handleWallMaterialChange={handleWallMaterialChange}
          handleWallThicknessChange={handleWallThicknessChange}
          handleInsulationChange={handleInsulationChange}
          handleInsulationThicknessChange={handleInsulationThicknessChange}
          handleCeilingChange={handleCeilingChange}
          handleRoofChange={handleRoofChange}
          handleGarageChange={handleGarageChange}
          handleBedroomChange={handleBedroomChange}
          handleFloorNumberChange={handleFloorNumberChange}
          isProjectFilled={isProjectFilled()}
          saveProject={onSave}
          renderFloors={renderFloors}
          title={state.title}
          description={state.description}
          generalArea={state.generalArea}
          timeToCreate={state.timeToCreate}
          projectPrice={state.projectPrice}
          buildingPrice={state.buildingPrice}
          livingArea={state.livingArea}
          buildingArea={state.buildingArea}
          foundation={state.foundation}
          ceiling={state.ceiling}
          roof={state.roof}
          bedroomCount={state.bedroomCount}
          wallMaterial={state.wallMaterial}
          wallThickness={state.wallThickness}
          insulation={state.insulation}
          insulationThickness={state.insulationThickness}
          length={state.length}
          width={state.width}
          isGaragePresent={state.isGaragePresent}
          style={state.style}
          floorListLength={state.floorList.length}
        />
      ) : (
        <div className={classes['container-loader']}>
          <Loader />
        </div>
      )}
    </>
  );
};

export default Admin;

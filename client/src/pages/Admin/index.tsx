import React, { useState } from 'react';
import AddProject from './AddProject';
import { FloorDto } from '../../entity/FloorDto';
import FloorRow from './FloorRow';
import { connect, useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { ThunkDispatch } from 'redux-thunk';
import { saveProject } from '../../redux/actions';
import { CircularProgress } from '@material-ui/core';
import { getProjectSaving } from '../../redux/selectors';

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

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, title: event.target.value });
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, description: event.target.value });
  };

  const handleStyleChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    setState({ ...state, style: event.target.value as string });
  };

  const handleGeneralAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, generalArea: event.target.value as unknown as number });
  };

  const handleLivingAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, livingArea: event.target.value as unknown as number });
  };

  const handleBuildingAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, buildingArea: event.target.value as unknown as number });
  };

  const handleTimeToCreateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      timeToCreate: event.target.value as unknown as number,
    });
  };

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, images: event.target.files });
  };

  const handleMainImageChange = (event: React.ChangeEvent<any>) => {
    setState({ ...state, mainImage: event.target.files[0] });
  };

  const handleProjectPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, projectPrice: event.target.value as unknown as number });
  };

  const handleBuildingPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, buildingPrice: event.target.value as unknown as number });
  };

  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, length: event.target.value as unknown as number });
  };

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, width: event.target.value as unknown as number });
  };

  const handleFoundationChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    setState({ ...state, foundation: event.target.value as string });
  };

  const handleWallMaterialChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    setState({ ...state, wallMaterial: event.target.value as string });
  };

  const handleWallThicknessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      wallThickness: event.target.value as unknown as number,
    });
  };

  const handleInsulationChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    setState({ ...state, insulation: event.target.value as string });
  };

  const handleInsulationThicknessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      insulationThickness: event.target.value as unknown as number,
    });
  };

  const handleCeilingChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState({ ...state, ceiling: event.target.value as string });
  };

  const handleRoofChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    setState({ ...state, roof: event.target.value as string });
  };

  const handleGarageChange = () => {
    setState({ ...state, isGaragePresent: !state.isGaragePresent });
  };

  const handleBedroomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, bedroomCount: event.target.value as unknown as number });
  };

  const handleFloorNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as unknown as number;
    const floorList = [];
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
    setState({ ...state, floorList });
  };

  const handleFloorIndexChange = (event: React.ChangeEvent<any>, floorId: number) => {
    const floors = [...state.floorList];
    const index = event.target.value;
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

  const handleFloorAreaChange = (event: React.ChangeEvent<any>, floorId: number) => {
    const floors = [...state.floorList];
    const area = event.target.value;
    floors.filter((i) => i.id === floorId).forEach((i) => (i.area = area));

    setState({ ...state, floorList: floors });
  };

  const handleFloorHeightChange = (event: React.ChangeEvent<any>, floorId: number) => {
    const floors = [...state.floorList];
    const height = event.target.value;
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
        <CircularProgress />
      )}
    </>
  );
};

export default Admin;

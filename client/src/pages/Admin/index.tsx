import React from 'react';
import AddProject from './AddProject';
import {FloorDto} from "../../entity/FloorDto";
import {addProject} from "./service";
import FloorRow from "./FloorRow";

interface State {
    id: string;
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
    id: '',
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

class Admin extends React.Component<{}, State> {
    state = initialState;

    handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, title: event.target.value});
    }

    handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, description: event.target.value});
    }

    handleStyleChange = (event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => {
        this.setState({...this.state, style: event.target.value as string});
    }

    handleGeneralAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, generalArea: event.target.value as unknown as number});
    }

    handleLivingAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, livingArea: event.target.value as unknown as number});
    }

    handleBuildingAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, buildingArea: event.target.value as unknown as number});
    }

    handleTimeToCreateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            timeToCreate: event.target.value as unknown as number,
        });
    }

    handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, images: event.target.files});
    }

    handleMainImageChange = (event: React.ChangeEvent<any>) => {
        this.setState({...this.state, mainImage: event.target.files[0]});
    }

    handleProjectPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, projectPrice: event.target.value as unknown as number});
    }

    handleBuildingPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, buildingPrice: event.target.value as unknown as number});
    }

    handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, length: event.target.value as unknown as number});
    }

    handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, width: event.target.value as unknown as number});
    }

    handleFoundationChange = (event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => {
        this.setState({...this.state, foundation: event.target.value as string});
    }

    handleWallMaterialChange = (event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => {
        this.setState({...this.state, wallMaterial: event.target.value as string});
    }

    handleWallThicknessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            wallThickness: event.target.value as unknown as number,
        });
    }

    handleInsulationChange = (event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => {
        this.setState({...this.state, insulation: event.target.value as string});
    }

    handleInsulationThicknessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            insulationThickness: event.target.value as unknown as number,
        });
    }

    handleCeilingChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.setState({...this.state, ceiling: event.target.value as string});
    }

    handleRoofChange = (event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => {
        this.setState({...this.state, roof: event.target.value as string});
    }

    handleGarageChange = () => {
        this.setState({...this.state, isGaragePresent: !this.state.isGaragePresent});
    }

    handleBedroomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, bedroomCount: event.target.value as unknown as number});
    }

    handleFloorNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        this.setState({...this.state, floorList});
    }

    handleFloorIndexChange = (event: React.ChangeEvent<any>, floorId: number) => {
        const floors = [...this.state.floorList];
        const index = event.target.value;
        floors.filter(i => i.id === floorId).forEach(i => i.index = index);

        this.setState({...this.state, floorList: floors});
    }

    handleFloorAtticChange = (floorId: number) => {
        const floors = [...this.state.floorList];
        floors.filter(i => i.id === floorId).forEach(i => i.isAttic = !i.isAttic);

        this.setState({...this.state, floorList: floors});
    }

    handleFloorBasementChange = (floorId: number) => {
        const floors = [...this.state.floorList];
        floors.filter(i => i.id === floorId).forEach(i => i.isBasement = !i.isBasement);

        this.setState({...this.state, floorList: floors});
    }

    handleFloorAreaChange = (event: React.ChangeEvent<any>, floorId: number) => {
        const floors = [...this.state.floorList];
        const area = event.target.value;
        floors.filter(i => i.id === floorId).forEach(i => i.area = area);

        this.setState({...this.state, floorList: floors});
    }

    handleFloorHeightChange = (event: React.ChangeEvent<any>, floorId: number) => {
        const floors = [...this.state.floorList];
        const height = event.target.value;
        floors
            .filter(i => i.id === floorId)
            .forEach(i => i.height = height);

        this.setState({...this.state, floorList: floors});
    }

    handleFloorImageChange = (event: React.ChangeEvent<any>, floorId: number) => {
        const floors = [...this.state.floorList];
        const image = event.target.files[0];
        floors
            .filter(i => i.id === floorId)
            .forEach(i => i.planningImage = image);

        this.setState({...this.state, floorList: floors});
    }

    isProjectFilled = (): boolean => {
        const {
            title, generalArea, timeToCreate, projectPrice, livingArea,
            buildingArea, wallMaterial, wallThickness, foundation, ceiling,
            roof, buildingPrice, images, insulation, insulationThickness,
            length, width, style, bedroomCount, floorList
        } = this.state;

        return !(title && generalArea && timeToCreate && projectPrice && livingArea &&
            buildingArea && wallMaterial && wallThickness && foundation && ceiling &&
            roof && buildingPrice && images && insulation && insulationThickness &&
            length && width && style && bedroomCount && floorList.length > 0);
    }

    renderFloors = () => {
        const floorRows: JSX.Element[] = [];
        const {floorList} = this.state;
        for (let i = 0; i < floorList.length; i = i + 1) {
            const floor = floorList[i];
            const floorId = i + 1;
            floorRows.push(<FloorRow floor={floor}
                                     floorId={floorId}
                                     isFloorIndexDisabled={this.isFloorIndexDisabled}
                                     isFloorAtticDisabled={this.isFloorAtticDisabled}
                                     isFloorBasementDisabled={this.isFloorBasementDisabled}
                                     handleFloorIndexChange={this.handleFloorIndexChange}
                                     handleFloorAtticChange={this.handleFloorAtticChange}
                                     handleFloorBasementChange={this.handleFloorBasementChange}
                                     handleFloorAreaChange={this.handleFloorAreaChange}
                                     handleFloorHeightChange={this.handleFloorHeightChange}
                                     handleFloorImageChange={this.handleFloorImageChange}
                />
            );
        }
        return floorRows;
    }

    isFloorIndexDisabled = (floorId: number) => {
        const {floorList} = this.state;
        const floor = floorList
            .find(i => i.id === floorId);
        if (!floor) return false;

        return floor.isAttic || floor.isBasement;
    }

    isFloorAtticDisabled = (floorId: number) => {
        const {floorList} = this.state;
        const floor = floorList
            .find(i => i.id === floorId);
        if (!floor) return false;

        return !!floor.index || floor.isBasement;
    }

    isFloorBasementDisabled = (floorId: number) => {
        const {floorList} = this.state;
        const floor = floorList
            .find(i => i.id === floorId);
        if (!floor) return false;

        return !!floor.index || floor.isAttic;
    }

    saveProject = () => {
        addProject(this.state);
        this.setState({...initialState});
    }

    render() {
        const isProjectFilled = this.isProjectFilled();
        const floorRows = this.renderFloors();
        return <AddProject handleTitleChange={this.handleTitleChange}
                           handleDescriptionChange={this.handleDescriptionChange}
                           handleStyleChange={this.handleStyleChange}
                           handleGeneralAreaChange={this.handleGeneralAreaChange}
                           handleLivingAreaChange={this.handleLivingAreaChange}
                           handleBuildingAreaChange={this.handleBuildingAreaChange}
                           handleTimeToCreateChange={this.handleTimeToCreateChange}
                           handleImagesChange={this.handleImagesChange}
                           handleMainImageChange={this.handleMainImageChange}
                           handleProjectPriceChange={this.handleProjectPriceChange}
                           handleBuildingPriceChange={this.handleBuildingPriceChange}
                           handleLengthChange={this.handleLengthChange}
                           handleWidthChange={this.handleWidthChange}
                           handleFoundationChange={this.handleFoundationChange}
                           handleWallMaterialChange={this.handleWallMaterialChange}
                           handleWallThicknessChange={this.handleWallThicknessChange}
                           handleInsulationChange={this.handleInsulationChange}
                           handleInsulationThicknessChange={this.handleInsulationThicknessChange}
                           handleCeilingChange={this.handleCeilingChange}
                           handleRoofChange={this.handleRoofChange}
                           handleGarageChange={this.handleGarageChange}
                           handleBedroomChange={this.handleBedroomChange}
                           handleFloorNumberChange={this.handleFloorNumberChange}
                           isProjectFilled={isProjectFilled}
                           saveProject={this.saveProject}
                           floorRows={floorRows}
                           title={this.state.title}
                           description={this.state.description}
                           generalArea={this.state.generalArea}
                           timeToCreate={this.state.timeToCreate}
                           projectPrice={this.state.projectPrice}
                           buildingPrice={this.state.buildingPrice}
                           livingArea={this.state.livingArea}
                           buildingArea={this.state.buildingArea}
                           foundation={this.state.foundation}
                           ceiling={this.state.ceiling}
                           roof={this.state.roof}
                           bedroomCount={this.state.bedroomCount}
                           wallMaterial={this.state.wallMaterial}
                           wallThickness={this.state.wallThickness}
                           insulation={this.state.insulation}
                           insulationThickness={this.state.insulationThickness}
                           length={this.state.length}
                           width={this.state.width}
                           isGaragePresent={this.state.isGaragePresent}
                           style={this.state.style}
                           floorListLength={this.state.floorList.length}
        />;
    }
}

export default Admin;
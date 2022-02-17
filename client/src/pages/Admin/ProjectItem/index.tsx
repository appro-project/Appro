import React from 'react';
import ViewAddEditProject from '../ViewAddEditProject';
import { FloorDto } from "../../../entity/FloorDto";
import FloorRow from "../FloorRow";
import { getProjectSaving, RootState } from "../../../reducers";
import { Action, compose } from "redux";
import { connect } from "react-redux";
// @ts-ignore
import { ThunkDispatch } from "redux-thunk";
import { deleteImages, deleteProject, saveProject, updateProject } from "../../../actions";
import { Button, CircularProgress, List } from "@material-ui/core";
import { RouteComponentProps, Router, useParams, withRouter } from "react-router";
import { match } from "react-router-dom";
import { axiosGetProjectById } from "../../../services/server-data";
import { Project } from "../../../entity/Project";
import classes from './ProjectItem.module.scss';

interface State {
    id?: number;
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
    mainImage: File | string | null;
    images: string[] | null;
    insulation: string;
    insulationThickness: number | null;
    length: number | null;
    width: number | null;
    style: string;
    isGaragePresent: boolean;
    bedroomCount: number | null;
    floorList: FloorDto[];
    edit?: boolean;
    add?: boolean;
    imagesToDelete: string[];
    imagesToAdd: FileList | null;
}

const initialState = {
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
    edit: false,
    add: false,
    imagesToDelete: [],
    imagesToAdd: null,
};

interface StateProps {
    projectSaving: boolean;
}

interface DispatchProps {
    saveProject(project: any): void;
    
    updateProject(project: any): void;
    
    deleteProject(projectId: number): void;
    
    deleteImages(images: string[]): void;
}

interface Props {
    project?: Project;
}

type PropsType = StateProps & DispatchProps & Props;

class ProjectItem extends React.Component<PropsType, State> {
    state = initialState;
    
    componentDidMount() {
        const { project } = this.props;
        console.log("projet", project)
        if (project) {
            this.setState({ ...this.state, ...project });
        } else {
            this.setState({ ...this.state, add: true });
        }
    }
    
    handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, title: event.target.value });
    }
    
    handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, description: event.target.value });
    }
    
    handleStyleChange = (event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => {
        this.setState({ ...this.state, style: event.target.value as string });
    }
    
    handleGeneralAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, generalArea: event.target.value as unknown as number });
    }
    
    handleLivingAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, livingArea: event.target.value as unknown as number });
    }
    
    handleBuildingAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, buildingArea: event.target.value as unknown as number });
    }
    
    handleTimeToCreateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            timeToCreate: event.target.value as unknown as number,
        });
    }
    
    handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, imagesToAdd: event.target.files });
    }
    
    handleImageRemove = (imageSrc: string) => {
        const { images, imagesToDelete } = this.state;
        if (images) {
            // @ts-ignore - images are not null, checked above
            const newImages = images.filter((i: string) => i !== imageSrc);
            imagesToDelete.push(imageSrc)
            this.setState({ ...this.state, images: newImages, imagesToDelete })
        }
    }
    
    handleMainImageChange = (event: React.ChangeEvent<any>) => {
        this.setState({ ...this.state, mainImage: event.target.files[0] });
    }
    
    handleMainImageRemove = () => {
        const { mainImage, imagesToDelete } = this.state;
        imagesToDelete.push(mainImage)
        this.setState({ ...this.state, mainImage: null, imagesToDelete });
    }
    
    handleProjectPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, projectPrice: event.target.value as unknown as number });
    }
    
    handleBuildingPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, buildingPrice: event.target.value as unknown as number });
    }
    
    handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, length: event.target.value as unknown as number });
    }
    
    handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, width: event.target.value as unknown as number });
    }
    
    handleFoundationChange = (event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => {
        this.setState({ ...this.state, foundation: event.target.value as string });
    }
    
    handleWallMaterialChange = (event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => {
        this.setState({ ...this.state, wallMaterial: event.target.value as string });
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
        this.setState({ ...this.state, insulation: event.target.value as string });
    }
    
    handleInsulationThicknessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            insulationThickness: event.target.value as unknown as number,
        });
    }
    
    handleCeilingChange = (event: React.ChangeEvent<{value: unknown}>) => {
        this.setState({ ...this.state, ceiling: event.target.value as string });
    }
    
    handleRoofChange = (event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => {
        this.setState({ ...this.state, roof: event.target.value as string });
    }
    
    handleGarageChange = () => {
        this.setState({ ...this.state, isGaragePresent: !this.state.isGaragePresent });
    }
    
    handleBedroomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, bedroomCount: event.target.value as unknown as number });
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
        this.setState({ ...this.state, floorList });
    }
    
    handleFloorIndexChange = (event: React.ChangeEvent<any>, floorId: number) => {
        const floors = [...this.state.floorList];
        const index = event.target.value;
        floors.filter(i => i.id === floorId).forEach(i => i.index = index);
        
        this.setState({ ...this.state, floorList: floors });
    }
    
    handleFloorAtticChange = (floorId: number) => {
        const floors = [...this.state.floorList];
        floors.filter(i => i.id === floorId).forEach(i => i.isAttic = !i.isAttic);
        
        this.setState({ ...this.state, floorList: floors });
    }
    
    handleFloorBasementChange = (floorId: number) => {
        const floors = [...this.state.floorList];
        floors.filter(i => i.id === floorId).forEach(i => i.isBasement = !i.isBasement);
        
        this.setState({ ...this.state, floorList: floors });
    }
    
    handleFloorAreaChange = (event: React.ChangeEvent<any>, floorId: number) => {
        const floors = [...this.state.floorList];
        const area = event.target.value;
        floors.filter(i => i.id === floorId).forEach(i => i.area = area);
        
        this.setState({ ...this.state, floorList: floors });
    }
    
    handleFloorHeightChange = (event: React.ChangeEvent<any>, floorId: number) => {
        const floors = [...this.state.floorList];
        const height = event.target.value;
        floors
            .filter(i => i.id === floorId)
            .forEach(i => i.height = height);
        
        this.setState({ ...this.state, floorList: floors });
    }
    
    handleFloorImageChange = (event: React.ChangeEvent<any>, floorId: number) => {
        const floors = [...this.state.floorList];
        const image = event.target.files[0];
        floors
            .filter(i => i.id === floorId)
            .forEach(i => i.planningImage = image);
        
        this.setState({ ...this.state, floorList: floors });
    }
    
    handleFloorImageRemove = (floorId: number | null) => {
        const floors = [...this.state.floorList];
        const floor = floors
            .find(i => i.id === floorId);
        console.log(floors, floorId)
        
        if (!floor) {
            return;
        }
        const { imagesToDelete } = this.state;
        const floorImageToDelete = floor.planningImage;
        imagesToDelete.push(floorImageToDelete);
        floor.planningImage = null;

        this.setState({ ...this.state, floorList: floors, imagesToDelete });
    }
    
    handleDeleteFloorClick = (floorId: number | null) => {
        const newFloors = this.state.floorList.filter(f => f.id !== floorId)
        
        this.setState({ ...this.state, floorList: newFloors });
    }
    
    isProjectFilled = (): boolean => {
        const {
            title, generalArea, timeToCreate, projectPrice, livingArea,
            buildingArea, wallMaterial, wallThickness, foundation, ceiling,
            roof, buildingPrice, images, insulation, insulationThickness,
            length, width, style, bedroomCount, floorList,
        } = this.state;
        
        return !(title && generalArea && timeToCreate && projectPrice && livingArea &&
            buildingArea && wallMaterial && wallThickness && foundation && ceiling &&
            roof && buildingPrice && insulation && insulationThickness &&
            length && width && style && bedroomCount && floorList.length > 0);
    }
    
    renderFloors = (view: boolean) => {
        const floorRows: JSX.Element[] = [];
        const { floorList, add } = this.state;
        for (let i = 0; i < floorList.length; i = i + 1) {
            const floor = floorList[i];
            const floorId = i + 1;
            floorRows.push(
                <> <FloorRow
                    view={ view }
                    id={ floor.id || floorId }
                    index={ floor.index }
                    area={ floor.area }
                    height={ floor.height }
                    planningImage={ add ? null : floor.planningImage }
                    isAttic={ floor.isAttic }
                    isBasement={ floor.isBasement }
                    handleFloorIndexChange={ this.handleFloorIndexChange }
                    handleFloorAtticChange={ this.handleFloorAtticChange }
                    handleFloorBasementChange={ this.handleFloorBasementChange }
                    handleFloorAreaChange={ this.handleFloorAreaChange }
                    handleFloorHeightChange={ this.handleFloorHeightChange }
                    handleFloorImageChange={ this.handleFloorImageChange }
                    handleFloorImageRemove={ this.handleFloorImageRemove }
                />
                    
                    { (this.state.edit || this.state.add) &&
                    <Button variant="contained"
                            color="primary"
                            onClick={ () => this.handleDeleteFloorClick(floor.id) }>
                        Удалить
                    </Button> }
                </>,
            );
        }
        return floorRows;
    }
    
    saveProject = () => {
        if (this.state.edit) {
            this.props.updateProject(this.state);
            this.setState({ ...this.state, edit: false });
            
        } else if (this.state.add) {
            this.props.saveProject(this.state);
            this.setState({ ...initialState });
        }
    }
    
    cancelChanges = () => {
        const { project } = this.props;
        const { edit } = this.state;
        if (edit) {
            this.setState({ ...this.state, edit: !edit, ...project })
        } else {
            this.setState({ ...initialState });
        }
    }
    
    handleEditProjectClick = () => {
        const { edit } = this.state;
        
        this.setState({ ...this.state, edit: !edit })
    }
    
    handleDeleteProjectClick = () => {
        const { project } = this.props;
        if (project) {
            this.props.deleteProject(project.id);
            const imagesToDelete = new Set([project.mainImage]);
            if (project.images) {
                project.images.forEach(img => imagesToDelete.add(img))
            }
            if (project.floorList) {
                const floorImages = project.floorList
                    .map(floor => floor.planningImage)
                    .filter(img => img !== null)
                    // @ts-ignore - null is filtered
                    .forEach(img => imagesToDelete.add(img));
            }
            this.props.deleteImages(Array.from(imagesToDelete));
        }
    }
    
    render() {
        const projectId = this.props.project?.id;
        const { projectSaving } = this.props;
        const isProjectFilled = this.isProjectFilled();
        const { add, edit } = this.state;
        const viewProject = !(add || edit);
        return <>
            { !projectSaving
                ?
                <>
                    { (projectId) &&
                    <div className={ classes['button-group'] }>
                        <Button variant="contained" color="primary"
                                onClick={ this.handleEditProjectClick }>
                            Редактировать
                        </Button>
                        <Button variant="contained" color="primary"
                                onClick={ this.handleDeleteProjectClick }>
                            Удалить
                        </Button>
                    </div>
                    }
                    <ViewAddEditProject
                        add={ add }
                        edit={ edit }
                        handleTitleChange={ this.handleTitleChange }
                        handleDescriptionChange={ this.handleDescriptionChange }
                        handleStyleChange={ this.handleStyleChange }
                        handleGeneralAreaChange={ this.handleGeneralAreaChange }
                        handleLivingAreaChange={ this.handleLivingAreaChange }
                        handleBuildingAreaChange={ this.handleBuildingAreaChange }
                        handleTimeToCreateChange={ this.handleTimeToCreateChange }
                        handleImagesChange={ this.handleImagesChange }
                        handleImageRemove={ this.handleImageRemove }
                        handleMainImageChange={ this.handleMainImageChange }
                        handleMainImageRemove={ this.handleMainImageRemove }
                        handleProjectPriceChange={ this.handleProjectPriceChange }
                        handleBuildingPriceChange={ this.handleBuildingPriceChange }
                        handleLengthChange={ this.handleLengthChange }
                        handleWidthChange={ this.handleWidthChange }
                        handleFoundationChange={ this.handleFoundationChange }
                        handleWallMaterialChange={ this.handleWallMaterialChange }
                        handleWallThicknessChange={ this.handleWallThicknessChange }
                        handleInsulationChange={ this.handleInsulationChange }
                        handleInsulationThicknessChange={ this.handleInsulationThicknessChange }
                        handleCeilingChange={ this.handleCeilingChange }
                        handleRoofChange={ this.handleRoofChange }
                        handleGarageChange={ this.handleGarageChange }
                        handleBedroomChange={ this.handleBedroomChange }
                        handleFloorNumberChange={ this.handleFloorNumberChange }
                        isProjectFilled={ isProjectFilled }
                        saveProject={ this.saveProject }
                        cancelChanges={ this.cancelChanges }
                        renderFloors={ () => this.renderFloors(viewProject) }
                        id={ Number(projectId) }
                        title={ this.state.title }
                        description={ this.state.description }
                        generalArea={ this.state.generalArea }
                        timeToCreate={ this.state.timeToCreate }
                        projectPrice={ this.state.projectPrice }
                        buildingPrice={ this.state.buildingPrice }
                        livingArea={ this.state.livingArea }
                        buildingArea={ this.state.buildingArea }
                        foundation={ this.state.foundation }
                        ceiling={ this.state.ceiling }
                        roof={ this.state.roof }
                        bedroomCount={ this.state.bedroomCount }
                        wallMaterial={ this.state.wallMaterial }
                        wallThickness={ this.state.wallThickness }
                        insulation={ this.state.insulation }
                        insulationThickness={ this.state.insulationThickness }
                        length={ this.state.length }
                        width={ this.state.width }
                        isGaragePresent={ this.state.isGaragePresent }
                        style={ this.state.style }
                        mainImage={ this.state.mainImage }
                        images={ this.state.images }
                        floorListLength={ this.state.floorList.length }/>
                </>
                : <CircularProgress/>
            }</>;
    }
    
    
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        projectSaving: getProjectSaving(state),
    }
}

export default compose(connect<StateProps, DispatchProps, {}, RootState>(mapStateToProps,
    (dispatch: ThunkDispatch<RootState, void, Action>): DispatchProps => ({
        saveProject: (project: any) => dispatch(saveProject(project)),
        updateProject: (project: any) => dispatch(updateProject(project)),
        deleteProject: (projectId: number) => dispatch(deleteProject({ projectId })),
        deleteImages: (images: string[]) => dispatch(deleteImages({ images })),
    }),
), withRouter)(ProjectItem);


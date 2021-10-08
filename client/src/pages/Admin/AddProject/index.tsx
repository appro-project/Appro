import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import { Button, DialogTitle, Grid, Typography } from '@material-ui/core';
import TextProperty from './TextProperty';
import SelectProperty from './SelectProperty';
import NumericProperty from './NumericProperty';
import FileProperty from './FileProperty';
import CheckProperty from './CheckProperty';
import { addProject } from '../service';
import Container from '../../../containers/hoc/Container';
import {
    ceilingOptions,
    foundationOptions,
    insulationOptions,
    roofOptions,
    styleOptions,
    wallMaterialOptions,
} from '../constants';

interface FloorDto{
    id: number;
    index: number | null;
    area: number | null;
    height: number | null;
    planningImage: File | null;
    isAttic: boolean;
    isBasement: boolean;
}
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

class AddProject extends Component<{}, State> {
    state = initialState;

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
        this.setState({ ...this.state, images: event.target.files });
    }

    handleMainImageChange = (event: React.ChangeEvent<any>) => {
        this.setState({ ...this.state, mainImage: event.target.files[0] });
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

    handleCeilingChange = (event: React.ChangeEvent<{ value: unknown }>) => {
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

    isProjectFilled = (): boolean => {
        const {
            title, generalArea, timeToCreate, projectPrice, livingArea,
            buildingArea, wallMaterial, wallThickness, foundation, ceiling,
            roof, buildingPrice, images, insulation, insulationThickness,
        length, width, style, bedroomCount, floorList} = this.state;

        return !(title && generalArea && timeToCreate && projectPrice && livingArea &&
            buildingArea && wallMaterial && wallThickness && foundation && ceiling &&
            roof && buildingPrice && images && insulation && insulationThickness &&
            length && width && style && bedroomCount && floorList.length > 0);
    }

    saveProject = () => {
        addProject(this.state);
        this.setState({ ...initialState });
    }

    render() {
        return <div style={ { padding: 20 } }>
            <Container>
            <Grid container spacing={ 3 } justifyContent="center"
                  alignItems="center">
                <Grid item xs={ 12 }>
                    <Typography variant="h4" gutterBottom align="center">Новый проект</Typography>
                </Grid>
                <div>
                    <div>
                        <DialogTitle>
                            Основная информация</DialogTitle>
                    </div>
                    <Grid item xs={ 12 } container spacing={ 5 }>
                        <Grid item xs={ 6 }>
                            <TextProperty
                                title={ 'Название проекта' }
                                value={ this.state.title }
                                handleProperty={ this.handleTitleChange }
                                required={ true }/>
                        </Grid>
                        <Grid item xs={ 6 }>
                            <TextProperty
                                title={ 'Описание' }
                                value={ this.state.description }
                                handleProperty={ this.handleDescriptionChange }
                                required={ true }/>
                        </Grid>
                        <Grid item xs={ 6 }>
                            <SelectProperty
                                title={ 'Стиль' }
                                value={ this.state.style }
                                options={ styleOptions }
                                required={ true }
                                handleProperty={ this.handleStyleChange }/>
                        </Grid>
                        <Grid item xs={ 6 }>
                            <NumericProperty
                                title={ 'Общая площадь проекта, кв.м.' }
                                value={ this.state.generalArea }
                                required={ true }
                                handleProperty={ this.handleGeneralAreaChange }/>
                        </Grid>
                        <Grid item xs={ 4 }>
                            <NumericProperty
                                title={ 'Подготовка проекта, дн' }
                                value={ this.state.timeToCreate }
                                required={ true }
                                handleProperty={ this.handleTimeToCreateChange }/>
                        </Grid>
                        <Grid item xs={ 4 }>
                            <NumericProperty
                                title={ 'Цена проекта, грн' }
                                value={ this.state.projectPrice }
                                required={ true }
                                handleProperty={ this.handleProjectPriceChange }/>
                        </Grid>
                        <Grid item xs={ 4 }>
                            <NumericProperty
                                title={ 'Цена строительства, грн' }
                                value={ this.state.buildingPrice }
                                required={ true }
                                handleProperty={ this.handleBuildingPriceChange }/>
                        </Grid>
                        <Grid item xs={ 6 }>
                            <FileProperty
                                title={ 'Загрузить основное изображения проекта' }
                                required={ true }
                                handleProperty={ this.handleMainImageChange }/>
                        </Grid>
                        <Grid item xs={ 6 }>
                            <FileProperty
                                title={ 'Загрузить изображения проекта' }
                                required={ true }
                                multiple={ true }
                                handleProperty={ this.handleImagesChange }/>
                        </Grid>
                    </Grid>
                    <DialogTitle style={ { paddingTop: '20px' } }>
                        Детальная информация</DialogTitle>
                    <Grid container spacing={ 2 }>
                        <Grid item xs={ 4 }>
                            <NumericProperty
                                title={ 'Жилая площадь, кв.м.' }
                                value={ this.state.livingArea }
                                required={ true }
                                handleProperty={ this.handleLivingAreaChange }/>
                        </Grid>
                        <Grid item xs={ 4 }>
                            <NumericProperty
                                title={ 'Площадь застройки, кв.м.' }
                                value={ this.state.buildingArea }
                                required={ true }
                                handleProperty={ this.handleBuildingAreaChange }/>
                        </Grid>
                        <Grid item xs={ 4 }>
                            <SelectProperty
                                title={ 'Фундамент' }
                                value={ this.state.foundation }
                                options={ foundationOptions }
                                required={ true }
                                handleProperty={ this.handleFoundationChange }
                            />
                        </Grid>
                        <Grid item xs={ 4 }>
                            <SelectProperty
                                title={ 'Перекрытия' }
                                value={ this.state.ceiling }
                                options={ ceilingOptions }
                                required={ true }
                                handleProperty={ this.handleCeilingChange }/>
                        </Grid>
                        <Grid item xs={ 4 }>
                            <SelectProperty title={ 'Кровля' }
                                            value={ this.state.roof }
                                            options={ roofOptions }
                                            required={ true }
                                            handleProperty={ this.handleRoofChange }
                            />
                        </Grid>
                        <Grid item xs={ 4 }>
                            <NumericProperty title={ 'Количество спален' }
                                             value={ this.state.bedroomCount }
                                             required={ true }
                                             handleProperty={ this.handleBedroomChange }
                            />
                        </Grid>
                        <Grid item xs={ 6 }>
                            <SelectProperty
                                title={ 'Материал стен' }
                                value={ this.state.wallMaterial }
                                options={ wallMaterialOptions }
                                required={ true }
                                handleProperty={ this.handleWallMaterialChange }
                            />
                        </Grid>
                        <Grid item xs={ 6 }>
                            <NumericProperty
                                title={ 'Толщина стен, мм' }
                                value={ this.state.wallThickness }
                                required={ true }
                                handleProperty={ this.handleWallThicknessChange }
                            />
                        </Grid>
                        <Grid item xs={ 6 }>
                            <SelectProperty title={ 'Материал утеплителя' }
                                            value={ this.state.insulation }
                                            options={ insulationOptions }
                                            required={ true }
                                            handleProperty={
                                                this.handleInsulationChange }
                            />
                        </Grid>
                        <Grid item xs={ 6 }>
                            <NumericProperty title={ 'Толщина утеплителя, мм' }
                                             value={ this.state.insulationThickness }
                                             required={ true }
                                             handleProperty={
                                                 this.handleInsulationThicknessChange }
                            />
                        </Grid>
                        <Grid item xs={ 12 } container spacing={ 2 }>
                            <Grid item xs={ 2 }>
                                <InputLabel>Габариты застройки</InputLabel>
                            </Grid>
                            <Grid item xs={ 2 }>
                                <NumericProperty
                                    title={ 'длина, м' }
                                    value={ this.state.length }
                                    required={ true }
                                    handleProperty={ this.handleLengthChange }/>
                            </Grid>
                            <Grid item xs={ 2 }>
                                <NumericProperty
                                    title={ 'ширина, м' }
                                    value={ this.state.width }
                                    required={ true }
                                    handleProperty={ this.handleWidthChange }/>
                            </Grid>

                        </Grid>
                        <Grid item xs={ 12 }>
                            <CheckProperty title={ 'Гараж' }
                                           checked={ this.state.isGaragePresent }
                                           handleProperty={ this.handleGarageChange }
                            />
                        </Grid>
                        <Grid item xs={ 6 }>
                            <NumericProperty
                                title={ 'Количество этажей (включая мансарду и подвал)' }
                                value={ this.state.floorList.length }
                                required={ true }
                                handleProperty={ this.handleFloorNumberChange }/>
                        </Grid>
                        { this.renderFloors() }
                    </Grid>
                </div>
                <Grid item lg={ 8 }>
                    <Button variant="contained"
                            color="primary"
                            disabled={ this.isProjectFilled() }
                            onClick={ this.saveProject }>
                        Добавить проект
                    </Button>
                </Grid>
            </Grid>
            </Container>
        </div>;
    }

    private renderFloors() {
        const floorRows = [];
        const { floorList } = this.state;
        for (let i = 0; i < floorList.length; i = i + 1) {
            const floor = floorList[i];
            const floorId = i + 1;
            floorRows.push(
                <Grid item xs={ 12 } container spacing={ 2 } key={ `floor-${floorId}` }>
                    <Grid item xs={ 4 }>
                        <NumericProperty
                            title={ 'Номер этажа' }
                            value={ floor.index }
                            disabled={ this.isFloorIndexDisabled(floorId) }
                            handleProperty={ (event: React.ChangeEvent<any>) =>
                                this.handleFloorIndexChange(event, floorId) }/>
                    </Grid>
                    <Grid item xs={ 4 }>
                        <CheckProperty title={ 'Мансарда' }
                                   checked={ floor.isAttic }
                                       disabled={ this.isFloorAtticDisabled(floorId) }
                                   handleProperty={ () =>
                                       this.handleFloorAtticChange(floorId) }
                    />
                    </Grid>
                    <Grid item xs={ 4 }>
                    <CheckProperty title={ 'Подвал' }
                                   checked={ floor.isBasement }
                                   disabled={ this.isFloorBasementDisabled(floorId) }
                                   handleProperty={ () =>
                                       this.handleFloorBasementChange(floorId) }
                    />
                    </Grid>
                    <Grid item xs={ 4 }>
                        <NumericProperty
                            title={ 'Площадь, м2' }
                            value={ floor.area }
                            handleProperty={ (event: React.ChangeEvent<any>) =>
                                this.handleFloorAreaChange(event, floorId) }/>
                    </Grid>
                    <Grid item xs={ 4 }>
                        <NumericProperty
                            title={ 'Высота, м' }
                            value={ floor.height }
                            handleProperty={ (event: React.ChangeEvent<any>) =>
                                this.handleFloorHeightChange(event, floorId) }/>
                    </Grid>
                    <Grid item xs={ 6 }>
                        <FileProperty
                            title={ 'Загрузить планировку' }
                            required={ true }
                            handleProperty={ (event: React.ChangeEvent<any>) =>
                                this.handleFloorImageChange(event, floorId) }
                        />
                    </Grid>
                </Grid>,
            );
        }

        return floorRows;
    }

    private isFloorIndexDisabled(floorId: number) {
        const { floorList } = this.state;
        const floor = floorList
            .find(i => i.id === floorId);
        if (!floor) return false;

        return floor.isAttic || floor.isBasement;
    }

    private isFloorAtticDisabled(floorId: number) {
        const { floorList } = this.state;
        const floor = floorList
            .find(i => i.id === floorId);
        if (!floor) return false;

        return !!floor.index || floor.isBasement;
    }

    private isFloorBasementDisabled(floorId: number) {
        const { floorList } = this.state;
        const floor = floorList
            .find(i => i.id === floorId);
        if (!floor) return false;

        return !!floor.index  || floor.isAttic;
    }
}

export default AddProject;

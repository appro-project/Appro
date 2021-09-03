import React, {Component} from "react";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import classes from "./AddProject.module.scss";
import {Switch} from "@material-ui/core";

interface State {
    projectArea: number;
    projectFoundation: string;
    projectImage: unknown;
    projectInsulation: string;
    projectInsulationThickness: number;
    projectLength: number;
    projectName: string;
    projectOverlap: string;
    projectPreparation: number;
    projectPrice: number;
    projectRoof: string;
    projectStyle: string;
    projectWall: string;
    projectWallThickness: number;
    projectWidth: number;
    projectGarage: boolean;
    projectBedroom: number;
}

class AddProject extends Component<{}, State> {
    state = {
        projectName: "",
        projectStyle: "",
        projectArea: 0,
        projectPreparation: 0,
        projectPrice: 0,
        projectImage: null,
        projectLength: 0,
        projectWidth: 0,
        projectFoundation: "",
        projectWall: "",
        projectWallThickness: 0,
        projectInsulation: "",
        projectInsulationThickness: 0,
        projectOverlap: "",
        projectRoof: "",
        projectGarage: false,
        projectBedroom: 0
    };

    handleProjectNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, projectName: event.target.value});
    };

    handleProjectStyleChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        this.setState({...this.state, projectStyle: event.target.value as string});
    };

    handleProjectAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, projectArea: event.target.value as unknown as number});
    };

    handleProjectPreparationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, projectPreparation: event.target.value as unknown as number});
    };

    handleProjectImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, projectImage: event.target.value});
    };

    handleProjectPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, projectPrice: event.target.value as unknown as number});
    };

    handleProjectLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, projectLength: event.target.value as unknown as number});
    };

    handleProjectWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, projectWidth: event.target.value as unknown as number});
    };

    handleProjectFoundationChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        this.setState({...this.state, projectFoundation: event.target.value as string});
    };

    handleProjectWallChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        this.setState({...this.state, projectWall: event.target.value as string});
    };

    handleProjectWallThicknessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, projectWallThickness: event.target.value as unknown as number});
    };

    handleProjectInsulationChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        this.setState({...this.state, projectInsulation: event.target.value as string});
    };

    handleProjectInsulationThicknessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, projectInsulationThickness: event.target.value as unknown as number});
    };

    handleProjectOverlapChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        this.setState({...this.state, projectOverlap: event.target.value as string});
    };

    handleProjectRoofChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        this.setState({...this.state, projectRoof: event.target.value as string});
    };

    handleProjectGarageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, projectGarage: event.target.checked as boolean});
    };

    handleProjectBedroomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, projectBedroom: event.target.value as unknown as number});
    };

    render() {
        return <div>
            <div>
                <div>LOGO</div>
            </div>
            <div>
                <div>Navigation</div>
                <div>
                    <div>
                        <h1 className={classes['add_project__title']}>Новый проект</h1>
                    </div>
                    <div>
                        <div>
                            <h2 className={classes['add-project__main-info-title']}>Основаня информация</h2>
                        </div>
                        <div>
                            <div>
                                <div>Название проекта</div>
                                <FormControl>
                                    <InputLabel htmlFor="project-name-label">Название проекта</InputLabel>
                                    <Input id="project-name-label" value={this.state.projectName}
                                           onChange={this.handleProjectNameChange} required={true}/>
                                </FormControl>
                            </div>
                            <div>
                                <div>
                                    <div>Стиль</div>
                                    <FormControl>
                                        <InputLabel shrink id="project-style-label"/>
                                        <Select
                                            labelId="project-style-label"
                                            id="project-style"
                                            value={this.state.projectStyle}
                                            onChange={this.handleProjectStyleChange}
                                            required={true}
                                        >
                                            <MenuItem value={'классический'}>классический</MenuItem>
                                            <MenuItem value={'современный'}>современный</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div>
                                    <div>Общая площадь</div>
                                    <FormControl>
                                        <InputLabel htmlFor="project-area-label"/>
                                        <Input type="number" id="project-area-label" value={this.state.projectArea}
                                               onChange={this.handleProjectAreaChange} required={true}/>
                                    </FormControl>
                                    <div>кв.м</div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div>Подготовка проекта</div>
                                    <FormControl>
                                        <InputLabel htmlFor="project-preparation-label"/>
                                        <Input type="number" id="project-preparation-label"
                                               value={this.state.projectPreparation}
                                               onChange={this.handleProjectPreparationChange} required={true}/>
                                    </FormControl>
                                    <div>дней</div>
                                    {/*добавить динамическую подстановку день/дня/дней*/}
                                </div>
                                <div>
                                    <div>Цена проекта</div>
                                    <FormControl>
                                        <InputLabel htmlFor="project-price-label"/>
                                        <Input type="number" id="project-price-label"
                                               value={this.state.projectPrice}
                                               onChange={this.handleProjectPriceChange} required={true}/>
                                    </FormControl>
                                    <div>грн</div>
                                </div>
                            </div>
                            <div>
                                <div>Загрузить изображения проекта</div>
                                <FormControl>
                                    <InputLabel htmlFor="project-image-label"/>
                                    <Input type="file" id="project-image-label" value={this.state.projectImage}
                                           onChange={this.handleProjectImageChange} required={true}/>
                                </FormControl>
                            </div>
                        </div>
                        <div>
                            <h2 className={classes['add-project__detail-info-title']}>Детальная информация</h2>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <div>Фундамент</div>
                                    <FormControl>
                                        <InputLabel shrink id="project-foundation-label"/>
                                        <Select
                                            labelId="project-foundation-label"
                                            id="project-foundation"
                                            value={this.state.projectFoundation}
                                            onChange={this.handleProjectFoundationChange}
                                            required={true}
                                        >
                                            <MenuItem value={'ленточный'}>ленточный</MenuItem>
                                            <MenuItem value={'столбчатый'}>столбчатый</MenuItem>
                                            <MenuItem value={'монолитный ленточный'}>монолитный ленточный</MenuItem>
                                            <MenuItem value={'свайный'}>свайный</MenuItem>
                                            <MenuItem value={'мелкозаглубленный'}>мелкозаглубленный</MenuItem>
                                            <MenuItem value={'плитный'}>плитный</MenuItem>
                                            <MenuItem value={'плавающий'}>плавающий</MenuItem>
                                            <MenuItem value={'винтовой'}>винтовой</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div>
                                    <div>Материал стен</div>
                                    <FormControl>
                                        <InputLabel shrink id="project-wall-label"/>
                                        <Select
                                            labelId="project-wall-label"
                                            id="project-wall"
                                            value={this.state.projectWall}
                                            onChange={this.handleProjectWallChange}
                                            required={true}
                                        >
                                            <MenuItem value={'кирпич'}>кирпич</MenuItem>
                                            <MenuItem value={'газоблок'}>газоблок</MenuItem>
                                            <MenuItem value={'пеноблок'}>пеноблок</MenuItem>
                                            <MenuItem value={'керамоблок'}>керамоблок</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <div>Толщина</div>
                                    <FormControl>
                                        <InputLabel htmlFor="project-wall-thickness-label"/>
                                        <Input type="number" id="project-wall-thickness-label"
                                               value={this.state.projectWallThickness}
                                               onChange={this.handleProjectWallThicknessChange} required={true}/>
                                    </FormControl>
                                    <div>мм</div>
                                </div>
                                <div>
                                    <div>Материал уеплителя</div>
                                    <FormControl>
                                        <InputLabel shrink id="project-insulation-label"/>
                                        <Select
                                            labelId="project-insulation-label"
                                            id="project-insulation"
                                            value={this.state.projectInsulation}
                                            onChange={this.handleProjectInsulationChange}
                                            required={true}
                                        >
                                            <MenuItem value={'пенопласт'}>пенопласт</MenuItem>
                                            <MenuItem value={'стекловата'}>стекловата</MenuItem>
                                            <MenuItem value={'эковата'}>эковата</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <div>Толщина</div>
                                    <FormControl>
                                        <InputLabel htmlFor="project-insulation-thickness-label"/>
                                        <Input type="number" id="project-insulation-thickness-label"
                                               value={this.state.projectInsulationThickness}
                                               onChange={this.handleProjectInsulationThicknessChange} required={true}/>
                                    </FormControl>
                                    <div>мм</div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div>Габариты застройки</div>
                                    <FormControl>
                                        <InputLabel htmlFor="project-length-label"/>
                                        <Input type="number" id="project-length-label"
                                               value={this.state.projectLength}
                                               onChange={this.handleProjectLengthChange} required={true}/>
                                    </FormControl>
                                    <div>м x</div>
                                    <FormControl>
                                        <InputLabel htmlFor="project-width-label"/>
                                        <Input type="number" id="project-width-label"
                                               value={this.state.projectWidth}
                                               onChange={this.handleProjectWidthChange} required={true}/>
                                    </FormControl>
                                    <div>м</div>
                                </div>
                                <div>
                                    <div>Перекрытия</div>
                                    <FormControl>
                                        <InputLabel shrink id="project-overlap-label"/>
                                        <Select
                                            labelId="project-overlap-label"
                                            id="project-overlap"
                                            value={this.state.projectOverlap}
                                            onChange={this.handleProjectOverlapChange}
                                            required={true}
                                        >
                                            <MenuItem value={'монолитная ж/б плита'}>монолитная ж/б плита</MenuItem>
                                            <MenuItem value={'сборное ж/бю из плит'}>сборное ж/бю из плит</MenuItem>
                                            <MenuItem value={'дерево'}>дерево</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div>
                                    <div>Кровля</div>
                                    <FormControl>
                                        <InputLabel shrink id="project-roof-label"/>
                                        <Select
                                            labelId="project-roof-label"
                                            id="project-roof"
                                            value={this.state.projectRoof}
                                            onChange={this.handleProjectRoofChange}
                                            required={true}
                                        >
                                            <MenuItem value={'битумная черезпица'}>битумная черезпица</MenuItem>
                                            <MenuItem value={'металочерепица'}>металочерепица</MenuItem>
                                            <MenuItem value={'шифер'}>шифер</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div>Гараж</div>
                                    <Switch
                                        checked={this.state.projectGarage}
                                        onChange={this.handleProjectGarageChange}
                                        color="primary"
                                        name="project-garage"
                                        inputProps={{'aria-label': 'primary checkbox'}}
                                    />
                                </div>
                                <div>
                                    <div>Количество спален</div>
                                    <FormControl>
                                        <InputLabel htmlFor="project-bedroom-label"/>
                                        <Input type="number" id="project-bedroom-label"
                                               value={this.state.projectBedroom}
                                               onChange={this.handleProjectBedroomChange} required={true}/>
                                    </FormControl>
                                </div>
                            </div>
                            <div>
                                <div>1 этаж</div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    }

}

export default AddProject;
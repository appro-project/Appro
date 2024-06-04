import React, {FC, useReducer, useState} from "react";
import {useSelector} from "react-redux";
import {ProjectsSliceState} from "@/features/projects/projectsSlice";
import {Project} from "@/entity/Project";
import {getProjectById} from "@/redux/selectors";
import {useParams} from "react-router";
import {Box, Paper, Tab, Tabs} from "@mui/material";
import {ProjectPropAction, State} from "@/pages/new-admin/project-info/model";
import {BasicInfo} from "@/pages/new-admin/project-info/basic-info.component";
import {ImageData} from "@/pages/new-admin/project-info/images-data.component";
import {AdditionalInfo} from "@/pages/new-admin/project-info/additional-info.component";
import {FloorsInfo} from "@/pages/new-admin/project-info/floors-info.component";


export const ProjectInfo: FC = () => {
    const {projectId} = useParams();

    const [tabIndex, setTabIndex] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    const project = useSelector<ProjectsSliceState, Project>((state) => getProjectById(state, Number(projectId)));
    const [currentProject, setCurrentProject] = useState<Project>(project);

    const [state, dispatch] = useReducer((prevState, action: ProjectPropAction) => {
        return {
            ...prevState,
            [action.type]: action.payload
        }
    }, project as State);


    return (
        <>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={tabIndex} onChange={handleChange}>
                    <Tab label="Основне"/>
                    <Tab label="Додаткове"/>
                    <Tab label="Поверхи"/>
                    <Tab label="Картинки"/>
                </Tabs>
            </Box>
            <Box pt={2}>
                <CustomTabPanel index={0} tabIndex={tabIndex}>
                    <BasicInfo state={state} dispatch={dispatch} mode={'edit'}/>
                </CustomTabPanel>
                <CustomTabPanel index={1} tabIndex={tabIndex}>
                    <AdditionalInfo state={state} dispatch={dispatch} mode={'edit'}/>
                </CustomTabPanel>
                <CustomTabPanel index={2} tabIndex={tabIndex}>
                    <FloorsInfo state={state} dispatch={dispatch} mode={'edit'}/>
                </CustomTabPanel>
                <CustomTabPanel index={3} tabIndex={tabIndex}>
                    <ImageData state={state} dispatch={dispatch} mode={'edit'}/>
                </CustomTabPanel>
            </Box>

        </>)

}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    tabIndex: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const {children, tabIndex, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={tabIndex !== index}
            {...other}
        >
            <Paper sx={{p: 4}}>
                {tabIndex === index && children}
            </Paper>
        </div>
    );
}

//         <DialogTitle style={{ paddingTop: '20px' }}>Детальная информация</DialogTitle>
//         <Grid container spacing={2}>
//             <Grid item xs={4}>
//                 <NumericProperty
//                     title={'Жилая площадь, кв.м.'}
//                     value={state.livingArea}
//                     required={true}
//                     disabled={view}
//                     handleProperty={handleLivingAreaChange}
//                 />
//             </Grid>
//             <Grid item xs={4}>
//                 <NumericProperty
//                     title={'Площадь застройки, кв.м.'}
//                     value={state.buildingArea}
//                     required={true}
//                     disabled={view}
//                     handleProperty={handleBuildingAreaChange}
//                 />
//             </Grid>
//             <Grid item xs={4}>
//                 <SelectProperty
//                     title={'Фундамент'}
//                     value={state.foundation}
//                     options={foundationOptions}
//                     required={true}
//                     disabled={view}
//                     handleProperty={handleFoundationChange}
//                 />
//             </Grid>
//             <Grid item xs={4}>
//                 <SelectProperty
//                     title={'Перекрытия'}
//                     value={state.ceiling}
//                     options={ceilingOptions}
//                     required={true}
//                     disabled={view}
//                     handleProperty={handleCeilingChange}
//                 />
//             </Grid>
//             <Grid item xs={4}>
//                 <SelectProperty
//                     title={'Кровля'}
//                     value={state.roof}
//                     options={roofOptions}
//                     required={true}
//                     disabled={view}
//                     handleProperty={handleRoofChange}
//                 />
//             </Grid>
//             <Grid item xs={4}>
//                 <NumericProperty
//                     title={'Количество спален'}
//                     value={state.bedroomCount}
//                     required={true}
//                     disabled={view}
//                     handleProperty={handleBedroomChange}
//                 />
//             </Grid>
//             <Grid item xs={6}>
//                 <SelectProperty
//                     title={'Материал стен'}
//                     value={state.wallMaterial}
//                     options={wallMaterialOptions}
//                     required={true}
//                     disabled={view}
//                     handleProperty={handleWallMaterialChange}
//                 />
//             </Grid>
//             <Grid item xs={6}>
//                 <NumericProperty
//                     title={'Толщина стен, мм'}
//                     value={state.wallThickness}
//                     required={true}
//                     disabled={view}
//                     handleProperty={handleWallThicknessChange}
//                 />
//             </Grid>
//             <Grid item xs={6}>
//                 <SelectProperty
//                     title={'Материал утеплителя'}
//                     value={state.insulation}
//                     options={insulationOptions}
//                     required={true}
//                     disabled={view}
//                     handleProperty={handleInsulationChange}
//                 />
//             </Grid>
//             <Grid item xs={6}>
//                 <NumericProperty
//                     title={'Толщина утеплителя, мм'}
//                     value={state.insulationThickness}
//                     required={true}
//                     disabled={view}
//                     handleProperty={handleInsulationThicknessChange}
//                 />
//             </Grid>
//             <Grid item xs={12} container spacing={2}>
//                 <Grid item xs={2}>
//                     <InputLabel>Габариты застройки</InputLabel>
//                 </Grid>
//                 <Grid item xs={2}>
//                     <NumericProperty
//                         title={'длина, м'}
//                         value={state.length}
//                         required={true}
//                         disabled={view}
//                         handleProperty={handleLengthChange}
//                     />
//                 </Grid>
//                 <Grid item xs={2}>
//                     <NumericProperty
//                         title={'ширина, м'}
//                         value={state.width}
//                         required={true}
//                         disabled={view}
//                         handleProperty={handleWidthChange}
//                     />
//                 </Grid>
//             </Grid>
//             <Grid item xs={12}>
//                 <CheckProperty
//                     title={'Гараж'}
//                     checked={isGaragePresent}
//                     disabled={view}
//                     handleProperty={handleGarageChange}
//                 />
//             </Grid>
//             <Grid item xs={6}>
//                 <NumericProperty
//                     title={'Количество этажей (включая мансарду и подвал)'}
//                     value={state.floorListLength}
//                     required={true}
//                     disabled={view}
//                     handleProperty={handleFloorNumberChange}
//                 />
//             </Grid>
//             {renderFloors()}
//         </Grid>
// </div>
// {!view && (
//     <Grid item lg={8}>
//         <Button variant="contained" color="primary" disabled={isProjectFilled} onClick={saveProject}>
//             Сохранить
//         </Button>
//         <Button variant="outlined" onClick={cancelChanges}>
//             Отмена
//         </Button>
//     </Grid>
// )}
/*</Grid>


 */

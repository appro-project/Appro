import React, {FC, useEffect, useReducer} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router";
import {Box, Button, Paper, Tab, Tabs} from "@mui/material";
import {ProjectPropAction, State} from "@/pages/new-admin/project-info/model";
import {BasicInfo} from "@/pages/new-admin/project-info/basic-info.component";
import {ImageData} from "@/pages/new-admin/project-info/images-data.component";
import {AdditionalInfo} from "@/pages/new-admin/project-info/additional-info.component";
import {FloorsInfo} from "@/pages/new-admin/project-info/floors-info.component";
import {useSaveProject} from "@/api/useSaveProject";
import {UpdateProjectRequest} from "@/api/model";
import {useGetProjectById} from "@/api/useGetProjectById";
import {useAddImagesToProject} from "@/api/useAddImagesToProject";


export const ProjectInfo: FC = () => {
    const {projectId} = useParams();
    const dispatch = useDispatch();

    const {mutate: saveProject} = useSaveProject();
    const {mutate: saveImages} = useAddImagesToProject();

    const [tabIndex, setTabIndex] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };


    const {data: project} = useGetProjectById(Number(projectId));

    const [currentProject, localDispatch] = useReducer((prevState: State, action: ProjectPropAction) => {

        if (action.initState) {
            return {
                ...action.initState
            }
        }

        return {
            ...prevState,
            [action.type]: action.payload
        }
    }, project as State);

    useEffect(() => {
        if (!project) return;
        localDispatch({type: 'id', payload: 1, initState: {...project, newImages: project.images || []}})
    }, [project])

    if (!currentProject) {
        return <div>Loading...</div>
    }

    const saveProjectHandler = () => {
        console.log('currentProject', currentProject)
        const basicProjectProperties = _objectWithoutProperties(currentProject, ['edit', 'add', 'imagesToDelete', 'photosToDelete', 'imagesToAdd', 'photosToAdd', 'floors', 'mainImage', 'floors'])
        console.log('basicProjectProperties', basicProjectProperties)


        saveProject(basicProjectProperties as UpdateProjectRequest)
        saveImages({id: currentProject.id, images: currentProject.newImages});
        // if(currentProject.imagesToDelete) {
        //     currentProject.imagesToDelete.forEach((image) => {
        //         console.log('delete image', image)
        //     })
        // }
    }

    return (
        <Box>
            <Box display={'flex'} justifyContent={'flex-end'} zIndex={100000000000}>
                <Button color={'success'} variant={'contained'} onClick={saveProjectHandler}>Зберегти зміни</Button>
            </Box>
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
                    <BasicInfo state={currentProject} dispatch={localDispatch} mode={'edit'}/>
                </CustomTabPanel>
                <CustomTabPanel index={1} tabIndex={tabIndex}>
                    <AdditionalInfo state={currentProject} dispatch={localDispatch} mode={'edit'}/>
                </CustomTabPanel>
                <CustomTabPanel index={2} tabIndex={tabIndex}>
                    <FloorsInfo state={currentProject} dispatch={localDispatch} mode={'edit'}/>
                </CustomTabPanel>
                <CustomTabPanel index={3} tabIndex={tabIndex}>
                    <ImageData state={currentProject} dispatch={localDispatch} mode={'edit'}/>
                </CustomTabPanel>
            </Box>

        </Box>)

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

function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
    }
    return target;
}

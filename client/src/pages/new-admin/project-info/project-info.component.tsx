import React, {FC, useEffect, useReducer, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router";
import {Box, Button, Paper, Tab, Tabs} from "@mui/material";
import {initialState, ProjectPropAction} from "@/pages/new-admin/project-info/model";
import {BasicInfo} from "@/pages/new-admin/project-info/basic-info.component";
import {ImageData} from "@/pages/new-admin/project-info/images-data.component";
import {AdditionalInfo} from "@/pages/new-admin/project-info/additional-info.component";
import {FloorsInfo} from "@/pages/new-admin/project-info/floors-info.component";
import {useCreateProject, useSaveProject} from "@/api/useSaveProject";
import {ProjectDto} from "@/api/model";
import {useGetProjectById} from "@/api/useGetProjectById";
import {CustomSnackbar} from "@/pages/new-admin/custom-snackbar.component";
import {AlertDialog} from "../dialog.component";
import {useDeleteProject} from "@/api/useDeleteProject";


export const ProjectInfo: FC = () => {
    const {projectId} = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    const isNew = location.pathname === '/admin/project/new';

    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const {mutate: saveProject, isPending: isSavePending} = useSaveProject(() => {
        setOpenSuccessSnackbar(true)
    }, () => {
        setOpenErrorSnackbar(true)
    });

    const {data:savedProject, mutate: createProject, isPending: isCreatePending} = useCreateProject(() => {
        setOpenSuccessSnackbar(true)
    }, () => {
        setOpenErrorSnackbar(true)
    });

    const [openSuccessDeleteSnackbar, setOpenSuccessDeleteSnackbar] = useState(false);
    const [openErrorDeleteSnackbar, setOpenErrorDeleteSnackbar] = useState(false);

    const {mutate: deleteProject} = useDeleteProject(Number(projectId), () => {
        setOpenSuccessDeleteSnackbar(true);
        navigate('/admin');
    }, () =>{
        setOpenErrorDeleteSnackbar(true);
    });

    const isPending = isSavePending || isCreatePending;

    const [tabIndex, setTabIndex] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };


    const {data: project} = useGetProjectById(Number(projectId));

    const [currentProject, localDispatch] = useReducer((prevState: ProjectDto, action: ProjectPropAction) => {

        if (action.initState) {
            return {
                ...action.initState
            }
        }

        return {
            ...prevState,
            [action.type]: action.payload
        }
    }, project ? project as ProjectDto : initialState);

    useEffect(() => {
        if (!project) return;
        localDispatch({type: 'id', payload: 1, initState: {...project}})
    }, [project])

    useEffect(() => {
        if (!savedProject) return;
        navigate(`/admin/project/${savedProject.id}`)
    }, [savedProject]);

    if (!currentProject) {
        return <div>Loading...</div>
    }

    const saveProjectHandler = () => {
        console.log('currentProject', currentProject)
        const basicProjectProperties = _objectWithoutProperties(currentProject, ['edit', 'add', 'imagesToDelete', 'photosToDelete', 'imagesToAdd', 'photosToAdd',])
        console.log('basicProjectProperties =>>>>>>', basicProjectProperties)
        if (isNew) {
            createProject(basicProjectProperties as ProjectDto)
        } else {
            saveProject(basicProjectProperties as ProjectDto)
        }
    }

    const deleteProjectHandler = () => {
        setOpenSuccessDeleteSnackbar(true);
        deleteProject(Number(projectId));
    }

    return (
        <Box>
            <Box display={'flex'} justifyContent={'flex-end'} gap={2} zIndex={100000000000}>
                <AlertDialog 
                    triggerButtonTitle='Видалити проект'
                    text='Ви впевнені, що хочете видалити проект?' 
                    handler={deleteProjectHandler} 
                />
                <Button color={'success'} variant={'contained'}
                        disabled={isPending}
                        onClick={saveProjectHandler}>Зберегти зміни</Button>
            </Box>

            <CustomSnackbar title={"Проект збережено"}
                            open={openSuccessSnackbar}
                            handleClose={() => setOpenSuccessSnackbar(false)}
            />

            <CustomSnackbar title={"Помилка. Перевірте чи всі данні заповнені"}
                            open={openErrorSnackbar}
                            severity={'error'}
                            handleClose={() => setOpenErrorSnackbar(false)}
            />

            <CustomSnackbar title={"Проект видалений"}
                            open={openSuccessDeleteSnackbar}
                            handleClose={() => {
                                setOpenSuccessDeleteSnackbar(false)
                                navigate('/admin')
                            }}
            />

            <CustomSnackbar title={"Помилка при видаленні проекту"}
                            open={openErrorDeleteSnackbar}
                            severity={'error'}
                            handleClose={() => setOpenErrorDeleteSnackbar(false)}
            />

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
                    <BasicInfo projectDto={currentProject} dispatch={localDispatch} mode={'edit'}/>
                </CustomTabPanel>
                <CustomTabPanel index={1} tabIndex={tabIndex}>
                    <AdditionalInfo projectDto={currentProject} dispatch={localDispatch} mode={'edit'}/>
                </CustomTabPanel>
                <CustomTabPanel index={2} tabIndex={tabIndex}>
                    <FloorsInfo projectDto={currentProject} dispatch={localDispatch} mode={'edit'}/>
                </CustomTabPanel>
                <CustomTabPanel index={3} tabIndex={tabIndex}>
                    <ImageData projectDto={currentProject} dispatch={localDispatch} mode={'edit'}/>
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

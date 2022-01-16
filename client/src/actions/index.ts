import actionCreatorFactory from "typescript-fsa";
import asyncFactory from "typescript-fsa-redux-thunk";
import {DataService} from "../services/server-data";
import {Project} from "../entity/Project";


const create = actionCreatorFactory('DATA');

const createAsync = asyncFactory(create);

export const saveProject = createAsync<{ project: any }, {}>(
    'SAVE_PROJECT',
    async (params) => await DataService.axiosSaveProject(params)
);

export const updateProject = createAsync<{project: any}, {}>(
    'UPDATE_PROJECT',
    async (params) => await DataService.axiosUpdateProject(params)
)

export const deleteProject = createAsync<{projectId: number}, {}>(
    'DELETE_PROJECT',
    async (params) => await DataService.axiosDeleteProject(params.projectId)
)

export const getProjectsFromDb = createAsync<{}, Project[]>(
    'GET_PROJECTS',
    async () => await DataService.axiosGetProjects()
);

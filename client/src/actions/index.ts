import actionCreatorFactory from 'typescript-fsa'
import asyncFactory from 'typescript-fsa-redux-thunk'
import { DataService } from '../services/server-data'
import { Project } from '../entity/Project'

const create = actionCreatorFactory('DATA');

const createAsync = asyncFactory(create);

export const saveProject = createAsync<{ project: any }, {}>(
  'SAVE_PROJECT',
  async (params) => await DataService.axiosSaveProject(params),
);

export const updateProject = createAsync<{ project: any }, {}>(
  'UPDATE_PROJECT',
  async (params) => await DataService.axiosUpdateProject(params),
);

export const deleteProject = createAsync<{ projectId: number }, {}>(
  'DELETE_PROJECT',
  async (params) => await DataService.axiosDeleteProject(params.projectId),
);

export const deleteImages = createAsync<{ images: string[] }, {}>(
  'DELETE_IMAGES',
  async (params) => await DataService.axiosDeleteImages(params.images),
);

export const deletePhotos = createAsync<{ photos: string[] }, {}>(
  'DELETE_PHOTOS',
  async (params) => await DataService.axiosDeletePhotos(params.photos),
);

export const getProjectsFromDb = createAsync<{}, Project[]>(
  'GET_PROJECTS',
  async () => await DataService.axiosGetProjects(),
);

// export const toggleIsVisible = create<{id: number; isVisible: boolean}, Project[]>(
//     'TOGGLE_IS_VISIBLE',
//     async () => await DataService.axiosGetProjects()
// );

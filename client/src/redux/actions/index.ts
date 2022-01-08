import { DataService } from '../../services/server-data';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const saveProject = createAsyncThunk('SAVE_PROJECT', async (arg: { project: any }, thunk) => {
  try {
    return await DataService.axiosSaveProject(arg.project);
  } catch (e) {
    return thunk.rejectWithValue('Unable to save project');
  }
});

export const getProjectsFromDb = createAsyncThunk('GET_PROJECTS', async (arg, thunk) => {
  try {
    return await DataService.axiosGetProjects();
  } catch (e) {
    return thunk.rejectWithValue('Unable to save project');
  }
});

export const setViewProject = createAction('SET_VIEW_PROJECT');
export const setViewAllProjects = createAction('SET_ALL_VIEW_PROJECTS');

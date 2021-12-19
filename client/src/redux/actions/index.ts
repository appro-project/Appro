import actionCreatorFactory from 'typescript-fsa';
import asyncFactory from 'typescript-fsa-redux-thunk';
import { DataService } from '../../services/server-data';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const saveProject = createAsyncThunk('SAVE_PROJECT', async (arg: { project: any }, thunk) => {
  try {
    return await DataService.axiosSaveProject(arg.project);
  } catch (e) {
    return thunk.rejectWithValue('Unable to save project');
  }
});

//     <{ project: any }, {}>(
//   'SAVE_PROJECT',
//   async (params) => await DataService.axiosSaveProject(params),
// );

export const getProjectsFromDb = createAsyncThunk('GET_PROJECTS', async (arg, thunk) => {
  try {
    return await DataService.axiosGetProjects();
  } catch (e) {
    return thunk.rejectWithValue('Unable to save project');
  }
});

//
//     createAsync<{}, Project[]>(
//   'GET_PROJECTS',
//   async () => await DataService.axiosGetProjects(),
// );

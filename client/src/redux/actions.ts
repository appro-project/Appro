import { DataService } from '@/services/server-data'
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Project } from '@/entity/Project'



export const setViewProject = createAction<Project, string>('SET_VIEW_PROJECT');
export const setViewAllProjects = createAction<Project[], string>('SET_ALL_VIEW_PROJECTS');

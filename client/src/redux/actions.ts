import {createAction} from '@reduxjs/toolkit'
import {ProjectDto} from "@/api/model";


export const setViewProject = createAction<ProjectDto, string>('SET_VIEW_PROJECT');
export const setViewAllProjects = createAction<ProjectDto[], string>('SET_ALL_VIEW_PROJECTS');

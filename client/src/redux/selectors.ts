import { RootState } from '@/redux/configure-store'

export const getProjects = (state: RootState) => state.projects


export const getProjectById = (state: RootState, id:number) => state.projects.find((project) => project.id === id)
export const getViewProjects = (state: RootState) => state.viewProjects
export const getPopularCategories = (state: RootState) => state.popularCategories
export const getPrinciplesData = (state: RootState) => state.principlesData
export const getProjectSaving = (state: RootState) => state.projectSaving
export const getProjectsLoading = (state: RootState) => state.projectsLoading

import { Project } from '@/entity/Project'
import house_2a_1 from '@/assets/img/catalogue/house_2A-1.jpg'
import house_plan_1_2a_1 from '@/assets/img/projects/plan/house_plan_2a_1.jpeg'
import house_plan_2_2a_1 from '@/assets/img/projects/plan/house_plan_2_2a_1.jpeg'
import { PopularCategoryData } from '@/entity/PopularCategoryData'
import mansardaImg from '@/assets/img/main/popular/mansarda.jpg'
import oneFloorImg from '@/assets/img/main/popular/one_floor.jpg'
import twoFloorImg from '@/assets/img/main/popular/two_floor.jpg'
import modernImage from '@/assets/img/main/popular/modern.jpg'
import classicImage from '@/assets/img/main/popular/classic.jpg'
import smallImage from '@/assets/img/main/popular/150.jpg'
import mediumImage from '@/assets/img/main/popular/150_250.jpg'
import largeImage from '@/assets/img/main/popular/250.jpg'
import { PrincipleItemData } from '@/entity/PrincipleItemData'
import benefitImage from '@/assets/img/main/principles/benefit.jpg'
import strengthImage from '@/assets/img/main/principles/strength.jpg'
import beautyImage from '@/assets/img/main/principles/beauty.jpg'

import {
	ActionReducerMapBuilder,
	createAsyncThunk,
	createSlice,
	PayloadAction
} from '@reduxjs/toolkit'
import { NoInfer } from '@reduxjs/toolkit/dist/tsHelpers'
import { DataService } from '@/services/server-data'
import { ProjectDto } from '@/api/model'

export interface ProjectsSliceState {
	// all projects
	projects: Project[]
	popularCategories: PopularCategoryData[]
	//
	principlesData: PrincipleItemData[]
	projectSaving: boolean
	projectsLoading: boolean
	// visited projects
	viewProjects: ProjectDto[]
}

const initialState: ProjectsSliceState = {
	projects: [],
	popularCategories: [
		{
			image: mansardaImg,
			title: 'main.popular_categories.category1',
			link: '/catalogue?floor=attic'
		},
		{
			image: oneFloorImg,
			title: 'main.popular_categories.category2',
			link: '/catalogue?floor=1-floor'
		},
		{
			image: twoFloorImg,
			title: 'main.popular_categories.category3',
			link: '/catalogue?floor=2-floor'
		},
		{
			image: modernImage,
			title: 'main.popular_categories.category4',
			link: '/catalogue?style=modern'
		},
		{
			image: classicImage,
			title: 'main.popular_categories.category5',
			link: '/catalogue?style=classic'
		},
		{
			image: smallImage,
			title: 'main.popular_categories.category6',
			link: '/catalogue?&area=20-150'
		},
		{
			image: mediumImage,
			title: 'main.popular_categories.category7',
			link: '/catalogue?&area=150-250'
		},
		{
			image: largeImage,
			title: 'main.popular_categories.category8',
			link: '/catalogue?&area=250-500'
		}
	],
	principlesData: [
		{
			title: 'main.principles.advantage.title',
			description: 'main.principles.advantage.description',
			backgroundUrl: benefitImage
		},
		{
			title: 'main.principles.strength.title',
			description: 'main.principles.strength.description',
			backgroundUrl: strengthImage
		},
		{
			title: 'main.principles.beauty.title',
			description: 'main.principles.beauty.description',
			backgroundUrl: beautyImage
		}
	],
	projectSaving: false,
	projectsLoading: false,
	viewProjects: []
}

const projectsSlice = createSlice({
	name: 'projects',
	initialState: initialState,
	reducers: {},
	extraReducers: (
		builder: ActionReducerMapBuilder<NoInfer<ProjectsSliceState>>
	) => {
		builder
			.addCase(
				toggleIsShowOnMain.fulfilled,
				(state: ProjectsSliceState, action: PayloadAction<Project[]>) => {
					state.projects = action.payload
				}
			)

			.addCase(
				toggleIsFinished.fulfilled,
				(state: ProjectsSliceState, action: PayloadAction<Project[]>) => {
					return {
						...state,
						projects: action.payload
					}
				}
			)
			.addCase(saveProject.fulfilled, (state, action) => {
				// TODO: Fix this
				console.log('save project response', action.payload)
				// state.principlesData.push(action.payload);
			})
	}
})

export const toggleIsShowOnMain = createAsyncThunk(
	'projects/toggleShowOnMain',
	async (arg: { id: number; show: boolean }, thunk) => {
		try {
			return await DataService.axiosUpdateProjectConfig(arg.id, {
				show: arg.show
			})
		} catch (e) {
			return thunk.rejectWithValue('Unable to change visibility')
		}
	}
)

// mark that project is finished
export const toggleIsFinished = createAsyncThunk(
	'projects/toggleIsFinished',
	async (arg: { id: number; finished: boolean }, thunk) => {
		try {
			return await DataService.axiosUpdateProjectConfig(arg.id, {
				finished: arg.finished
			})
		} catch (e) {
			return thunk.rejectWithValue('Unable to change status')
		}
	}
)

export const saveProject = createAsyncThunk(
	'projects/save',
	async (arg: { project: Project }, thunk) => {
		try {
			await DataService.axiosSaveProject(arg.project)
		} catch (e) {
			return thunk.rejectWithValue('Unable to save project')
		}
	}
)

export default projectsSlice.reducer

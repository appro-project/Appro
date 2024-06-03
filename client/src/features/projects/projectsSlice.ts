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

import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NoInfer } from '@reduxjs/toolkit/dist/tsHelpers'
import { DataService } from '@/services/server-data'

export interface ProjectsSliceState {
	// all projects
	projects: Project[];
	popularCategories: PopularCategoryData[];
	//
	principlesData: PrincipleItemData[];
	projectSaving: boolean;
	projectsLoading: boolean;
	// visited projects
	viewProjects: Project[];
}

const initialState: ProjectsSliceState = {
	projects: [
		{
			floorList: [
				{
					index: 1,
					area: 156.94,
					height: 2.8,
					planningImage: house_plan_1_2a_1,
					isAttic: false,
					isBasement: false
				},
				{
					index: 2,
					area: 156.94,
					height: 2.5,
					planningImage: house_plan_2_2a_1,
					isAttic: false,
					isBasement: false
				}
			],
			id: 1,
			title: 'проект 2а-1, 1-этажный, 2 спальни, гараж',
			description:
				'Современный комфортабельный двухэтажный особняк с террасой и гаражом для 2 автомобилей. В' +
				' составе помещений: холл, кухня-столовая, просторная гостиная с выходом на террасу, 5 спален ' +
				'3 санузла, постирочная, кладовые, котельная.',
			mainImage: house_2a_1,
			popularity: 1,
			generalArea: 210,
			timeToCreate: 14,
			projectPrice: 23750,
			livingArea: 82.97,
			buildingArea: 263.11,
			wallMaterial: 'кирпич 380 мм + утеплитель 100 мм',
			foundation: 'монолитный ленточный',
			ceiling: 'монолитная ж/б плита',
			roof: 'битумная черепица',
			buildingPrice: 756000,
			images: [house_2a_1, house_2a_1],
			wallThickness: 0,
			insulation: '',
			insulationThickness: 0,
			isGaragePresent: false,
			length: 15.26,
			width: 15.26,
			bedroomCount: 3,
			style: 'современный'
		},
		{
			floorList: [
				{
					index: 1,
					area: 156.94,
					height: 2.8,
					planningImage: house_plan_1_2a_1,
					isAttic: false,
					isBasement: false
				},
				{
					index: 2,
					area: 156.94,
					height: 2.5,
					planningImage: house_plan_2_2a_1,
					isAttic: false,
					isBasement: false
				}
			],
			id: 2,
			title: 'проект 2а-1, 1-этажный, 2 спальни, гараж',
			description:
				'Современный комфортабельный двухэтажный особняк с террасой и гаражом для 2 автомобилей. В' +
				' составе помещений: холл, кухня-столовая, просторная гостиная с выходом на террасу, 5 спален ' +
				'3 санузла, постирочная, кладовые, котельная.',
			mainImage: house_2a_1,
			popularity: 1,
			generalArea: 210,
			timeToCreate: 14,
			projectPrice: 23750,
			livingArea: 82.97,
			buildingArea: 263.11,
			wallMaterial: 'кирпич 380 мм + утеплитель 100 мм',
			foundation: 'монолитный ленточный',
			ceiling: 'монолитная ж/б плита',
			roof: 'битумная черепица',
			buildingPrice: 756000,
			images: [house_2a_1, house_2a_1],
			wallThickness: 0,
			insulation: '',
			insulationThickness: 0,
			isGaragePresent: false,
			length: 15.26,
			width: 15.26,
			bedroomCount: 3,
			style: 'современный'
		}
	],
	popularCategories: [
		{ image: mansardaImg, title: 'Дома с мансардой', link: '/catalogue?floor=attic' },
		{ image: oneFloorImg, title: 'Одноэтажные дома', link: '/catalogue?floor=1-floor' },
		{ image: twoFloorImg, title: 'Двухэтажные дома', link: '/catalogue?floor=2-floor' },
		{ image: modernImage, title: 'Cовременные дома', link: '/catalogue?style=modern' },
		{ image: classicImage, title: 'Классические дома', link: '/catalogue?style=classic' },
		{ image: smallImage, title: 'Дома до 150 м', link: '/catalogue?&area=20-150' },
		{ image: mediumImage, title: 'Дома от 150 до 250м', link: '/catalogue?&area=150-250' },
		{ image: largeImage, title: 'Дома от 250 м', link: '/catalogue?&area=250-500' }
	],
	principlesData: [
		{
			title: 'Польза',
			description:
				'Каждый квадратный метр площади должен нести функциональную нагруку, быть рационально задействоваными для выполнения определенных функций, возложенных на помещение, здание, комплекс.',
			backgroundUrl: benefitImage
		},
		{
			title: 'Прочность',
			description:
				'Долговечность здания определяется характеристиками используемых материалов. Крепкие и надёжные конструкции здания - гарантия долговечности.',
			backgroundUrl: strengthImage
		},
		{
			title: 'Красота',
			description:
				'Самый ответственный критерий, отвечающий за визуальное восприятие, гармоничный симбиоз функциональности и конструктивной стороны с формированием определенного стиля.',
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
	extraReducers: (builder: ActionReducerMapBuilder<NoInfer<ProjectsSliceState>>) => {
		builder
			.addCase(toggleIsShowOnMain.fulfilled, (state: ProjectsSliceState, action: PayloadAction<Project[]>) => {
				state.projects = action.payload
			})

			.addCase(toggleIsFinished.fulfilled, (state: ProjectsSliceState, action: PayloadAction<Project[]>) => {
				return {
					...state,
					projects: action.payload,
				};
			})
			.addCase(saveProject.fulfilled, (state, action) => {
				// TODO: Fix this
				console.log('save project response', action.payload)
				// state.principlesData.push(action.payload);
			})

		// .addCase(saveProject.pending, (state: RootState) => {
		//   state.projectSaving = true;
		// })
		// .addCase(saveProject.rejected, (state: RootState) => {
		//   state.projectSaving = false;
		// })
		.addCase(getProjectsFromDb.pending, (state: ProjectsSliceState) => {
		  state.projectsLoading = true;
		})
		.addCase(getProjectsFromDb.fulfilled, (state: ProjectsSliceState, action: PayloadAction<Project[]>) => {
		  state.projects = action.payload;
		  state.projectsLoading = false;
		})
		.addCase(getProjectsFromDb.rejected, (state: ProjectsSliceState) => {
		  state.projectsLoading = false;
		})
		// .addCase(setViewProject.type, (state: RootState, action: PayloadAction<Project>) => {
		//   const projects = state.viewProjects.filter((proj) => action.payload.id !== proj.id);
		//   state.viewProjects = [action.payload, ...projects];
		// })
		// .addCase(setViewAllProjects.type, (state: RootState, action: PayloadAction<Project[]>) => {
		//   state.viewProjects = action.payload;
		// });
	}
})



export const getProjectsFromDb = createAsyncThunk('projects/getAll', async (arg, thunk) => {
	try {
		return await DataService.axiosGetProjects()
	} catch (e) {
		return thunk.rejectWithValue('Unable to get projects')
	}
})



export const updateProject = createAsyncThunk(
	'projects/update',
	async (project: Project) => await DataService.axiosUpdateProject(project)
)

export const deleteProject = createAsyncThunk(
	'projects/delete',
	async (projectId: number) => await DataService.axiosDeleteProject(projectId)
)

export const deleteImages = createAsyncThunk(
	'projects/delete-images',
	async (images: string[]) => await DataService.axiosDeleteImages(images)
)

export const deletePhotos = createAsyncThunk(
	'projects/delete-photos',
	async (photos: string[]) => await DataService.axiosDeletePhotos(photos)
)


export const toggleIsShowOnMain = createAsyncThunk(
	'projects/toggleShowOnMain',
	async (arg: { id: number; show: boolean }, thunk) => {
		try {
			return await DataService.axiosUpdateProjectConfig(arg.id, { show: arg.show });
		} catch (e) {
			return thunk.rejectWithValue('Unable to change visibility');
		}
	},
);

// mark that project is finished
export const toggleIsFinished = createAsyncThunk(
	'projects/toggleIsFinished',
	async (arg: { id: number; finished: boolean }, thunk) => {
		try {
			return await DataService.axiosUpdateProjectConfig(arg.id, { finished: arg.finished });
		} catch (e) {
			return thunk.rejectWithValue('Unable to change status');
		}
	},
);

export const saveProject = createAsyncThunk
('projects/save', async (arg: { project: Project }, thunk) => {
	try {
		await DataService.axiosSaveProject(arg.project)
	} catch (e) {
		return thunk.rejectWithValue('Unable to save project')
	}
})




export default projectsSlice.reducer

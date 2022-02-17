import { Project } from '../../entity/Project';
import house_2a_1 from '../../assets/img/catalogue/house_2A-1.jpg';
import house_plan_1_2a_1 from '../../assets/img/projects/plan/house_plan_2a_1.jpeg';
import house_plan_2_2a_1 from '../../assets/img/projects/plan/house_plan_2_2a_1.jpeg';
import { PopularCategoryData } from '../../entity/PopularCategoryData';
import mansardaImg from '../../assets/img/main/popular/mansarda.jpg';
import oneFloorImg from '../../assets/img/main/popular/one_floor.jpg';
import twoFloorImg from '../../assets/img/main/popular/two_floor.jpg';
import modernImage from '../../assets/img/main/popular/modern.jpg';
import classicImage from '../../assets/img/main/popular/classic.jpg';
import smallImage from '../../assets/img/main/popular/150.jpg';
import mediumImage from '../../assets/img/main/popular/150_250.jpg';
import largeImage from '../../assets/img/main/popular/250.jpg';
import { PrincipleItemData } from '../../entity/PrincipleItemData';
import benefitImage from '../../assets/img/main/principles/benefit.jpg';
import strengthImage from '../../assets/img/main/principles/strength.jpg';
import beautyImage from '../../assets/img/main/principles/beauty.jpg';
import { getProjectsFromDb, saveProject, setViewAllProjects, setViewProject } from '../actions';
import { ActionReducerMapBuilder, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NoInfer } from '@reduxjs/toolkit/dist/tsHelpers';

export interface RootState {
  projects: Project[];
  popularCategories: PopularCategoryData[];
  principlesData: PrincipleItemData[];
  projectSaving: boolean;
  projectsLoading: boolean;
  viewProjects: Project[];
}

export const initialState: RootState = {
  projects: [
    {
      floorList: [
        {
          index: 1,
          area: 156.94,
          height: 2.8,
          planningImage: house_plan_1_2a_1,
          isAttic: false,
          isBasement: false,
        },
        {
          index: 2,
          area: 156.94,
          height: 2.5,
          planningImage: house_plan_2_2a_1,
          isAttic: false,
          isBasement: false,
        },
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
      style: 'современный',
    },
    {
      floorList: [
        {
          index: 1,
          area: 156.94,
          height: 2.8,
          planningImage: house_plan_1_2a_1,
          isAttic: false,
          isBasement: false,
        },
        {
          index: 2,
          area: 156.94,
          height: 2.5,
          planningImage: house_plan_2_2a_1,
          isAttic: false,
          isBasement: false,
        },
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
      style: 'современный',
    },
  ],
  popularCategories: [
    { image: mansardaImg, title: 'Дома с мансардой', link: '/catalogue?floor=attic' },
    { image: oneFloorImg, title: 'Одноэтажные дома', link: '/catalogue?floor=1-floor' },
    { image: twoFloorImg, title: 'Двухэтажные дома', link: '/catalogue?floor=2-floor' },
    { image: modernImage, title: 'Cовременные дома', link: '/catalogue?style=modern' },
    { image: classicImage, title: 'Классические дома', link: '/catalogue?style=classic' },
    { image: smallImage, title: 'Дома до 150 м', link: '/catalogue?&area=20-150' },
    { image: mediumImage, title: 'Дома от 150 до 250м', link: '/catalogue?&area=150-250' },
    { image: largeImage, title: 'Дома от 250 м', link: '/catalogue?&area=250-500' },
  ],
  principlesData: [
    {
      title: 'Польза',
      description:
        'Каждый квадратный метр площади должен нести функциональную нагруку, быть рационально задействоваными для выполнения определенных функций, возложенных на помещение, здание, комплекс.',
      backgroundUrl: benefitImage,
    },
    {
      title: 'Прочность',
      description:
        'Долговечность здания определяется характеристиками используемых материалов. Крепкие и надёжные конструкции здания - гарантия долговечности.',
      backgroundUrl: strengthImage,
    },
    {
      title: 'Красота',
      description:
        'Самый ответственный критерий, отвечающий за визуальное восприятие, гармоничный симбиоз функциональности и конструктивной стороны с формированием определенного стиля.',
      backgroundUrl: beautyImage,
    },
  ],
  projectSaving: false,
  projectsLoading: false,
  viewProjects: [],
};

export const rootReducer = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<NoInfer<RootState>>) => {
    builder
      .addCase(saveProject.fulfilled, (state: RootState, action: PayloadAction<Project>) => {
        state.principlesData = [...state.principlesData, action.payload];
      })
      .addCase(saveProject.pending, (state: RootState) => {
        state.projectSaving = true;
      })
      .addCase(saveProject.rejected, (state: RootState) => {
        state.projectSaving = false;
      })
      .addCase(getProjectsFromDb.pending, (state: RootState) => {
        state.projectsLoading = true;
      })
      .addCase(getProjectsFromDb.fulfilled, (state: RootState, action: PayloadAction<Project[]>) => {
        state.projects = action.payload;
        state.projectsLoading = false;
      })
      .addCase(getProjectsFromDb.rejected, (state: RootState) => {
        state.projectsLoading = false;
      })
      .addCase(setViewProject.type, (state: RootState, action: PayloadAction<Project>) => {
        state.viewProjects = [...state.viewProjects, action.payload];
      })
      .addCase(setViewAllProjects.type, (state: RootState, action: PayloadAction<Project[]>) => {
        state.viewProjects = action.payload;
      });
  },
});

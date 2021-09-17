import house_2a_1 from '../assets/img/catalogue/house_2A-1.jpg';
import house_plan_1_2a_1 from '../assets/img/projects/plan/house_plan_2a_1.jpeg';
import house_plan_2_2a_1 from '../assets/img/projects/plan/house_plan_2_2a_1.jpeg';
import house_plan_3_2a_1 from '../assets/img/projects/plan/house_plan_3_2a_1.jpeg';
import house_plan_4_2a_1 from '../assets/img/projects/plan/house_plan_4_2a_1.jpeg';
import { FullProjectData } from '../entity/FullProjectData';

const fullProjectsData: FullProjectData[] = [{
    id: '2A-1',
    title: 'Проект 2А-1, 1-этажный, 2 спальни, гараж',
    generalArea: 210,
    timeToCreate: '14 дней',
    projectPrice: 23750,
    floorAreas: [156.94, 156.94],
    livingArea: 82.97,
    buildingArea: 263.11,
    size: '15.26 х 15.96 м',
    floorHeights: [2.8, 2.5],
    wallMaterial: 'кирпич 380 мм + утеплитель 100 мм',
    foundation: 'монолитный ленточный',
    ceiling: 'монолитная ж/б плита',
    roof: 'битумная черепица',
    buildingPrice: 756000,
    images: [house_2a_1, house_2a_1],
    planningImages: [house_plan_1_2a_1, house_plan_2_2a_1, house_plan_3_2a_1, house_plan_4_2a_1],
}];

export default fullProjectsData;

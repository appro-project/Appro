import house_2a_1 from '../assets/img/catalogue/house_2A-1.jpg';
import house_plan_1_2a_1 from '../assets/img/projects/plan/house_plan_2a_1.jpeg';
import house_plan_2_2a_1 from '../assets/img/projects/plan/house_plan_2_2a_1.jpeg';
import { Project } from '../entity/Project';
import { Floor } from '../entity/Floor';

const floorList: Floor[] = [
    {
       index: 1, area: 156.94, height: 2.8, planningImage: house_plan_1_2a_1,
        isAttic: false, isBasement: false,
    },
    {
        index: 2, area: 156.94, height: 2.5, planningImage: house_plan_2_2a_1,
        isAttic: false, isBasement: false,
    },
];
const mockProjects: Project[] = [{
    floorList,
    id: '2A-1',
    title: 'проект 2а-1, 1-этажный, 2 спальни, гараж',
    description: 'Современный комфортабельный двухэтажный особняк с террасой и гаражом для 2 автомобилей. В' +
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
}];

export default mockProjects;

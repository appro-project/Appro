import house_1 from '../assets/img/main/welcome/house_1.jpg';
import house_2 from '../assets/img/main/welcome/house_2.jpg';
import { ProjectPreviewDetails } from '../entity/ProjectData';

const projectsDetails: ProjectPreviewDetails[] = [{
  mainImage: house_1,
  id: '1A50-1',
  title: 'проект 1A50-1',
  area: 210,
  description: 'Современный комфортабельный двухэтажный особняк с террасой и гаражом для 2 автомобилей. В' +
    'составе помещений: холл, кухня-столовая, просторная гостиная с выходом на террасу, 5 спален,' +
    '3 санузла, постирочная, кладовые, котельная.',
  price: '21 000',
  project_price: 21000,
  detailsUrl: '/catalogue/1A50-1',
  images: [house_1],
}, {
  mainImage: house_2,
  id: '2A75-3',
  title: 'проект 2A75-3',
  area: 210,
  description: 'Современный комфортабельный двухэтажный особняк с террасой и гаражом для 2 автомобилей. В' +
    'составе помещений: холл, кухня-столовая, просторная гостиная с выходом на террасу, 5 спален,' +
    '3 санузла, постирочная, кладовые, котельная.',
  price: '55 000',
  project_price: 55000,
  detailsUrl: '/catalogue/2A75-3',
  images: [house_2],
}];

export default projectsDetails;

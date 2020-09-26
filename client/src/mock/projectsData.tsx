import house_1 from '../assets/img/main/welcome/house_1.jpg';
import house_2 from '../assets/img/main/welcome/house_2.jpg';
import { ProjectPreviewDetails } from '../entity/ProjectData';

const projectsDetails: ProjectPreviewDetails[] = [{
  image: house_1,
  title: '1A50-1',
  square: 210,
  description: 'Современный комфортабельный двухэтажный особняк с террасой и гаражом для 2 автомобилей. В' +
    'составе помещений: холл, кухня-столовая, просторная гостиная с выходом на террасу, 5 спален,' +
    '3 санузла, постирочная, кладовые, котельная.',
  price: '21 000',
  detailsUrl: '/somewhere',
}, {
  image: house_2,
  title: '2A75-3',
  square: 210,
  description: 'Современный комфортабельный двухэтажный особняк с террасой и гаражом для 2 автомобилей. В' +
    'составе помещений: холл, кухня-столовая, просторная гостиная с выходом на террасу, 5 спален,' +
    '3 санузла, постирочная, кладовые, котельная.',
  price: '55 000',
  detailsUrl: '/somewhere',
}];

export default projectsDetails;

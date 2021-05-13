import house_1A_2 from '../assets/img/catalogue/house_1A-2.jpg';
import house_2A_2 from '../assets/img/catalogue/house_2A-2.jpg';
import house_3A_2 from '../assets/img/catalogue/house_3A-2.jpg';
import house_1B_2 from '../assets/img/catalogue/house_1B-2.jpg';
import house_2A_1 from '../assets/img/catalogue/house_2A-1.jpg';
import house_3A_1 from '../assets/img/catalogue/house_3A-1.jpg';
import house_2B_2 from '../assets/img/catalogue/house_2B-2.jpg';
import house_3F_3 from '../assets/img/catalogue/house_3F-3.jpg';
import { ProjectPreviewDetails } from '../entity/ProjectData';

const catalogueProjects: ProjectPreviewDetails[] = [{
    image: house_1A_2,
    title: '1A-2',
    area: 210,
    description: 'Современный комфортабельный двухэтажный особняк с террасой и гаражом для 2 автомобилей. В' +
        'составе помещений: холл, кухня-столовая, просторная гостиная с выходом на террасу, 5 спален,' +
        '3 санузла, постирочная, кладовые, котельная.',
    price: '21 000',
    project_price: 21000,
    detailsUrl: '/catalogue/1A-2',
},
    {
        image: house_2A_2,
        title: '2A-2',
        area: 240,
        description: '',
        price: '23 050',
        project_price: 23050,
        detailsUrl: '/catalogue/2A-2',
    },
    {
        image: house_3A_2,
        title: '3A-2',
        area: 320,
        description: '',
        price: '24 720',
        project_price: 24720,
        detailsUrl: '/catalogue/3A-2',
    },
    {
        image: house_1B_2,
        title: '1B-2',
        area: 295,
        description: '',
        price: '22 300',
        project_price: 22300,
        detailsUrl: '/catalogue/1B-2',
    },
    {
        image: house_2A_1,
        title: '2A-1',
        area: 125,
        description: '',
        price: '22 840',
        project_price: 22840,
        detailsUrl: '/catalogue/2A-1',
    },
    {
        image: house_3A_1,
        title: '3A-1',
        area: 110,
        description: '',
        price: '19 000',
        project_price: 19000,
        detailsUrl: '/catalogue/3A-1',
    },
    {
        image: house_2B_2,
        title: '2B-2',
        area: 400,
        description: '',
        price: '38 768',
        project_price: 38768,
        detailsUrl: '/catalogue/2B-2',
    },
    {
        image: house_3F_3,
        title: '3F-3',
        area: 450,
        description: '',
        price: '39 500',
        project_price: 39500,
        detailsUrl: '/catalogue/3F-3',
    }];

export default catalogueProjects;

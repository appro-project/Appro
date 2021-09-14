import { FullProjectData } from '../../../entity/FullProjectData';
import axios, { AxiosResponse } from 'axios';

const uploadFloorImages = (response: AxiosResponse, project: FullProjectData) => {
    const { floorId, floorIndex, projectId } = response.data;
    const floor = project.floorList.find(f => f.index = floorIndex);
    if (floor && floor.planningImage) {
        const formData = new FormData();
        formData.append('floorImage', floor.planningImage);
        axios.post(`http://localhost:8080/api/v1/project/${ projectId }/floor/${ floorId }/image`,
                   formData)
            .then(resp => console.log(resp));
    }
};

const uploadProjectImages = (response: AxiosResponse, project: any) => {
    const projectId = response.data.projectId;
    const { images } = project;
    if (project.images) {
        const formData = new FormData();
        const { length } = images;
        for (let i = 0; i < length; i = i + 1) {
            formData.append('projectImages', images[i]);
        }
        axios.post(`http://localhost:8080/api/v1/project/${ projectId }/images`,
                   formData)
            .then(resp => console.log(resp));
    }
};

export const addProject = (project: any) => {
    axios.post('http://localhost:8080/api/v1/project', project)
        .then((response) => {
            uploadFloorImages(response, project);
            uploadProjectImages(response, project);
        });
};

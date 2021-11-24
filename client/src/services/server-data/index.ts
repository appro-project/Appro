import axios, {AxiosResponse} from "axios";
import {Project} from "../../entity/Project";

const defaultOptions = {
    baseURL: 'http://localhost:8080/api/v1/',
};

const axiosWithSetting = axios.create(defaultOptions);

const uploadFloorImages = (response: AxiosResponse, project: Project) => {
    const { floorId, floorIndex, projectId } = response.data;
    const floor = project.floorList.find(f => f.index = floorIndex);
    if (floor && floor.planningImage) {
        const formData = new FormData();
        formData.append('floorImage', floor.planningImage);
        axiosWithSetting.post(`project/${ projectId }/floor/${ floorId }/image`,
            formData)
            .then(resp => console.log(resp));
    }
};

function uploadMainImage(response: AxiosResponse<any>, project: any) {
    const projectId = response.data.projectId;
    const { mainImage } = project;
    if (mainImage) {
        const formData = new FormData();
        formData.append('mainImage', mainImage);
        axiosWithSetting.post(`project/${ projectId }/mainImage`,
            formData)
            .then(resp => console.log(resp));
    }
}

const uploadProjectImages = (response: AxiosResponse, project: any) => {
    const projectId = response.data.projectId;
    const { images } = project;
    if (project.images) {
        const formData = new FormData();
        const { length } = images;
        for (let i = 0; i < length; i = i + 1) {
            formData.append('projectImages', images[i]);
        }
        axiosWithSetting.post(`project/${ projectId }/images`,
            formData)
            .then(resp => console.log(resp));
    }
};

export const axiosSaveProject = (project: any) => {
    // eslint-disable-next-line no-debugger
    debugger
    axiosWithSetting.post('project', project)
        .then((response) => {
            // eslint-disable-next-line no-debugger
            debugger
            uploadFloorImages(response, project);
            uploadMainImage(response, project);
            uploadProjectImages(response, project);
        });
};

export const DataService = {
    axiosSaveProject
};
import { Project } from '../../entity/Project';
import axios, { AxiosResponse } from 'axios';
import { Floor } from "../../entity/Floor";

const defaultOptions = {
    baseURL: `${(process.env.NODE_ENV === 'production') ? '/api/v1' : 'http://localhost/api/v1'}`,
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

const axiosSaveProject = (project: any) => {
    axiosWithSetting.post('project', project)
        .then((response) => {
            uploadFloorImages(response, project);
            uploadMainImage(response, project);
            uploadProjectImages(response, project);
        });
};

const axiosGetProjects = async (): Promise<Project[]> => {
    return await axiosWithSetting.get('project')
        .then(response => response.data)
        .then(data => mapResponseDataToProjects(data));
};

export const axiosGetProjectById = async (id: number) => {
    return await axiosWithSetting.get(`project/${id}`)
        .then(res => res.data)
        .then(data => mapResponseDataToProject(data));
};

const mapResponseDataToProject = (projectData: any): Project => {
    const floorList = mapResponseDataToFloorList(projectData.floorList);
    return {
        id: projectData.id,
        title: projectData.title,
        description: projectData.description,
        generalArea: projectData.general_area,
        timeToCreate: projectData.time_to_create,
        projectPrice: projectData.project_price,
        livingArea: projectData.living_area,
        buildingArea: projectData.building_area,
        wallMaterial: projectData.wall_material,
        wallThickness: projectData.wall_thickness,
        foundation: projectData.foundation,
        ceiling: projectData.ceiling,
        roof: projectData.roof,
        buildingPrice: projectData.building_price,
        mainImage: projectData.mainImage,
        images: projectData.images,
        insulation: projectData.insulation,
        insulationThickness: projectData.insulation_thickness,
        length: projectData.length,
        width: projectData.width,
        style: projectData.style,
        isGaragePresent: projectData.is_garage_present,
        bedroomCount: projectData.bedroom_count,
        floorList: floorList,
        popularity: projectData.popularity,
    };
};

const mapResponseDataToProjects = (data: any): Project[] => {
    const projects: Project[] = [];
    for (const projectData of data) {
        projects.push(mapResponseDataToProject(projectData));
    }

    return projects;
};

const mapResponseDataToFloorList = (floorListResponse: any): Floor[] => {
    const floors: Floor[] = [];
    for (const floor of floorListResponse){
        floors.push({
            index: floor.index,
            area: floor.area,
            height: floor.height,
            isAttic: floor.is_attic,
            isBasement: floor.is_basement,
            planningImage: floor.planning_image
        })
    }
    
    return floors;
}

export const DataService = {
    axiosSaveProject,
    axiosGetProjects
};

import {Project} from "@/entity/Project";
import {axiosWithSetting} from "@/services/server-data";
import {AxiosResponse} from "axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ProjectDto} from "@/api/model";



export const useSaveProject = (onSuccess) => {
    const queryClient = useQueryClient()
    return useMutation({mutationFn: axiosSaveProject,
        onSuccess: (value, value2) => {
            queryClient.invalidateQueries({ queryKey: ['project'] })
            queryClient.invalidateQueries({ queryKey: ['project'] })
            onSuccess();
        },});
}

export const useCreateProject = () => {
    return useMutation({mutationFn: axiosCreateProject});
}

const axiosSaveProject = (project: ProjectDto) => {
    // const
    return axiosWithSetting.put(`project/${project.id}`, project).then((response) => {

    })
}

const axiosCreateProject = (project: ProjectDto) => {
    return axiosWithSetting.put('project', project).then((response) => {
        console.log("response", response.data);
    })
    //
    // uploadFloorImages(response, project)
    // uploadMainImage(response, project)
    // uploadProjectImages(response, project)
}


const uploadFloorImages = (response: AxiosResponse, project: any) => {

    const {floorId, floorIndex, id:projectId} = response.data
    const floor = project.floorList.find((f) => f.index === floorIndex)
    if (floor && floor.planningImage && typeof floor.planningImage !== 'string') {
        const formData = new FormData()
        formData.append('floorImage', floor.planningImage)
        axiosWithSetting.post(`project/${projectId}/floor/${floorId}/image`, formData).then((resp) => console.log(resp))
    }
}

const uploadMainImage = (response: AxiosResponse<any>, project: any) => {
    const projectId = response.data.id
    const {mainImage} = project
    if (mainImage) {
        const formData = new FormData()
        formData.append('mainImage', mainImage)
        axiosWithSetting.post(`project/${projectId}/mainImage`, formData).then((resp) => console.log(resp))
    }
}

const uploadProjectImages = (response: AxiosResponse, project: any) => {
    const projectId = response.data.id
    const {imagesToAdd: images} = project
    if (images) {
        const formData = new FormData()
        const {length} = images
        for (let i = 0; i < length; i = i + 1) {
            formData.append('projectImages', images[i])
        }
        axiosWithSetting.post(`project/${projectId}/images`, formData).then((resp) => console.log(resp))
    }
}
//
// const uploadProjectPhotos = (response: AxiosResponse, project: any) => {
//     const projectId = response.data.projectId
//     const { photosToAdd: photos } = project
//     if (photos) {
//         const formData = new FormData()
//         const { length } = photos
//         for (let i = 0; i < length; i = i + 1) {
//             formData.append('projectPhotos', photos[i])
//         }
//         axiosWithSetting.post(`project/${projectId}/photos`, formData).then((resp) => console.log(resp))
//     }
// }

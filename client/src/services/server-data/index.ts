import { Project } from '@/entity/Project'
import axios, { AxiosResponse } from 'axios'
import { Floor } from '@/entity/Floor'
import { IFeedbackForm } from '@/pages/Main/Feedback/Feedback'

export const currentHost = import.meta.env.DEV ? 'http://13.60.38.144' : ''

const defaultOptions = {
	baseURL: import.meta.env.PROD ? '/api/v1' : `${currentHost}/api/v1`
}

export const axiosWithSetting = axios.create(defaultOptions)

const uploadFloorImages = (response: AxiosResponse, project: any) => {
	const { floorId, floorIndex, projectId } = response.data
	const floor = project.floorList.find((f) => f.index === floorIndex)
	if (floor && floor.planningImage && typeof floor.planningImage !== 'string') {
		const formData = new FormData()
		formData.append('floorImage', floor.planningImage)
		axiosWithSetting.post(`project/${projectId}/floor/${floorId}/image`, formData).then((resp) => console.log(resp))
	}
}

const uploadMainImage = (response: AxiosResponse<any>, project: any) => {
	const projectId = response.data.projectId
	const { mainImage } = project
	if (mainImage) {
		const formData = new FormData()
		formData.append('mainImage', mainImage)
		axiosWithSetting.post(`project/${projectId}/mainImage`, formData).then((resp) => console.log(resp))
	}
}

const uploadProjectImages = (response: AxiosResponse, project: any) => {
	const projectId = response.data.projectId
	const { imagesToAdd: images } = project
	if (images) {
		const formData = new FormData()
		const { length } = images
		for (let i = 0; i < length; i = i + 1) {
			formData.append('projectImages', images[i])
		}
		axiosWithSetting.post(`project/${projectId}/images`, formData).then((resp) => console.log(resp))
	}
}

const uploadProjectPhotos = (response: AxiosResponse, project: any) => {
	const projectId = response.data.projectId
	const { photosToAdd: photos } = project
	if (photos) {
		const formData = new FormData()
		const { length } = photos
		for (let i = 0; i < length; i = i + 1) {
			formData.append('projectPhotos', photos[i])
		}
		axiosWithSetting.post(`project/${projectId}/photos`, formData).then((resp) => console.log(resp))
	}
}

const axiosDeleteImages = (images: string[]) => {
	console.log(images)
	axiosWithSetting.delete(`image`, { data: { images } }).then((resp) => console.log(resp))
}

const axiosDeletePhotos = (photos: string[]) => {
	console.log(photos)
	axiosWithSetting.delete(`photos`, { data: { photos } }).then((resp) => console.log(resp))
}

const axiosSaveProject = (project: any) => {
	axiosWithSetting.post('project', project).then((response) => {
		uploadFloorImages(response, project)
		uploadMainImage(response, project)
		uploadProjectImages(response, project)
	})
}

const axiosUpdateProject = (project: any) => {
	axiosWithSetting.put(`project/${project.id}`, project).then((response) => {
		console.log(response)
		uploadFloorImages(response, project)
		if (typeof project.mainImage !== 'string') {
			uploadMainImage(response, project)
		}
		if (project.imagesToDelete.length) {
			axiosDeleteImages(project.imagesToDelete)
		}
		if (project.photosToDelete.length) {
			axiosDeletePhotos(project.photosToDelete)
		}
		if (project.imagesToAdd) {
			uploadProjectImages(response, project)
		}
		if (project.isFinished && project.photosToAdd) {
			uploadProjectPhotos(response, project)
		}
	})
}

const axiosUpdateProjectConfig = async (id: number, data: any): Promise<Project[]> => {
	console.log('patch: ', id, data)
	return await axiosWithSetting.patch(`project/${id}`, data).then((res) => res.data)
}

const axiosDeleteProject = (projectId: number) => {
	axiosWithSetting.delete(`project/${projectId}`).then((response) => {
		console.log(response)
	})
}

const axiosGetProjects = async (): Promise<Project[]> => {
	return await axiosWithSetting
		.get('project')
		.then((response) => response.data)
		.then((data) => mapResponseDataToProjects(data))
}

export const axiosGetProjectById = async (id: number) => {
	return await axiosWithSetting
		.get(`project/${id}`)
		.then((res) => res.data)
		.then((data) => mapResponseDataToProject(data))
}

export const axiosPostFeedback = async (value: IFeedbackForm) => {
	return await axiosWithSetting.post(`feedback`, value)
}



const mapResponseDataToFloorList = (floorListResponse: any): Floor[] => {
	const floors: Floor[] = []
	if (!floorListResponse) {
		return floors
	}
	for (const floor of floorListResponse) {
		floors.push({
			id: floor.floorId,
			index: floor.index,
			area: floor.area,
			height: floor.height,
			isAttic: floor.isAttic,
			isBasement: floor.isBasement,
			planningImage: floor.planningImage
		})
	}

	return floors
}

export const DataService = {
	axiosSaveProject,
	axiosUpdateProject,
	axiosUpdateProjectConfig,
	axiosDeleteProject,
	axiosGetProjects,
	axiosDeleteImages,
	axiosDeletePhotos
}

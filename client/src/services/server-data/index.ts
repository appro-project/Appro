import { Project } from '@/entity/Project'
import axios, { AxiosResponse } from 'axios'
import { IFeedbackForm } from '@/pages/Main/Feedback/Feedback'

export const currentHost = import.meta.env.DEV ? 'https://www.appro.com.ua' : ''

const defaultOptions = {
	baseURL: import.meta.env.PROD ? '/api/v1' : `${currentHost}/api/v1`,
	withCredentials: true
}

export const axiosWithSetting = axios.create(defaultOptions)

axiosWithSetting.interceptors.response.use(
	(response) => response,
    (error) => {
      if (error.response && error.response.status === 403) {
        const currentUrl = window.location.pathname + window.location.search;
      	window.location.href = `/admin/login?redirect=${encodeURIComponent(currentUrl)}`;
      }
      return Promise.reject(error);
    }
  );

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


export const axiosPostFeedback = async (value: IFeedbackForm) => {
	return await axiosWithSetting.post(`feedback`, value)
}

export const axiosPostTelegramFeedback = async (value: IFeedbackForm) => {
	return await axiosWithSetting.post(`feedback/telegram`, value)
}

export const axiosPostLogin = async (password: string) => {
	return await axiosWithSetting.post(`auth/login`, { password })
}

export const axiosCheckToken = async () => {
	return await axiosWithSetting.get(`auth/check`)
}

export const DataService = {
	axiosSaveProject,
	axiosUpdateProject,
	axiosUpdateProjectConfig,
	axiosDeleteProject,
	axiosDeleteImages,
	axiosDeletePhotos
}

import {useMutation} from "@tanstack/react-query";
import {axiosWithSetting} from "@/services/server-data";
import {ImageInfo} from "@/api/model";


export const useSaveImages = () => {
    return useMutation<ImageInfo[], any, any>({
        mutationFn: axiosSaveImages,
    });
}

const axiosSaveImages = async ({images, type}) => {
    console.log('images', images)
    console.log('type', type)
    const formData = new FormData()
    const {length} = images;
    for (let i = 0; i < length; i = i + 1) {
        formData.append('images', images[i])
    }
    formData.append('type', type)
    return await axiosWithSetting.post(`/images`, formData).then((resp) => resp.data)

}
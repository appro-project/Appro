import {useMutation} from "@tanstack/react-query";
import {axiosWithSetting} from "@/services/server-data";

export const useAddImagesToProject = () => {
    return useMutation({
        mutationFn: axiosAddImagesToProject,
    });
}

const axiosAddImagesToProject = ({id, images}) => {
    return axiosWithSetting.post(`project/${id}/images`, images).then((resp) => console.log(resp))

}
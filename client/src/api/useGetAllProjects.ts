import {useQuery} from "@tanstack/react-query";
import {axiosWithSetting} from "@/services/server-data";

export const useGetAllProjects = () => {
    return useQuery({queryKey: ['projects'], queryFn: axiosGetAllProjects});
}

const axiosGetAllProjects = () => {
    return axiosWithSetting.get('project').then((response) => {
        return response.data
    })
}
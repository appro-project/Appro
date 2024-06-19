import {useMutation, useQuery} from "@tanstack/react-query";
import {axiosWithSetting} from "@/services/server-data";

export const useGetProjectById = (id:number) => {
    return useQuery({queryKey: [`projects-${id}`], queryFn: () =>  axiosGetProjectById (id)});
}

const axiosGetProjectById = (id:number) => {
    return axiosWithSetting.get(`project/${id}`).then((response) => {
        return response.data
    })
}
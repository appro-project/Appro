import {axiosWithSetting} from "@/services/server-data";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ProjectDto} from "@/api/model";


export const useSaveProject = (onSuccess, onError) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: axiosSaveProject,
        onSuccess: (value, value2) => {
            queryClient.invalidateQueries({queryKey: ['project']})
            queryClient.invalidateQueries({queryKey: ['project']})
            onSuccess();
        },
        onError
    });
}

export const useCreateProject = (onSuccess, onError) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: axiosCreateProject,
        onSuccess: (value, value2) => {
            queryClient.invalidateQueries({queryKey: ['project']})
            queryClient.invalidateQueries({queryKey: ['project']})
            onSuccess();
        },
        onError
    });
}

const axiosSaveProject = (project: ProjectDto) => {
    // const
    return axiosWithSetting.put(`project/${project.id}`, project);
}

const axiosCreateProject = (project: ProjectDto) => {
    return axiosWithSetting.post('project', project).then((res) => res.data)
}


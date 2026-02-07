import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {DesignDto, DesignUpdateDto, DesignViewDto} from "../types/api-types.ts";
import axiosInstance from "./api.ts";

export const useCreateDesign = (folderId: number | undefined) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: DesignDto) => {
            return await axiosInstance.post('/designs', data);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['folderDesigns', folderId]})
        }
    });
}

export const useUpdateDesign = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: DesignUpdateDto) => {
            return await axiosInstance.put(`/designs/${id}`, data);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['design', id]})
        }
    })
}

export const useDesign = (id: number) => {
    return useQuery({
        queryKey: ['design', id],
        queryFn: async () => {
            const {data} = await axiosInstance.get<DesignViewDto>(`/designs/${id}`);

            return data;
        }
    });
}
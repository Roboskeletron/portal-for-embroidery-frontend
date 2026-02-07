import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {DesignDto} from "../types/api-types.ts";
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
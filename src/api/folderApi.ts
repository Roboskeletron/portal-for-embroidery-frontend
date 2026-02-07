import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "./api.ts";
import type {
    FolderDto,
    FolderUpdateDto, FolderViewDto,
    ViewListPageDesignForListDto,
    ViewListPageFolderViewDto
} from "../types/api-types.ts";

export const useFolders = (userId: number, rootFolderId?: number) => {
    return useQuery({
        queryKey: ['folders', userId, rootFolderId],
        queryFn: async () => {
            const url = rootFolderId
                ? `/folders/${rootFolderId}/folders`
                : `/users/${userId}/folders`;

            const {data} = await axiosInstance.get<ViewListPageFolderViewDto>(url);

            return data;
        },
        select: data => data.viewDtoList
    })
}

export const useDesignsOfFolder = (folderId: number | undefined) => {
    return useQuery({
        queryKey: ['folderDesigns', folderId],
        queryFn: async () => {
            const {data} = await axiosInstance.get<ViewListPageDesignForListDto>(`/folders/${folderId}/designs`);

            return data;
        },
        select: data => data.viewDtoList,
        enabled: !!folderId,
    })
}

export const useCreateFolder = (userId: number, parentFolderId: number | undefined) =>{
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: FolderDto) => {
            return await axiosInstance.post('/folders', data);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['folders', userId, parentFolderId]});
        },
    })
}

export const useUpdateFolder = (folderId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: FolderUpdateDto) => {
            return await axiosInstance.put(`/folders/${folderId}`, data);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['folder', folderId]});
        }
    })
}

export const useFolder = (folderId: number) => {
    return useQuery({
        queryKey: ['folder', folderId],
        queryFn: async () => {
            const { data } = await axiosInstance.get<FolderViewDto>(`/folders/${folderId}`);

            return data;
        }
    })
}
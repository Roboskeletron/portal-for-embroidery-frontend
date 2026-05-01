import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "./api.ts";
import type {BecomeDesignerDto, UserDto, UserViewDto, ViewListPageUserForListDto} from "../types/api-types.ts";

export const useProfile = (id: number | null, options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['profile', id],
        queryFn: async () => {
            const uri = !id ? "/users/profile" : `/users/${id}`;

            const { data } = await axiosInstance.get<UserViewDto>(uri);

            return data;
        },
        enabled: options?.enabled
    });
}

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: UserDto) => {
            return await axiosInstance.put('/users/profile', data);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['profile', null] });
        }
    })
}

export const useDesigners = () => {
    return useQuery({
        queryKey: ['designers'],
        queryFn: async () => {
            const {data} = await axiosInstance.get<ViewListPageUserForListDto>('/users/designers');

            return data;
        },
        select: data => data.viewDtoList,
    })
}

export const useBecomeDesigner = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: BecomeDesignerDto) => {
            const { data } = await axiosInstance.post('/users/become-designer', payload);
            return data;
        },
        onSuccess: async () => {
            // Refetch profile so the new role and fields appear instantly
            await queryClient.invalidateQueries({ queryKey: ['profile'] });
        }
    });
};

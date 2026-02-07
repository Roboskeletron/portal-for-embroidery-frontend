import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axiosInstance from "./api.ts";
import type {UserDto, UserViewDto} from "../types/api-types.ts";

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
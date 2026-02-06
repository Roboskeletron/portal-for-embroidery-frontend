import {useQuery} from "@tanstack/react-query";
import axiosInstance from "./api.ts";
import type {UserViewDto} from "../types/api-types.ts";

export const useProfile = (id: string | undefined) => {
    return useQuery({
        queryKey: ['profile', id],
        queryFn: async () => {
            const uri = !id ? "/users/profile" : `/users/${id}`;

            const { data } = await axiosInstance.get<UserViewDto>(uri);

            return data;
        }
    });
}
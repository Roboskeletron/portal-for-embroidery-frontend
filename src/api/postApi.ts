import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import type {FilteredViewListPagePostForListDto, PostDto} from "../types/api-types.ts";
import axiosInstance from "./api.ts";

export const useCreatePost = () =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: PostDto) => {
            return await axiosInstance.post(`/posts`, data);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['posts', 'infinite', null]})
        }
    })
}

export const useInfinitePosts = (tagName: string | null) => {
    return useInfiniteQuery({
        // The key includes the tag, so caching separates searches from the main feed
        queryKey: ['posts', 'infinite', tagName],
        queryFn: async ({ pageParam = 1 }) => {
            // Logic: If tag exists, use search endpoint, otherwise get all
            const url = tagName
                ? `/posts?tagName=${tagName}&page=${pageParam}&size=8`
                : `/posts?page=${pageParam}&size=8`;

            const { data } = await axiosInstance.get<FilteredViewListPagePostForListDto>(url);
            return data;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            // Determine if there is a next page based on totalPages
            const currentPage = lastPage.pageNumber || 1;
            const totalPages = lastPage.totalPages || 1;
            return currentPage < totalPages ? currentPage + 1 : undefined;
        }
    });
};
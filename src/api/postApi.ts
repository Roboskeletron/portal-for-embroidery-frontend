import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {
    FilteredViewListPagePostForListDto, LikeDto,
    PostDto,
    PostUpdateDto,
    PostViewDto,
    TagDto
} from "../types/api-types.ts";
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

export const useInfinitePosts = (userId: number | null, tagName: string | null) => {
    return useInfiniteQuery({
        // The key includes the tag, so caching separates searches from the main feed
        queryKey: ['posts', 'infinite', tagName],
        queryFn: async ({ pageParam = 1 }) => {
            let url = userId
                ? `/users/${userId}`
                : "";
            url += tagName
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

export const usePost = (id: number) => {
    return useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            const { data } = await axiosInstance.get<PostViewDto>(`/posts/${id}`);
            return data;
        },
        enabled: !!id
    });
};

export const useUpdatePost = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: PostUpdateDto) => {
            await axiosInstance.put(`/posts/${id}`, payload);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['post', id] });
        }
    });
};

export const useUpdatePostTags = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (tags: TagDto[]) => {
            await axiosInstance.put(`/posts/${id}/tags`, tags);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['post', id] });
        }
    });
};

export const useLikePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ postId, userId }: { postId: number; userId: number }) => {
            const payload: LikeDto = { userId };
            await axiosInstance.post(`/posts/${postId}/like`, payload);
        },
        onSuccess: async () => {
            // Refetch posts to update the heart icon and count
            await queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });
};

export const useDislikePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ postId, userId }: { postId: number; userId: number }) => {
            const payload: LikeDto = { userId };
            await axiosInstance.post(`/posts/${postId}/dislike`, payload);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });
};

export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (postId: number) => {
            await axiosInstance.delete(`/posts/${postId}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['posts']});
        }
    });
};
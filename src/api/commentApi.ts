import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
    ViewListPageCommentViewDto,
    CommentDto,
    CommentUpdateDto
} from "../types/api-types.ts";
import axiosInstance from "./api.ts";

// 1. Fetch Comments for a Post
export const useComments = (postId: number, page = 1, size = 5) => {
    return useQuery({
        queryKey: ['comments', postId, page],
        queryFn: async () => {
            const { data } = await axiosInstance.get<ViewListPageCommentViewDto>(
                `/posts/${postId}/comments?page=${page}&size=${size}`
            );
            return data;
        },
        placeholderData: (previousData) => previousData // Keep data visible while fetching next page
    });
};

// 2. Create Comment
export const useCreateComment = (postId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: CommentDto) => {
            const { data } = await axiosInstance.post('/comments', payload);
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['comments', postId] });
        }
    });
};

// 3. Update Comment
export const useUpdateComment = (postId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, text }: { id: number, text: string }) => {
            const payload: CommentUpdateDto = { text };
            await axiosInstance.put(`/comments/${id}`, payload);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['comments', postId] });
        }
    });
};

// 4. Delete Comment
export const useDeleteComment = (postId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (commentId: number) => {
            await axiosInstance.delete(`/comments/${commentId}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['comments', postId] });
        }
    });
};
// Requests / Input DTOs

export interface UserDto {
    username: string;
    firstName: string;
    lastName: string;
    base64StringImage?: string;
    phoneNumber: string;
    email: string;
    experiencedSince?: string; // format: date-time
    description?: string;
}

export interface TagDto {
    title: string;
}

export interface PostUpdateDto {
    description: string;
}

export interface PlacementPositionDto {
    name: string;
    anchor: number; // int32
    topMarginPosition: number;
    bottomMarginPosition: number;
    leftMarginPosition: number;
    rightMarginPosition: number;
    heightRelativeSize: number;
    widthRelativeSize: number;
}

export interface ModelPhotoDto {
    base64StringFile: string;
    designId: number; // int32
    placementPositionId: number; // int32
}

export interface FolderUpdateDto {
    name: string;
}

export interface FileUpdateDto {
    name: string;
}

export interface DesignUpdateDto {
    name: string;
}

export interface CommentUpdateDto {
    text: string;
}

export interface RegisterUserDto {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password?: string;
}

export interface BecomeDesignerDto {
    experiencedSince?: string;
    description: string;
}

export interface FileDto {
    name: string;
    extension: string;
    base64StringFile: string;
    designId?: number; // int32
}

export interface PostDto {
    designerId: number; // int32
    designId: number; // int32
    description: string;
    files: FileDto[];
}

export interface LikeDto {
    userId: number; // int32
}

export interface FolderDto {
    name: string;
    parentFolderId?: number; // int32
    creatorUserId: number; // int32
}

export interface DesignDto {
    name: string;
    folderId?: number; // int32
    creatorDesignerId: number; // int32
}

export interface CommentDto {
    postId: number; // int32
    userId: number; // int32
    text: string;
}

// Responses / View DTOs

export interface UserForListDto {
    id?: number; // int32
    username?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
}

export interface ViewListPageUserForListDto {
    pageNumber?: number; // int32
    pageSize?: number; // int32
    totalPages?: number; // int32
    totalCount?: number; // int32
    viewDtoList?: UserForListDto[];
}

export interface UserViewDto {
    id?: number; // int32
    username?: string;
    firstName?: string;
    lastName?: string;
    base64StringImage?: string;
    phoneNumber?: string;
    email?: string;
    role?: string;
    experiencedSince?: string;
    description?: string;
}

export interface PostForListDto {
    id?: number; // int32
    designName?: string;
    designBase64StringImage?: string;
    description?: string;
    countLikes?: number; // int32
    liked?: boolean;
}

export interface FilteredViewListPagePostForListDto {
    pageNumber?: number; // int32
    pageSize?: number; // int32
    totalPages?: number; // int32
    totalCount?: number; // int32
    viewDtoList?: PostForListDto[];
    filterParameters?: Record<string, string>;
}

export interface FolderViewDto {
    id?: number; // int32
    name?: string;
    parentFolderName?: string;
    creatorUserFirstName?: string;
    creatorUserLastName?: string;
}

export interface ViewListPageFolderViewDto {
    pageNumber?: number; // int32
    pageSize?: number; // int32
    totalPages?: number; // int32
    totalCount?: number; // int32
    viewDtoList?: FolderViewDto[];
}

export interface TagViewDto {
    id?: number; // int32
    title?: string;
}

export interface ViewListPageTagViewDto {
    pageNumber?: number; // int32
    pageSize?: number; // int32
    totalPages?: number; // int32
    totalCount?: number; // int32
    viewDtoList?: TagViewDto[];
}

export interface FileViewDto {
    id?: number; // int32
    name?: string;
    extension?: string;
    base64StringFile?: string;
}

export interface PostViewDto {
    id?: number; // int32
    designerFirstName?: string;
    designerLastName?: string;
    designName?: string;
    description?: string;
    files?: FileViewDto[];
    tags?: string[];
    creationDatetime?: string;
    countLikes?: number; // int32
}

export interface CommentViewDto {
    id?: number; // int32
    userFirstName?: string;
    userLastName?: string;
    text?: string;
    creationDatetime?: string;
}

export interface ViewListPageCommentViewDto {
    pageNumber?: number; // int32
    pageSize?: number; // int32
    totalPages?: number; // int32
    totalCount?: number; // int32
    viewDtoList?: CommentViewDto[];
}

export interface PlacementPositionViewDto {
    id?: number; // int32
    name?: string;
    anchor?: number; // int32
    topMarginPosition?: number;
    bottomMarginPosition?: number;
    leftMarginPosition?: number;
    rightMarginPosition?: number;
    heightRelativeSize?: number;
    widthRelativeSize?: number;
}

export interface ViewListPagePlacementPositionViewDto {
    pageNumber?: number; // int32
    pageSize?: number; // int32
    totalPages?: number; // int32
    totalCount?: number; // int32
    viewDtoList?: PlacementPositionViewDto[];
}

export interface ModelPhotoForListDto {
    id?: number; // int32
    designName?: string;
    placementPositionHeightRelativeSize?: number;
    placementPositionWidthRelativeSize?: number;
}

export interface ViewListPageModelPhotoForListDto {
    pageNumber?: number; // int32
    pageSize?: number; // int32
    totalPages?: number; // int32
    totalCount?: number; // int32
    viewDtoList?: ModelPhotoForListDto[];
}

export interface ModelPhotoViewDto {
    id?: number; // int32
    base64StringFile?: string;
    designName?: string;
    placementPositionHeightRelativeSize?: number;
    placementPositionWidthRelativeSize?: number;
}

export interface DesignForListDto {
    id?: number; // int32
    name?: string;
    fileId?: number; // int32
}

export interface ViewListPageDesignForListDto {
    pageNumber?: number; // int32
    pageSize?: number; // int32
    totalPages?: number; // int32
    totalCount?: number; // int32
    viewDtoList?: DesignForListDto[];
}

export interface FileForListDto {
    id?: number; // int32
    name?: string;
}

export interface ViewListPageFileForListDto {
    pageNumber?: number; // int32
    pageSize?: number; // int32
    totalPages?: number; // int32
    totalCount?: number; // int32
    viewDtoList?: FileForListDto[];
}

export interface DesignViewDto {
    id?: number; // int32
    name?: string;
    folderName?: string;
    creatorDesignerFirstName?: string;
    creatorDesignerLastName?: string;
}
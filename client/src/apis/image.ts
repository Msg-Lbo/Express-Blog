import { $http } from ".";


// 上传图片
export const uploadImageApi = (data: FormData) => {
    return $http({
        url: "/image/upload-image",
        method: "POST",
        data,
    });
}

// 获取图片列表
export const getImageListApi = (page: number, pageSize: number) => {
    return $http({
        url: "/image/get-image-list",
        method: "GET",
        params: {
            page,
            pageSize
        }
    });
}

// 删除图片
export const deleteImageApi = (image_id: string) => {
    return $http({
        url: "/image/delete-image",
        method: "POST",
        data: {
            image_id
        }
    });
}
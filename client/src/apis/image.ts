import { $http } from ".";


// 上传图片
export const uploadImageApi = (data: FormData) => {
    return $http({
        url: "/image/upload-image",
        method: "POST",
        data,
    });
}
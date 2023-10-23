import { $http } from '.'

// 新增分类
export const addCategoryApi = async (name: string) => {
    return await $http({
        url: '/category/create-category',
        method: 'POST',
        data: {
            name
        }
    })
}

// 获取所有分类
export const getAllCategoryApi = async () => {
    return await $http({
        url: '/category/get-all-category',
        method: 'GET'
    })
}
// 修改分类
export const updateCategoryApi = async (id: number, name: string) => {
    return await $http({
        url: '/category/update-category-by-id',
        method: 'POST',
        data: {
            id,
            name
        }
    })
}
// 删除分类
export const deleteCategoryApi = async (id: number) => {
    return await $http({
        url: '/category/delete-category-by-id',
        method: 'POST',
        data: {
            id
        }
    })
}

// 获取指定分类文章列表
export const getArticlesByCategoryApi = async (category: number | string, page: number, pageSize: number) => {
    return await $http({
        url: '/category/get-article-by-category',
        method: 'GET',
        params: {
            category,
            page,
            pageSize,
        }
    })
}
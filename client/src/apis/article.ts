import { $http } from '.'

// 获取所有文章
export const getAllArticleApi = async (page: number, pageSize: number) => {
    return await $http({
        url: '/article/get-all-article',
        method: 'GET',
        params: {
            page,
            pageSize
        }
    })
}

// 获取指定分类文章列表
export const getArticles = async (category?: number | string) => {
    return await $http({
        url: '/get-articles',
        method: 'GET',
        params: {
            category: category || ''
        }
    })
}

// 获取指定文章
export const getArticle = (id: number) => {
    return $http({
        url: '/get-article',
        method: 'GET',
        params: {
            id
        }
    })
}

// 保存文章
export const saveArticleApi = (data: { id?: number | null, title: string, description: string, content: string, category_id: number, create_time: number, update_time: number }) => {
    return $http({
        url: '/article/save-article',
        method: 'POST',
        data
    })
}
// 删除文章
export const deleteArticleApi = (id: number) => {
    return $http({
        url: '/article/delete-article-by-id',
        method: 'POST',
        data: {
            id
        }
    })
}
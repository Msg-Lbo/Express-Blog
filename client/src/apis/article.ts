import { $http } from '.'

// 获取指定分类文章列表
export const getArticles = (category?: number | string) => {
    return $http({
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
export const saveArticle = (data: any) => {
    return $http({
        url: '/save-article',
        method: 'POST',
        data
    })
}
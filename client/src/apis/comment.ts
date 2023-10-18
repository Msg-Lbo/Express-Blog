import { $http } from '.'

// 发送评论
export const sendCommentApi = async (data: { article_id: string, content: string, create_time: number, parent_id: number, nickname: string, email: string, code: string }) => {
    return await $http({
        url: '/comment/send-comment',
        method: 'POST',
        data
    })
}
// 获取评论
export const getCommentListApi = async (article_id: string | number) => {
    return await $http({
        url: '/comment/get-comment-list',
        method: 'GET',
        params: {
            article_id
        }
    })
}
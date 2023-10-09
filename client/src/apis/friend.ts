import { $http } from '.'

// 获取指定状态友链
export const getFriendApi = async (status: number) => {
    return await $http({
        url: '/friend/get-friends-by-status',
        method: 'Get',
        params: {
            status
        }
    })
}

// 获取已通过友链
export const getFriendByPassApi = async () => {
    return await $http({
        url: '/friend/get-friend',
        method: 'Get'
    })
}

// 申请友链
export const addFriendApi = async (data: { name: string, link: string, email: string, description: string, logo: string, code: string }) => {
    return await $http({
        url: '/friend/apply-friend',
        method: 'POST',
        data
    })
}

// 允许友链
export const allowFriendApi = async (id: number) => {
    return await $http({
        url: '/friend/allow-friend',
        method: 'POST',
        data: { id }
    })
}

// 拒绝友链
export const refuseFriendApi = async (id: number, reason: string) => {
    return await $http({
        url: '/friend/refuse-friend',
        method: 'POST',
        data: {
            id,
            reason
        }
    })
}

// 更新友链
export const updateFriendApi = async (data: { id: number, name: string, link: string, email: string, description: string, logo: string, code: string }) => {
    return await $http({
        url: '/friend/update-friend',
        method: 'POST',
        data
    })
}
import { $http } from '.'

// 登陆
export const loginApi = (data: { account: string, password: string }) => {
    return $http({
        url: '/user/login',
        method: 'POST',
        data
    })
}
// 注册
export const registerApi = (data: { account: string, password: string, email: string, code: string }) => {
    return $http({
        url: '/user/register',
        method: 'POST',
        data
    })
}
// 获取邮箱验证码
export const getEmailCodeApi = (email: string) => {
    return $http({
        url: '/user/get-captcha',
        method: 'GET',
        params: {
            email
        }
    })
}
// 登出
export const logoutApi = async () => {
    return await $http({
        url: '/user/logout',
        method: 'POST'
    })
}
// 是否管理员
export const isAdminApi = async (account: string) => {
    return await $http({
        url: '/user/is-admin',
        method: 'post',
        data: { account }
    })
}
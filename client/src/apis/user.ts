import { $http } from '.'

// 登陆
export const login = (data: { username: string, password: string }) => {
    return $http({
        url: '/user/login',
        method: 'POST',
        data
    })
}
// 注册
export const register = (data: { username: string, password: string, email: string, code: string }) => {
    return $http({
        url: '/user/register',
        method: 'POST',
        data
    })
}
// 获取邮箱验证码
export const getEmailCode = (email: string) => {
    return $http({
        url: '/user/get-captcha',
        method: 'GET',
        params: {
            email
        }
    })
}
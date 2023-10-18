import { $http } from '.'

// 获取验证码
export const getCaptchaApi = async () => {
    return await $http({
        url: '/refreshCaptcha',
        method: 'GET'
    })
}
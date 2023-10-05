import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { createDiscreteApi } from "naive-ui";

const { message, loadingBar } = createDiscreteApi(['message', 'loadingBar'])
axios.defaults.withCredentials = true;

export const httpInstance = axios.create({
    timeout: 6000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
})

// 请求拦截器
export type BkResponse = {
    data: any,
    code: number,
    msg: string,
    succeed: boolean
}

httpInstance.defaults.baseURL = 'http://localhost:9090/api/v1';

export const $http = async (config: AxiosRequestConfig) => {
    loadingBar.start()
    try {
        const axiosResponse = await httpInstance(config);
        const bkResponse = axiosResponse.data
        if (!bkResponse?.succeed) {
            let errTitle: string = 'Error'
            if (bkResponse.code === 400) {
                errTitle = 'Bad Request'
                message.error(bkResponse.msg || "请求错误")
            } else if (bkResponse.code === 401) {
                errTitle = 'Unauthorized'
                message.error(bkResponse.msg || "未授权或未登录")
            } else if (bkResponse.code === 403) {
                errTitle = 'Forbidden'
                message.error(bkResponse.msg || "禁止访问")
            } else if (bkResponse.code === 404) {
                errTitle = 'Not Found'
                message.error(bkResponse.msg || "资源不存在")
            } else if (bkResponse.code === 500) {
                errTitle = 'Internal Server Error'
                message.error(bkResponse.msg || "服务器内部错误")
            } else {
                errTitle = 'Unknow Error'
                message.error(bkResponse.msg || "未知错误")
            }
            const err = new Error(bkResponse.msg || "Unknow Error") as AxiosError
            err.name = errTitle
            // 抛出错误
            throw err
        }
        loadingBar.finish()
        return bkResponse
    } catch (err) {
        if (err instanceof AxiosError) {
            loadingBar.error()
            message.error(err.response?.data.message || "网络错误")
        }
        throw err
    } finally {
        // 以错误形式结束加载条
        loadingBar.error()
    }
}

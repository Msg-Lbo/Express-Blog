import { $http } from ".";

// 保存设置
export const saveSettingsApi = (data: {
    Title: string
    Ico: string
    Logo: string
    LogoText: string
    LogoText2: string
    GongAn: string
    Ipc: string
    LeftBgLight: string
    LeftBgDark: string
}) => {
    return $http({
        url: "/settings/save-settings",
        method: "POST",
        data,
    });
}

// 获取设置
export const getSettingsApi = () => {
    return $http({
        url: "/settings/get-settings",
        method: "GET",
    });
}

// 获取邮件服务器设置
export const getMailSettingsApi = () => {
    return $http({
        url: "/settings/get-mail-settings",
        method: "GET",
    });
}

// 保存邮件服务器设置
export const saveMailSettingsApi = (data:{ host: string, port: number, user: string, pass: string }) => {
    return $http({
        url: "/settings/save-mail-settings",
        method: "POST",
        data,
    });
}
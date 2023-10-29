import { getMailSettingsApi, getSettingsApi } from '@/apis/settings'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        siteSettings: {
            Title: "",
            Ico: "",
            Logo: "",
            Avatar: "",
            LogoText: "",
            LogoText2: "",
            GongAn: "",
            Ipc: "",
            LeftBgLight: "",
            LeftBgDark: "",
            AllowRegister: false,
        },
        mailSettings: {
            host: "",
            port: 0,
            user: "",
        }
    }),
    actions: {
        setSettings(settings: any) {
            this.siteSettings = settings
        },
        setMailSettings(settings: any) {
            this.mailSettings.host = settings.host
            this.mailSettings.port = settings.port
            this.mailSettings.user = settings.user
        },
        async getSettings() {
            const res = await getSettingsApi();
            if (res.code === 200) {
                const settings = res.data;
                this.setSettings(settings)
            }
        },
        async getMailSettings() {
            const res = await getMailSettingsApi();
            if (res.code === 200) {
                const settings = res.data;
                this.setMailSettings(settings)
            }
        }
    },
    // 持久化
    persist: true


})
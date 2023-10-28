import { getSettingsApi } from '@/apis/settings'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        Title: "",
        Ico: "",
        Logo: "",
        LogoText: "",
        LogoText2: "",
        GongAn: "",
        Ipc: "",
        LeftBgLight: "",
        LeftBgDark: "",
    }),
    actions: {
        setSettings(settings: any) {
            this.Title = settings.Title
            this.Ico = settings.Ico
            this.Logo = settings.Logo
            this.LogoText = settings.LogoText
            this.LogoText2 = settings.LogoText2
            this.GongAn = settings.GongAn
            this.Ipc = settings.Ipc
            this.LeftBgLight = settings.LeftBgLight
            this.LeftBgDark = settings.LeftBgDark
        },
        async getSettings() {
            const res = await getSettingsApi();
            if (res.code === 200) {
                const settings = res.data;
                this.setSettings(settings)
            }
        }
    },
    // 持久化
    persist: true


})
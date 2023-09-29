import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        theme: 'dark'
    }),
    actions: {
        toggleTheme() {
            this.theme = this.theme === 'dark' ? 'light' : 'dark'
        }
    },
    // 持久化
    persist: true
})
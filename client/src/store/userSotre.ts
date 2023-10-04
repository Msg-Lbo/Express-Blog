import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        userInfo: {
            id: 0,
            username: '',
            email: '',
            avatar: ''
        }
    }),
    actions: {
        setUserInfo(userInfo: any) {
            this.userInfo = userInfo
        }
    },
    // 持久化
    persist: true
})

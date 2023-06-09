import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUser = defineStore('user', () => {
    const userInfo = ref({
        token: '',
        email: '',
        userId: '',
        refreshToken: '',
        expiresIn: ''
    });
    const userIsLoggedIn = ref(false)
    return { userInfo, userIsLoggedIn }
})
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUser = defineStore('user', () => {
    const userInfo = ref({
        token: '',
        email: '',
        uid: '',
        refreshToken: '',
        expiresIn: ''
    });

    const userIsLoggedIn = ref(false)

    const logOutUser = () => {
        for (let property of Object.keys(userInfo.value)) {
            userInfo.value[property] = '';
        }
        userIsLoggedIn.value = false
    }



    
    return { userInfo, userIsLoggedIn, logOutUser }
})
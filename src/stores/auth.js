import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'


const apiKey = import.meta.env.API_KEY_FIREBASE

export const useAuthStore = defineStore('auth', () => {
    const userInfo = ref({
        token: '',
        email: '',
        userId: '',
        refreshToken: '',
        expiresIn: ''
    });
    
    const error = ref('');
    const loader = ref(false);


    const auth = async (payload, type) => {
        try {
            error.value = ''
            loader.value = !loader.value
            let response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${type}?key=${apiKey}`, {
                ...payload,
                returnSecureToken: true
            });
            console.log(response.data);
            userInfo.value = {
                token: response.data.idToken,
                email: response.data.email,
                userId: response.data.localId,
                refreshToken: response.data.refreshToken,
                expiresIn: response.data.expiresIn
            }
        } catch(err) {
            switch (err.response.data.error.message) {
                case 'EMAIL_EXISTS':
                    error.value = 'Email exists'
                    break;
                case 'OPERATION_NOT_ALLOWED':
                    error.value = 'Operation not allowed'
                    break;
                case 'EMAIL_NOT_FOUND':
                    error.value = 'Email not found'
                    break;
                case 'INVALID_PASSWORD':
                    error.value = 'Invalid password'
                    break;
                default:
                    error.value = 'Error'
                    break;
            }
        } finally {
            loader.value = !loader.value
        }
    }
    return { auth,error,loader }
})






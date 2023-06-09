import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useUser } from './user'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from 'vue-router'

// const apiKey = import.meta.env.API_KEY_FIREBASE;
// const apiKey = 'AIzaSyDHVm4_wl2OyrXes6S2O33RturQ1boQDLI'

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()
    const user = useUser()
    const error = ref('');
    const loader = ref(false);
    const auth = getAuth()
    const signUp = async (email, password) => {
        try {
            error.value = ''
            loader.value = !loader.value
            let response = await createUserWithEmailAndPassword(getAuth(), email, password)
            router.push('/login')
        } catch(err) {
            console.log('test',err)
            error.value = err.code
            throw error.value;
        } finally {
            loader.value = !loader.value
        }
    }
    const signIn = async (email, password) => {
        try {
            error.value = ''
            loader.value = !loader.value
            let response = await signInWithEmailAndPassword(auth, email, password)
            user.userInfo = {
                email: response.user.email,
                userId: response.user.uid,
            }
            user.userIsLoggedIn = true
            router.push('/')
        } catch(err) {
            console.log('test',err)
            error.value = err.code
            throw error.value;
        } finally {
            loader.value = !loader.value
        }
    }
    const signOutUser = async () => {
        try {
            let response = await signOut(auth)
            user.userIsLoggedIn = false
            router.push('/login')
        } catch(err) {
            console.log('test',err)
            error.value = err.code
            throw error.value;
        }
    }
    return { signUp, signIn, signOutUser, error, loader, }
})





